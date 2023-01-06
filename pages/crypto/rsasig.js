import React, { useState } from 'react'
import Layout from '../../components/Layout'
// import Image from 'next/image'
// import rsakeyPic from '../../public/rsa-key.jpg'
// import rsaencPic from '../../public/rsa-enc.jpg'
import forge from 'node-forge'

const rsa = forge.pki.rsa
const pki = forge.pki

export default function RSASigScreen() {
  const lengths = [1024, 2048, 3072]

  const [keyLength, setKeyLength] = useState(1024)
  const [publicKey, setPublicKey] = useState('')
  const [publicKeyPem, setPublicKeyPem] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [privateKeyPem, setPrivateKeyPem] = useState('')

  const [plaintext, setPlaintext] = useState(
    'Hello world - 헬로월드 = Salom dunyo'
  )
  const [signature, setSignature] = useState('')
  const [signatureHex, setSignatureHex] = useState('')
  const [result, setResult] = useState('')

  const keyGen = () => {
    const keypair = rsa.generateKeyPair({ bits: keyLength, e: 0x10001 })
    setPublicKey(keypair.publicKey)
    setPublicKeyPem(pki.publicKeyToPem(keypair.publicKey))
    setPrivateKey(keypair.privateKey)
    setPrivateKeyPem(pki.privateKeyToPem(keypair.privateKey))
  }

  const signHandler = () => {
    let pss = forge.pss.create({
      md: forge.md.sha1.create(),
      mgf: forge.mgf.mgf1.create(forge.md.sha1.create()),
      saltLength: 20,
    })
    let md = forge.md.sha256.create()
    md.update(plaintext)
    let sig = privateKey.sign(md, pss)
    setSignature(sig)
    setSignatureHex(forge.util.bytesToHex(sig))
  }

  const verifyHandler = () => {
    let pss = forge.pss.create({
      md: forge.md.sha1.create(),
      mgf: forge.mgf.mgf1.create(forge.md.sha1.create()),
      saltLength: 20,
    })
    let md = forge.md.sha256.create()
    md.update(plaintext, 'utf8')
    let verified = publicKey.verify(md.digest().bytes(), signature, pss)
    setResult(verified ? 'Imzoni tasdiqlash OK' : 'Imzo Error')
  }

  return (
    <Layout title="RSA-Sig">
      <form className="mx-auto max-w-screen-lg">
        <h1 className="text-3xl mb-4 font-bold">
          RSA Signature (Elektron raqamli imzolar)
        </h1>

        <div className="mb-4 ">
          <p>
            RSA ommaviy kalitli kriptosistemalardan biri bolib, nafaqat
            shifrlash, balki raqamli imzolar ham U birinchi mumkin bolgan
            algoritm sifatida tanilgan. RSA ning elektron raqamli imzo
            funksiyasi Sertifikatlashni talab qiladigan elektron tijorat kabi
            RSAdan keng foydalanishni yoqish Bolgan edi. 1978 Ron Rivest, Adi
            Shamir Shamir, Leonard Adlemanning tadqiqotlari boyicha.
            Sistemalashtirilgan, nomi RSA bu uch kishining prefiksi hisoblanadi.
            Uch ixtirochi oz faoliyati uchun 2002 yilgi Turing mukofotiga
            sazovor bolgan
          </p>
          {/* <div className="mx-auto px-20">
            <Image src={rsakeyPic} alt="RSA key generation" />
            <Image src={rsaencPic} alt="RSA encryption" />
          </div> */}
        </div>

        <div className="mb-4">
          <label htmlFor="mode" className="mb-3 font-bold">
            Select Key Length (default to 1024)
          </label>
          {lengths.map((length) => (
            <div key={length} className="mx-4 ">
              <input
                name="length"
                className="p-2 outline-none focus:ring-0"
                id={length}
                type="radio"
                onChange={() => setKeyLength(length)}
              />
              <label className="p-2" htmlFor={length}>
                {length}
              </label>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <button
            className="primary-button w-full"
            type="button"
            onClick={keyGen}
          >
            RSA key generation (RSA Kalitni yaratish)
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="key" className="mb-3 font-bold">
            Public Key (Ochiq kalit)
          </label>
          <textarea
            type="text"
            name="key"
            id="key"
            cols="50"
            rows="5"
            className="w-full bg-gray-50"
            value={publicKeyPem}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label htmlFor="key" className="mb-3 font-bold">
            Private Key (Shaxsiy kalit)
          </label>
          <textarea
            type="text"
            name="key"
            id="key"
            cols="50"
            rows="5"
            className="w-full bg-gray-50"
            value={privateKeyPem}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label htmlFor="plaintext" className="mb-3 font-bold">
            Plaintext
          </label>
          <textarea
            type="text"
            name="plaintext"
            id="plaintext"
            cols="50"
            rows="3"
            className="w-full bg-gray-50"
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <button
            className="primary-button w-full"
            type="button"
            onClick={signHandler}
          >
            Signing (Elektron raqamli imzo yaratish)
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="ciphertext" className="mb-3 font-bold">
            Signature
          </label>
          <textarea
            type="text"
            name="signature"
            id="signature"
            cols="50"
            rows="6"
            className="w-full bg-gray-50"
            value={signatureHex}
            readOnly
          />
        </div>

        <div className="mb-4">
          <button
            className="primary-button w-full"
            type="button"
            onClick={verifyHandler}
          >
            Verification (Elektron raqamli imzoni tasdiqlash)
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="recoveredtext" className="mb-3 font-bold">
            Result
          </label>
          <input
            type="text"
            name="recoveredtext"
            id="recoveredtext"
            className="w-full bg-gray-50"
            value={result}
            readOnly
          />
        </div>
      </form>
    </Layout>
  )
}
