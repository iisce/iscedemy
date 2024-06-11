import { COURSE_OUTLINE } from '@/lib/consts';

export async function fetchCourseDetails(courseTitle: string) {

    const outlineCourse = COURSE_OUTLINE.find(course => course.title === courseTitle);
  if (outlineCourse) {
    return outlineCourse;
  }

  return 
}
