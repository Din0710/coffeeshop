import React, { useState } from 'react'
import forge from 'node-forge'
import axios from 'axios'
import Layout from '../../components/Layout'
import hmacPic from '../../public/img/hmac.jpg'
import Image from 'next/image'
import { computeHmac } from '../../utils/crypto-functions'

export default function HmacScreen() {
  const algorithms = ['md5', 'sha1', 'sha256', 'sha384', 'sha512']
  const [algorithm, setAlgorithm] = useState('sha256')
  const [secret, setSecret] = useState('Maxfiy bolishilgan kalit-lfdkjds')
  const [inputText, setInputText] = useState('Andoza kirish matni')
  const [hmacValue1, setHmacValue1] = useState('')
  const [hmacValue2, setHmacValue2] = useState('')

  const randomSecret = () => {
    setSecret(forge.util.bytesToHex(forge.random.getBytesSync(16)))
  }

  const submitHandler = async () => {
    setHmacValue1(computeHmac(algorithm, secret, inputText))

    await axios
      .post('/api/crypto/hmac', { algorithm, secret, inputText })
      .then((res) => {
        setHmacValue2(res.data.hmacValue)
      })
  }

  return (
    <Layout title="HMAC">
      <form className="mx-auto max-w-screen-lg">
        <h1 className="text-3xl mb-4 font-bold">
          HMAC (Xabarni tasdiqlash kodi){' '}
        </h1>

        <div className="mb-4 flex flex-row">
          <div className="basis-1/2">
            <label htmlFor="algo" className="mb-3 font-bold">
              Select HMAC Hash Algorithm (default to sha256)
            </label>
            {algorithms.map((algo) => (
              <div key={algo} className="mx-4 ">
                <input
                  name="algo"
                  className="p-2 outline-none focus:ring-0"
                  id={algo}
                  type="radio"
                  onChange={() => setAlgorithm(algo)}
                />
                <label className="p-2" htmlFor={algo}>
                  {algo}
                </label>
              </div>
            ))}
          </div>
          <div className="basis-1/2">
            <Image src={hmacPic} alt="hmac function" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="secret" className="mb-3 font-bold">
            Shared secret
          </label>
          <input
            type="text"
            name="secret"
            id="secret"
            className="w-full bg-gray-50"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <button
            className="primary-button w-full"
            type="button"
            onClick={randomSecret}
          >
            Generate random shared secret
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="input" className="mb-3 font-bold">
            Input Message
          </label>
          <textarea
            name="input"
            id="input"
            cols="50"
            rows="3"
            className="w-full bg-gray-50"
            autoFocus
            placeholder="텍스트를 입력하세요"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4">
          <button
            className="primary-button w-full"
            type="button"
            onClick={submitHandler}
          >
            Compute HMAC
          </button>
        </div>

        <div className="mb-4 overflow-x-auto">
          <h2 className="mb-3 font-bold">Result</h2>
          <div className="px-4 bg-slate-200">
            <p>Hash algorithm: {algorithm}</p>
            <p>Input text: {inputText}</p>
            <p>Shared secret: {secret}</p>
            <p className="overflow-x-auto text-red-700">
              HMAC value (client-side): {hmacValue1} ({hmacValue1.length * 4}{' '}
              bits)
            </p>
            <p className="overflow-x-auto  text-blue-700">
              HMAC value (server-side): {hmacValue2} ({hmacValue2.length * 4}{' '}
              bits)
            </p>
          </div>
        </div>
      </form>
    </Layout>
  )
}
