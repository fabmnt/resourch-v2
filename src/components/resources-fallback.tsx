import ResourceSkeleton from './resource-skeleton'

export default function ResourcesFallback() {
  return (
    <div className='flex flex-col gap-4'>
      {Array.from({ length: 5 }).map((_, index) => (
        <ResourceSkeleton key={index} />
      ))}
    </div>
  )
}
