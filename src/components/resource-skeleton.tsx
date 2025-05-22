import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardHeader } from './ui/card'

export default function ResourceSkeleton() {
  return (
    <Card className='rounded-sm py-3'>
      <CardHeader className='flex flex-row items-center gap-0 gap-x-4'>
        <div>
          <Skeleton className='size-12 rounded-full' />
        </div>
        <div className='flex flex-1 items-center justify-between'>
          <div className='flex w-full max-w-md flex-col justify-between gap-y-1'>
            <Skeleton className='mb-1 h-5 w-3/4' />
            <Skeleton className='h-4 w-full' />
          </div>
          <div>
            <Skeleton className='h-9 w-9' />
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
