import { COURSE_OUTLINE } from '@/lib/consts';

export async function fetchCourseDetails(courseTitle: string) {

    const outlineCourse = COURSE_OUTLINE.find(course => course.title === courseTitle);
  if (outlineCourse) {
    return outlineCourse;
  }

  // 3. Handle Case When Course Not Found
  return // Or return null if you prefer
}
