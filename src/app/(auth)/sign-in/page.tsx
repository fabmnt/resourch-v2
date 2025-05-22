'use client'

import { signIn } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Form from 'next/form'
import Link from 'next/link'
import { useActionState } from 'react'

export default function SignIn() {
  const [state, formAction, isPending] = useActionState(signIn, {
    errors: {},
    success: false,
    data: undefined,
  })

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-4'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold'>Sign In</h1>
          <p className='mt-2 text-sm text-gray-600'>
            Enter your credentials to access your account
          </p>
        </div>

        <Form
          action={formAction}
          className='mt-8 space-y-6'
        >
          <div className='space-y-4'>
            <div>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                placeholder='Enter your email'
                className='mt-1'
                aria-invalid={state?.errors?.email ? 'true' : undefined}
              />
              {state?.errors?.email && (
                <p className='mt-1 text-sm text-red-500'>
                  {state.errors.email[0]}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                placeholder='Enter your password'
                className='mt-1'
                aria-invalid={state?.errors?.password ? 'true' : undefined}
              />
              {state?.errors?.password && (
                <p className='mt-1 text-sm text-red-500'>
                  {state.errors.password[0]}
                </p>
              )}
            </div>
          </div>

          <Button
            type='submit'
            className='w-full'
            disabled={isPending}
          >
            {isPending ? 'Signing in...' : 'Sign in'}
          </Button>

          <div className='text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link
              href='/sign-up'
              className='font-medium text-blue-600 hover:text-blue-500'
            >
              Sign up
            </Link>
          </div>
        </Form>
      </div>
    </div>
  )
}
