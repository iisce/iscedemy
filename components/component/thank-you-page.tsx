import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function ThankYouPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/');
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col space-y-2">
            <p>{`Thank you for registering on this course`}</p>
            <p>{`You should be getting an email from us soon with some instructions on what to do next.`}</p>
        </div>
    );

}