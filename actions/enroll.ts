'use server';

import {signIn } from '@/auth';


export const Enroll = async () => {
	await signIn();
};

