import { Document } from "langchain/document";
import { batchsize } from "./config";
import { processDocument } from "db-vector";

const updateVectorDB = async(
  client: any,
  indexname: string,
  namespace: string,
  docs: Document[],
  progressCallback: (
    filename: string, 
    totalChunks: number, 
    chunksUpserted: number,
    isComplete: boolean
  ) => void
) => {
  console.log('indexName entered in updateVectorDB', indexname)
  
  for(const doc of docs){
    await processDocument(client, indexname, namespace, doc, {
      batchSize: batchsize,
      onProgress: progressCallback
    })
  }
} 



export { updateVectorDB }