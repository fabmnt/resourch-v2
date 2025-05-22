'use client'

import { signUp } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Form from 'next/form'
import Link from 'next/link'
import { useActionState } from 'react'

export default function SignUp() {
  const [state, formAction, isPending] = useActionState(signUp, {
    errors: {},
    success: false,
    data: undefined,
  })

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-4'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold'>Sign Up</h1>
          <p className='mt-2 text-sm text-gray-600'>
            Create a new account to get started
          </p>
        </div>

        <Form
          action={formAction}
          className='mt-8 space-y-6'
        >
          <div className='space-y-4'>
            <div>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                name='name'
                type='text'
                autoComplete='name'
                required
                placeholder='Enter your name'
                className='mt-1'
                aria-invalid={state?.errors?.name ? 'true' : undefined}
              />
              {state?.errors?.name && (
                <p className='mt-1 text-sm text-red-500'>
                  {state.errors.name[0]}
                </p>
              )}
            </div>

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
                autoComplete='new-password'
                required
                placeholder='Create a password'
                className='mt-1'
                aria-invalid={state?.errors?.password ? 'true' : undefined}
              />
              {state?.errors?.password && (
                <p className='mt-1 text-sm text-red-500'>
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor='confirmPassword'>Confirm Password</Label>
              <Input
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                autoComplete='new-password'
                required
                placeholder='Confirm your password'
                className='mt-1'
              />
              {state?.errors?.confirmPassword && (
                <p className='mt-1 text-sm text-red-500'>
                  {state.errors.confirmPassword[0]}
                </p>
              )}
            </div>
          </div>

          {state && state.success === false && (
            <div className='text-sm text-red-500'>
              Failed to create account.
            </div>
          )}

          <Button
            type='submit'
            className='w-full'
            disabled={isPending}
          >
            {isPending ? 'Creating account...' : 'Sign up'}
          </Button>

          <div className='text-center text-sm'>
            Already have an account?{' '}
            <Link
              href='/sign-in'
              className='font-medium text-blue-600 hover:text-blue-500'
            >
              Sign in
            </Link>
          </div>
        </Form>
      </div>
    </div>
  )
}
