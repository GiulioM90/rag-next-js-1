'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import React from 'react'
import { Database, RefreshCcw, MoveUp, LucideLoader2 } from 'lucide-react'
import { Label } from '@/components/ui/label'

type Props = {}

const VectorDBPage = (props: Props) => {
  const [isUploading, setIsUploading] = useState(true)
  return (
    <main className='flex flex-col items-center p-24'>
      <Card>
        <CardHeader>
          <CardTitle>Update Knowledge Base</CardTitle>
          <CardDescription>Add new docuemnts to your vector DB</CardDescription>
        </CardHeader>
        <CardContent>
            <div className='grid grid-cols-3 gap-4'>
              <div className='col-span-2 grid gap-4 border rounded-lg p-6'>
                <div className='gap-4 relative'>
                  <Button className='aboslute -right-4 -top-4' variant={'ghost'} size={'icon'}>
                    <RefreshCcw />
                  </Button>
                  <Label>
                    Files List:
                  </Label>
                  <Textarea readOnly className='min-h-24 resize-none border-p3 shadow-none disabled:cursor-default focus-visible:ring-0 text-sm text-muted-foreground'/>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='grid gap-2'>
                    <Label>
                      Index Name
                    </Label>
                    <Input placeholder='index name' disabled={isUploading} className='disabled:cursor-default'>
                    </Input>
                  </div>
                  <div>
                    <Label>
                      Namespace
                    </Label>
                    <Input placeholder='namespace' disabled={isUploading} className='disabled:cursor-default'>
                    </Input>
                  </div>
                </div>
              </div>
              <Button variant={'outline'} className='w-full h-full' disabled={isUploading}>
                <span className='flex flex-row'>
                  <Database size={50} className='stroke-[#D90013]'/>
                  <MoveUp className='stroke-[#D90013]'/>
                </span>
              </Button>
            </div>
            { isUploading && <div className='mt-4'>
              <Label>File Name:</Label>
              <div className='flex flex-row items-center gap-4'>
                <Progress value={80}/>
                <LucideLoader2 className='stroke-[#D90013] animate-spin'/>
              </div>
            </div>}
        </CardContent>
      </Card>
    </main>
  )
}

export default VectorDBPage