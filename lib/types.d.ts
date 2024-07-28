interface IMaxWidthWrapper {
     className?: string;
     children: React.ReactNode;
}

interface ICOURSEITEM {
     link: string;
     name: string;
}

interface ICOURSEHEADER {
     image: string;
     header: string;
     description: string;
     link: string;
}

interface ICOURSELIST {
     icon?: React.ReactNode[];
     image: string;
     link?: string;
     title: string;
     content: string;
}
interface ICOURSELIST2 {
     icon?: React.ReactNode;
     image: string;
     link?: string;
     title: string;
     content: string;
}
interface ICOURSES {
     name: string;
}
interface IOCCUPATION {
     name: string;
}
interface ITYPE {
     name: string;
}
interface ITutorProfileProps {
     tutorName: string;
     totalReviewsCount?: number;
     highestAverageRating: number;
}
interface ISingleTutorReviews {
     tutorName: string;
     totalReviewsCount?: number;
     highestAverageRating: number;
}

interface IFilter {
     status: string[];
     startDate: string | null;
     endDate: string | null;
}
export interface Course {
     id: string;
     title: string;
   }
   
   export interface Student {
     id: string ;
     name: string ;
     image?: string | StaticImport;
     email: string ;
     phone: string ;
     courses: Course[];
   }