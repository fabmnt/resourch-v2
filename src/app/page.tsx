import { CreateResourceModal } from '@/components/create-resource-modal'
import ResourceCard from '@/components/resource-card'
import ResourcesFallback from '@/components/resources-fallback'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/db'
import { auth } from '@/lib/auth'
import { Session, User } from 'better-auth'
import { Link } from 'lucide-react'
import { headers } from 'next/headers'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <main className='min-h-screen'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col items-center py-4'>
          <h1 className='text-2xl font-bold'>Resourch v2</h1>
          <p className='text-lg'>Save all your resources in one place</p>
        </div>
        <div className='container mx-auto flex flex-col gap-4'>
          <div className='flex justify-end'>
            <Suspense fallback={<Skeleton className='h-10 w-40' />}>
              <WithSession
                render={(session) => (
                  <CreateResourceModal userId={session.user.id} />
                )}
                fallback={
                  <div className='flex justify-end'>
                    <Button asChild>
                      <Link href='/sign-in'>Sign in</Link>
                    </Button>
                  </div>
                }
              />
            </Suspense>
          </div>
          <Suspense fallback={<ResourcesFallback />}>
            <FeaturedResources />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

async function WithSession({
  render,
  fallback,
}: {
  render: (session: { session: Session; user: User }) => React.ReactNode
  fallback: React.ReactNode
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) {
    return fallback
  }
  return <>{render(session)}</>
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
