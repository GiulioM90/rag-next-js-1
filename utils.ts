import { Pinecone } from "@pinecone-database/pinecone";
import { Document } from "langchain/document";

export const updateVectorDB = async(
  client: Pinecone,
  indexname: string,
  namespace: string,
  docs: Document[],
  progressCallback: (
    filename: string, 
    totalChunks: number, 
    chunksUpserted: number,
    isComplete: boolean
  )
) => {
  
} 