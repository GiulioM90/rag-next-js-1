import { NextApiRequest, NextApiResponse } from "next";

const postDB =  async (req:NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { indexname, namespace} = JSON.parse(req.bbody)
    await handleUpload(indexname, namespace, res)
  }
}

const handleUpload = (indexname : string, namespace: string, res: NextApiResponse) => {

}

export default postDB