import { ResourceWithCategoriesAndTags } from '@/db/schema'
import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
}

export default function ResourceCard({
  resource,
}: {
  resource: ResourceWithCategoriesAndTags
}) {
  return (
    <Card className='group cursor-pointer rounded-sm py-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'>
      <CardHeader className='flex flex-row items-center gap-0 gap-x-4'>
        <div>
          <Avatar className='size-12'>
            <AvatarImage src={resource.imageUrl ?? ''} />
            <AvatarFallback className='border text-sm font-semibold tracking-wider text-neutral-600 uppercase'>
              {getInitials(resource.name)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className='flex flex-1 items-center justify-between'>
          <div className='flex flex-col justify-between gap-y-1'>
            <CardTitle>{resource.name}</CardTitle>
            <CardDescription>{resource.description}</CardDescription>
          </div>
          <div>
            <Button
              asChild
              variant='outline'
            >
              <Link
                href={resource.url}
                target='_blank'
              >
                <ExternalLinkIcon className='h-4 w-4' />
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
