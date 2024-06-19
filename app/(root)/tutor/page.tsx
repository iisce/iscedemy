import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import React from 'react';

export default async function TutorPage() {
	return (
		<MaxWidthWrapper>
			 <div className="flex flex-col items-center justify-center h-[100dvh] bg-background">
      <div className="text-9xl mb-4">🚧</div>
      <h1 className="text-3xl font-bold mb-2 text-green-600 ">Under Construction</h1>
      <p className="text-muted-foreground text-lg max-w-md text-center">
        We're working hard to bring you something amazing. Please check back soon!
      </p>
    </div>
		</MaxWidthWrapper>
	);
}
