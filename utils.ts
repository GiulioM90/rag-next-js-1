import { pipeline, FeatureExtractionPipeline } from "@huggingface/transformers";
import { Pinecone } from "@pinecone-database/pinecone";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";

const updateVectorDB = async(
  client: Pinecone,
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
  const modelname = 'mixedbread-ai/mxbai-embed-large-v1'
  const extractor = await pipeline('feature-extraction', modelname, {
    // quantized: false
  })
  for(const doc of docs){
    await processDocument(client, indexname, namespace, doc, extractor)
}
} 

async function processDocument(client: Pinecone, indexname: string, namespace: string, doc: Document<Record<string, any>>, extractor: FeatureExtractionPipeline) {
  console.log(doc)
//   const splitter = new RecursiveCharacterTextSplitter();
//   const documentChunks = await splitter.splitText(doc.pageContent);
//   totalDocumentChunks = documentChunks.length;
//   totalDocumentChunksUpseted = 0;
//   const filename = getFilename(doc.metadata.source);
  
//   console.log(documentChunks.length);
//   let chunkBatchIndex = 0;
//   while(documentChunks.length > 0){
//       chunkBatchIndex++;
//       const chunkBatch = documentChunks.splice(0,batchsize)
//       await processOneBatch(client, indexname, namespace, extractor, chunkBatch, chunkBatchIndex, filename)
//   }
}

export { updateVectorDB }