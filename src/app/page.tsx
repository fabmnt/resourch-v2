import { CreateResourceModal } from '@/components/create-resource-modal'
import ResourceCard from '@/components/resource-card'
import { db } from '@/db'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { Suspense } from 'react'

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <main className='min-h-screen'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col items-center py-4'>
          <h1 className='text-2xl font-bold'>Resourch v2</h1>
          <p className='text-lg'>Save all your resources in one place</p>
        </div>
        <div className='container mx-auto flex flex-col gap-4'>
          {session && (
            <div className='flex justify-end'>
              <CreateResourceModal userId={session.user.id} />
            </div>
          )}
          <Suspense fallback={<div>Loading...</div>}>
            <FeaturedResources />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

async function FeaturedResources() {
  const resources = await db.query.resource.findMany({
    with: {
      categories: true,
      tags: true,
    },
  })

  return (
    <div className='flex flex-col gap-4'>
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
        />
      ))}
    </div>
  )
}
