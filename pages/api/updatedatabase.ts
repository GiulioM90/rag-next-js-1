import { NextApiRequest, NextApiResponse } from "next";
// import { Pinecone } from "@pinecone-database/pinecone";
import { createClient, loadFolder } from 'db-vector'
import { updateVectorDB } from "@/utils";

const postDB =  async (req:NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { indexname, namespace} = JSON.parse(req.body)
    await handleUpload(indexname, namespace, res)
  }
}

const handleUpload = async (indexname : string, namespace: string, res: NextApiResponse) => {

  console.log('indexname in handleUpload', indexname)
  const docs = await loadFolder('./documents')

  const client = createClient({
    provider: 'pinecone',
    apiKey: process.env.PINECONE_API_KEY!,
    config: {}
  });

  await updateVectorDB(client, indexname, namespace, docs, (filename, totalChunks, chunksUpserted, isComplete) => {
    console.log(`${filename}-${totalChunks}-${chunksUpserted}-${isComplete}`)
    if (!isComplete){
      res.write(
        JSON.stringify({
          filename,
          totalChunks,
          chunksUpserted,
          isComplete
        })
      )
    }else{
      res.end()
    }
  })
}

export default postDB