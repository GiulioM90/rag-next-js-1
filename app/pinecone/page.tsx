'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Callout } from '@/components/ui/Callout'
import React from 'react'
import { Database, RefreshCcw, MoveUp, LucideLoader2 } from 'lucide-react'
import { Label } from '@/components/ui/label'

const VectorDBPage = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [indexname, setIndexName] = useState('')
  const [namespace, setNamespace] = useState('')
  const [filename, setFilename] = useState('')
  const [progress, setProgress] = useState(0)
  const [fileListAsText, setFileListAsText] = useState('')
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onFileListRefresh = async () => {
    setFileListAsText('')
    const response = await fetch('api/getfilelist',{ method: 'GET'})
    const filenames = await response.json()
    const resultString = (filenames as []).map(filename => `📄 ${filename}`).join('\n');
    setFileListAsText(resultString);
  }

  const onStartUpload = async () => {
    if(!indexname || !namespace){
      const missing = []
      if (!indexname) missing.push('Index Name')
      if (!namespace) missing.push('Namespace')
      setErrorMessage(`Please fill in: ${missing.join(', ')}`)
      setShowError(true)
      return
    }
    setProgress(0)
    setFilename('')
    setIsUploading(true)
    const response = await fetch('api/updatedatabase', { method: 'POST', body : JSON.stringify({
      indexname,
      namespace
    })})
    console.log(response)
    await processStreamedProgress(response)
  }

  async function processStreamedProgress(response: Response) {
    const reader = response.body?.getReader()
    if (!reader) {
      console.error('Reader was not found')
      return
    }
    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          setIsUploading(false)
          break
        }
        const data = new TextDecoder().decode(value)
        console.log(data)
        const {filename, totalChunks, chunksUpserted} = JSON.parse(data)
        const currentProgress = (chunksUpserted/totalChunks) * 100
        setProgress(currentProgress)
        setFilename(filename)
        setFilename(`${filename} [${chunksUpserted}/${totalChunks}]`)
      }
    } catch (error) {
        console.error("Error reading response: ", error);
    } finally {
        reader.releaseLock();
    }
  }

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showError])

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
                  <Button onClick={onFileListRefresh} className='aboslute -right-4 -top-4' variant={'ghost'} size={'icon'}>
                    <RefreshCcw />
                  </Button>
                  <Label>
                    Files List:
                  </Label>
                  <Textarea readOnly value={fileListAsText}
                    className='min-h-24 resize-none border p-3 shadow-none disabled:cursor-default focus-visible:ring-0 text-sm text-muted-foreground'
                  />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='grid gap-2'>
                    <Label>
                      Index Name
                    </Label>
                    <Input value={indexname || ''} onChange={e => setIndexName(e.target.value)} placeholder='index name' disabled={isUploading} className='disabled:cursor-default'>
                    </Input>
                  </div>
                  <div>
                    <Label>
                      Namespace
                    </Label>
                    <Input value={namespace || ''} onChange={e => setNamespace(e.target.value)} placeholder='namespace' disabled={isUploading} className='disabled:cursor-default'>
                    </Input>
                  </div>
                </div>
              {showError && (
                <Callout variant="error">
                  {errorMessage}
                </Callout>
              )}
              </div>
              <Button onClick={onStartUpload} variant={'outline'} className='w-full h-full' disabled={isUploading}>
                <span className='flex flex-row'>
                  <Database size={50} className='stroke-[#D90013]'/>
                  <MoveUp className='stroke-[#D90013]'/>
                </span>
              </Button>
            </div>
            { isUploading && <div className='mt-4'>
              <Label>File Name: {filename}</Label>
              <div className='flex flex-row items-center gap-4'>
                <Progress value={progress}/>
                <LucideLoader2 className='stroke-[#D90013] animate-spin'/>
              </div>
            </div>}
        </CardContent>
      </Card>
    </main>
  )
}

export default VectorDBPage