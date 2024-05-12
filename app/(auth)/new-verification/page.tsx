import NewVerificationForm from "@/components/auth/new-verfication-form";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";

export default function VerificationPage() {
    return (
      <div>
          <MaxWidthWrapper className='grid mx-auto gap-5 mt-20   items-center justify-center'>
              <NewVerificationForm/>
          </MaxWidthWrapper>
      </div>
    )
  }

