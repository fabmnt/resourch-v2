import ResourceCard from '@/components/resource-card'
import { db } from '@/db'
import { Suspense } from 'react'

export default function Home() {
  return (
    <main className='min-h-screen'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col items-center py-4'>
          <h1 className='text-2xl font-bold'>Resourch v2</h1>
          <p className='text-lg'>Save all your resources in one place</p>
        </div>
        <div className='container mx-auto'>
          <Suspense fallback={<div>Loading...</div>}>
            <FeaturedResources />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

export async function FeaturedResources() {
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
