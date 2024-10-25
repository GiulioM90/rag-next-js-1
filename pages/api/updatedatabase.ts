import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { NextApiRequest, NextApiResponse } from "next";
import { Pinecone } from "@pinecone-database/pinecone";

const postDB =  async (req:NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { indexname, namespace} = JSON.parse(req.bbody)
    await handleUpload(indexname, namespace, res)
  }
}

const handleUpload = (indexname : string, namespace: string, res: NextApiResponse) => {
  const loader = new DirectoryLoader('./documents', {
    '.pdf': (path: string) => new PDFLoader(path, {
      splitPages: false
    }),
    '.txt': (path: string) => new TextLoader(path)
  })
  const docs = await loader.load()
  const client = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!
  })
}

export default postDB