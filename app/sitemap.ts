import { COURSE_OUTLINE } from '@/lib/consts';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const coursesSiteMap: MetadataRoute.Sitemap = COURSE_OUTLINE.map((course)=> {
    return {
            url: `${process.env.NEXT_PUBLIC_URL}/courses/${course.title}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,

        }
  })



  return [
      {
        url: `${process.env.NEXT_PUBLIC_URL}/about`,
    },
    ...coursesSiteMap,
  ]
}
