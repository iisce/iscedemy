import { auth } from "@/auth";
import { getCourseBySlug } from "@/data/course";
import { notFound, redirect } from "next/navigation";
import React from "react";

export default async function SingleAdminCoursePage({
     params,
}: {
     params: { slug: string };
}) {
     const session = await auth();
     const course = await getCourseBySlug(params.slug);
     if (!course) return notFound();

     if(session?.user?.role !== 'ADMIN') {
          redirect('/unauthorized');
          return null;
     }
     return <pre>{JSON.stringify(course, null, 2)}</pre>;
}
