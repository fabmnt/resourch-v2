'use server'

import { resource } from '@/db/schema'

import { db } from '@/db'
import { createResourceSchema } from '@/db/validation-schema'

export async function createResource(prevState: unknown, formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    url: formData.get('url'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
    ownerId: formData.get('ownerId'),
  }

  const validation = createResourceSchema.safeParse(rawData)

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    }
  }

  try {
    const newResource = await db.insert(resource).values(validation.data)
    return {
      success: true,
      data: newResource,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
    }
  }
}
