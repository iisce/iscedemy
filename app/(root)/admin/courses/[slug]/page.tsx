import { getCourseBySlug } from "@/data/course";
import { notFound } from "next/navigation";
import React from "react";

export default async function SingleAdminCoursePage({
     params,
}: {
     params: { slug: string };
}) {
     const course = await getCourseBySlug(params.slug);
     if (!course) return notFound();
     return <pre>{JSON.stringify(course, null, 2)}</pre>;
}
