 'use client'
import { reset } from '@/actions/reset';
import { ResetSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import FormError from '../form-error';
import FormSuccess from '../form-success';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import CardWrapper from './card-wrapper';


export default function Resetorm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
     }
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values)
      .then((data) => {
        if (data?.error){
          setError(data?.error)
          setSuccess(data?.success);
        };
      })
    });
  };

  return (
    <CardWrapper 
    headerLabel='Forgot your password'
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
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                    {...field}
                    disabled={isPending}
                    placeholder='email@example.com'
                    type='email'
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
              
              {`Send reset email`}
            </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
