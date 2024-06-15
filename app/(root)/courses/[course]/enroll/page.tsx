import React from 'react';

export default function EnrollPage({ params }: { params: { course: string } }) {
	return <div>Eroll for {params.course}</div>;
}
