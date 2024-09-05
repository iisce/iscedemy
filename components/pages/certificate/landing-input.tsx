'use client'
import MaxWidthWrapper from "@/components/layout/max-width-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import {Loader} from 'lucide-react'
import React, { startTransition, useState, useTransition } from "react"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"
import { getCertificate } from "@/actions/verifyCertificate"


export default function CertificateSearchInput() {
    const [certificateID, setCertificateID] = useState(" ")
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError ("");
        setSuccess("")

        startTransition( async () => {
            try{
                const certificate = await getCertificate(certificateID); //want to replac with server action instead
              if(certificate.error){
                setError(certificate.error);
              } else{
                setSuccess(certificate.success);
                setTimeout(() => {
                  router.push(`/certificate/${certificateID}`);
                }, 1000);
              }
            } catch(error){
              console.error('An error occured while verifying cetificate:', error)
              setError('Please enter a valid certificate ID')
            }
        });
    } 

  return (
    <MaxWidthWrapper className="max-w-3xl my-10">
    <div className="place-self-center grid items-center p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Verify Student Certificate</h1>
      <form onSubmit={handleSubmit} className="grid space-x-2 mb-4">
        <div className="my-4">
        <Input
          type="text"
          placeholder="Search certifiate ID..."
          value={certificateID}
          onChange={(e) => setCertificateID(e.target.value)}
          className="flex-grow rounded-full w-full"
          aria-label="Search input"
        />
        </div>
    <Button 
      type="submit" 
      className=""
      disabled= {isPending || !certificateID}
      >{isPending ? <Loader className="w-6 h-6 animate-spin"/>: 'Verify'}
      </Button>
      <FormError message={error}/>
      <FormSuccess message={success}/>
      </form >
    </div>
    </MaxWidthWrapper>
  )
}