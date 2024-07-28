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

interface IPost {
     _id: string;
     title: string;
     slug: { current: string };
     publisheddatetime: string;
     excerpt: string;
     overviewImage;
     body: any[];
     tag: Array<ITag>;
}

interface ITag {
     name: string;
     slug: { current: string };
     _id: string;
}

interface IBlogCard {
     post: IPost;
}

interface ISingleBlog {
     params: {
          slug: string;
     };
}
