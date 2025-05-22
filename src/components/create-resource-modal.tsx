'use client'

import { createResource } from '@/actions/resources'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PlusIcon } from 'lucide-react'
import Form from 'next/form'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { DialogHeader } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

export function CreateResourceModal({ userId }: { userId: string }) {
  const [state, formAction, isPending] = useActionState(createResource, {
    errors: {},
    success: undefined,
    data: undefined,
  })

  useEffect(() => {
    if (state?.success) {
      toast.success('Resource created successfully')
    }
    if (state?.success === false) {
      toast.error('Failed to create resource')
    }
  }, [state?.success])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          size='lg'
        >
          <PlusIcon className='h-4 w-4' />
          Add Resource
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Resource</DialogTitle>
        </DialogHeader>
        <Form action={formAction}>
          <input
            type='hidden'
            name='ownerId'
            value={userId}
          />
          <div className='grid grid-cols-2 gap-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                name='name'
                placeholder='Enter resource name'
                required
                disabled={isPending}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='url'>URL</Label>
              <Input
                id='url'
                name='url'
                placeholder='Enter resource URL'
                required
                disabled={isPending}
              />
            </div>
            <div className='col-span-2 space-y-2'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                name='description'
                placeholder='Enter resource description'
                required
                disabled={isPending}
              />
            </div>
            <div className='col-span-2 space-y-2'>
              <Label htmlFor='imageUrl'>Image URL (optional)</Label>
              <Input
                id='imageUrl'
                name='imageUrl'
                placeholder='Enter image URL'
                disabled={isPending}
              />
            </div>
            <div className='col-span-2 flex justify-end'>
              <Button
                type='submit'
                disabled={isPending}
              >
                {isPending ? 'Creating...' : 'Create'}
              </Button>
            </div>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
