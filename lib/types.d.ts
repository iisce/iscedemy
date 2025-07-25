import { Lesson, Module, Progress } from "@prisma/client";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

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
     programType?: string;
     price?: number;
     courseId?: string;
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

interface AuthorCardI {
     _id: string;
     slug: { current: string; _type: string };
     _createdAt: Date;
     name: string;
     bio: any;
     _updatedAt: string;
     image: { _type: string; alt: string; asset: {} };
     _rev: string;
     _type: string;
}

interface IPost {
     _id: string;
     title: string;
     slug: { current: string };
     publisheddatetime: string;
     excerpt: string;
     overviewImage;
     author: AuthorCardI;
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
     id: string;
     name: string;
     image?: string | StaticImport;
     email: string;
     phone: string;
     courses: Course[];
}
interface ISingleCourseCurriculumProps {
     modules: (Module & { lessons: Lesson[] })[];
     progress: Progress[];
}
export interface YoutubePlaylistItem {
     kind: string;
     etag: string;
     id: string;
     snippet: {
          publishedAt: string;
          channelId: string;
          title: string;
          description: string;
          thumbnails: {
               default: {
                    url: string;
                    width: number;
                    height: number;
               };
               medium: {
                    url: string;
                    width: number;
                    height: number;
               };
               high: {
                    url: string;
                    width: number;
                    height: number;
               };
               standard?: {
                    url: string;
                    width: number;
                    height: number;
               };
               maxres?: {
                    url: string;
                    width: number;
                    height: number;
               };
          };
          channelTitle: string;
          playlistId: string;
          position: number;
          resourceId: {
               kind: string;
               videoId: string;
          };
     };
}

export interface YoutubePlaylistItemsResponse {
     kind: string;
     etag: string;
     nextPageToken?: string;
     prevPageToken?: string;
     pageInfo: {
          totalResults: number;
          resultsPerPage: number;
     };
     items?: YoutubePlaylistItem[];
}

export interface YoutubeChannelContentDetails {
     relatedPlaylists: {
          uploads: string;
          [key: string]: string;
     };
}

export interface YoutubeChannelItem {
     kind: string;
     etag: string;
     id: string;
     contentDetails: YoutubeChannelContentDetails;
}

export interface YoutubeChannelsResponse {
     kind: string;
     etag: string;
     pageInfo: {
          totalResults: number;
          resultsPerPage: number;
     };
     items?: YoutubeChannelItem[];
}
export interface UserResponse {
     id: string;
     email: string | null;
     role: string;
     courses: string | null;
}
