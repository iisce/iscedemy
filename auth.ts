import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from './auth.config';
import { db } from './lib/db';
import getUserByEmail, { getUserById } from './data/user';
import { onBoardingMail } from './lib/mail';

export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth({
	pages: {
		signIn: '/login',
		error: '/error',
	},
	events: {
		async linkAccount({ user })	 {
			await db.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			});
		},
	},
	callbacks: {
		async signIn({ user, account }) {
			// Check if the user is signing in with OAuth
			if (account?.provider !== 'credentials') {
				
				const existingUser = await getUserByEmail(user.email!);

				//if the user is new, and send the onboarding email
				if (!existingUser){
					await onBoardingMail(user.email!, user.name || '');
				}

				return true;
			}

			// Handle credentials sign in
			const existingUser = await getUserById(user.id!);

			if (!existingUser?.emailVerified) return false;

			return true;
		},

		async session({session, token}) {
			if(token.sub && session.user){
				session.user.id = token.sub;

				const user = await getUserById(token.sub);
				session.user.role = user?.role || "USER";
			}
			return session;
		},

		async jwt({ token, user, account  }) {
			if (account && user) {
				token.email = user.email;
				token.role = user.role;
			}

			// Add maxAge to the token
			const now = Math.floor(Date.now()/ 1000);
			const maxAge = 1800; // 30 minutes

			if(!token.exp || token.exp < now) {
				token.exp = now + maxAge;
			}

			return token;
		},
	},
	adapter: PrismaAdapter(db),
	session: {
		maxAge: 1800, //30 minutes
		strategy: 'jwt',
		updateAge:  60, // Update JWT every minute
	},
	...authConfig,
});
