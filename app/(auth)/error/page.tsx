import ErrorCard from "@/components/auth/error-card";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";

const AuthErrorPage = () => {
    return(
        <MaxWidthWrapper className='grid mx-auto gap-5 mt-20  items-center justify-center'>
        <ErrorCard/>
        </MaxWidthWrapper>
    )
}
export default AuthErrorPage;