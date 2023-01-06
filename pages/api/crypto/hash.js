// import forge from 'node-forge'
import { computeHash } from '../../../utils/crypto-functions'

export default function handler(req, res) {
  const { algorithm, inputText } = req.body
  let hashValue = computeHash(algorithm, inputText)

  res.status(200).json({ hashValue })
}
