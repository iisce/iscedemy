import { auth } from "@/auth";
import AllSidebar from "@/components/layout/all-sidebar";
import { FC, ReactNode } from "react";

interface CourseLayoutProps {
    children: ReactNode;
}

const CourseLayout: FC<CourseLayoutProps> = async ({ children }) => {

    const session = await auth()
    const user = session?.user;
    return (
        <div>
                <div className="flex h-full gap-5">
				<AllSidebar user={user}/>                    
                <div className={`${session ? "md:ml-10" : ""} pt-10`}>{children}</div>
                </div>
        </div>
    );
};

export default CourseLayout;