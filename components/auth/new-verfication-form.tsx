'use client'

import { useSearchParams, useRouter } from "next/navigation";
import CardWrapper from "./card-wrapper";
import { BeatLoader } from 'react-spinners';
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import FormSuccess from "../form-success";
import FormError from "../form-error";

export default function NewVerificationForm() {

  const [error, setError] = useState<string | undefined> ();
  const [success, setSuccess] = useState<string | undefined> ();

  const searchParams = useSearchParams();
  const router = useRouter(); 
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
    setError("Missing Token")
    return;
    }
    newVerification(token)
    .then((data) => {
      if (data.success) {
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      } else{
        setError(data.error || "Verification failed!")
      }
    })
  }, [token, success, error]);

  useEffect(() =>{
    onSubmit();
  }, [onSubmit]);
  
    return (
        <CardWrapper
        headerLabel="Confirming your verification"
        backButtonLabel="back to login"
        backButtonHref="/login"
        >
            
        <div className="flex items-center w-full justify-center">
          {!success && !error && (
             <BeatLoader/>
          )}

            <FormSuccess message={success}/>
            {!success && (
            <FormError message={error}/>
            )}
          </div>
        </CardWrapper>
     
    )
  }