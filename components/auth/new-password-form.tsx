 'use client'
import { newPassword } from '@/actions/new-password';
import { NewPasswordSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import FormError from '../form-error';
import FormSuccess from '../form-success';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import CardWrapper from './card-wrapper';


export default function NewPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
     }
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token)
      .then((data) => {
        if (data?.error){
          setError(data?.error) 
        };
        setSuccess(data?.success);
        if(data.success) {
          form.reset();
        }
      })
    });
  };

  return (
    <CardWrapper 
    headerLabel='Enter new password'
    backButtonLabel="Back to login"
    backButtonHref='/login'
    >
      <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(( onSubmit))}
        className='space-y-6'
        >
            <div className="space-y-4">
              <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paasword</FormLabel>
                  <FormControl>
                    <Input
                    {...field}
                    disabled={isPending}
                    placeholder='******'
                    type='password'
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
              />
            </div>
            <FormError message={error}/>
            <FormSuccess message={success}/>
            <Button 
            type='submit'
            className='w-full rounded-full'
            disabled={isPending}
            >
              
              {`Reset password`}
            </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
