import Image from "next/image"
import React from 'react'

export default function VerifyCert({params}:{
    params: { certid : string }
}){
    return(
        <>
        
      <div className='flex max-w-6xl mx-auto mt-6 mb-5'>

      <div className=' w-1/2 relative  '>
            <Image src="/pa.png" alt='cert logo' width={500} height={500} className=" w-[200px] absolute h-[200px] right-[60px] top-[300px] "/>  
                <div className=' mx-10 mt-10 grid gap-10 relative'>
                    <div>
                        <p>This Certificate was Issued for:</p>
                        <p className='font-bold'>Your Recepient</p>
                    </div>

                    <div>
                        <p>Certification:</p>
                        <p className='font-bold'>Ex. Certificate 1</p>
                    </div> 
                    <div>
                        <p>Issue Date:</p>
                        <p className='font-bold'>May 25, 2022</p>
                    </div> 

                    
                    <div>
                        <p>This Certificate was issued by:</p>
                        <p className='font-bold'>Your Comapany Name</p>
                    </div> 

                    <div>
                        <p>Link to Website:</p>
                        <p className='font-bold'>Add your website URL here</p>
                    </div> 

                    <div>
                        <p>Credential ID:</p>
                        <p className='font-bold'> {params.certid}</p>
                    </div> 

                </div>
        </div>
           
            <div className='w-1/2 '>
                <div className=' border border-5 h-full relative '>
                    <div className=''>
                        <Image src="/pic3.png" alt='cert logo' width={500} height={500} className=" w-full h-full"/>  
                    </div>
                   
    
                    <div className='right-[12px] top-[300px] absolute'>
                            <p className='font-bold text-green-800 text-[20px]'>CERTIFICATE</p>
                            <p className='font-bold text-green-800 text-[30px]' >VALIDATED</p>
                    </div> 
                       
                    <Image src="/verify.png" alt='cert logo' width={500} height={500} className=" w-[100px] absolute h-[100px] right-[60px] top-[400px] "/>  
                        <div className=' grid gap-1  mx-4 mt-[200px]'>
                            <p className='font-bold text-[10px]'>CONGRATULATIONS</p>
                            <p className='font-bold text-green-800 text-[20px]' >YOUR RECEPIENT</p>
                            <p className='font-bold w-[350px] text-[10px]' >This certificate can be validated at any
                                                        time and serves as proof of competence. The course follws
                                                        Individual Standard and uses provided Method
                            </p>
                        </div>
                   </div>

        
            </div>
            
      </div>
          
      </>
        



    )

}



