'use server'

import { signInSchema, signUpSchema } from '@/db/validation-schema'
import { auth } from '@/lib/auth'

export async function signIn(prevState: unknown, formData: FormData) {
  const rawData = {
    email: formData.get('email'),
    password: formData.get('password'),
  }
  const validatedFields = signInSchema.safeParse(rawData)
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  try {
    const user = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    })
    return { success: true, data: user }
  } catch (e) {
    if (e instanceof Error) {
      return { success: false }
    }
  }
}

export async function signUp(prevState: unknown, formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  }
  const validatedFields = signUpSchema.safeParse(rawData)
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, password } = validatedFields.data

  try {
    const user = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    })

    return { success: true, data: user }
  } catch (e) {
    if (e instanceof Error) {
      return { success: false }
    }
  }
}
