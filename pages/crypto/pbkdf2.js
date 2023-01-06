import React, { useState } from 'react'
import Layout from '../../components/Layout'
import forge from 'node-forge'
import Image from 'next/image'
import pbkdf2Pic from '../../public/img/pbkdf2.jpg'
import axios from 'axios'

export default function Pbkdf2Screen() {
  const [password, setPassword] = useState('supersecretpassword')
  const [salt, setSalt] = useState('')
  const [iteration, setIteration] = useState(1000)
  const [keyLength, setKeyLength] = useState(16)
  const [key1, setKey1] = useState('')
  const [key2, setKey2] = useState('')

  const submitHandler = async () => {
    await axios
      .post('/api/crypto/pbkdf2', { password, salt, iteration, keyLength })
      .then((res) => {
        setKey2(res.data.derivedKey)
      })

    const derivedKey = forge.util.bytesToHex(
      forge.pkcs5.pbkdf2(password, salt, iteration, keyLength)
    )

    setKey1(derivedKey)
  }

  const randomSalt = () => {
    setSalt(forge.util.bytesToHex(forge.random.getBytesSync(16)))
  }

  return (
    <Layout title="PBKDF2">
      <form className="mx-auto max-w-screen-lg">
        <h1 className="text-3xl mb-4 font-bold">
          PBKDF2 (Maxfiy kalit yaratish)
        </h1>

        <div className="mb-4">
          <p>
            Foydalanuvchi tomonidan kiritilgan paroldan xususiy kalit sifatida
            foydalanish togridan-togri sobit kalit ekanligini anglatadi Uni
            ishlatish mumkin bolganligi sababli, lugat hujumlari kabi usullar
            mumkin, shuning uchun xavfsizlik bilan bogliq koplab muammolar
            mavjud. Buni yechish uchun biz parol asosidagi kalitni generatlash
            funksiyasini (PBKDF2) ishlatamiz. 1 Foydalanuvchi kirishining
            paroli, 2 Tasodifiy tuz qiymati, 3 iteratsiya qiymati yordamida
            tasodifiy songa o`xshagan shifrlash kaliti yaratish va undan
            foydalanish. Tuz qiymati va iteratsiyalar soni hujumchiga oldindan
            hujum qilishni qiyinlashtiradi. muhim ahamiyat kasb etadi.
          </p>
          <Image src={pbkdf2Pic} alt="pbkdf2" />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="mb-3 font-bold">
            Input password
          </label>
          <input
            type="text"
            name="password"
            id="password"
            className="w-full bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="salt" className="mb-3 font-bold">
            Salt
          </label>
          <input
            type="text"
            name="salt"
            id="salt"
            className="w-full bg-gray-50"
            value={salt}
            onChange={(e) => setSalt(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <button
            className="primary-button w-full"
            type="button"
            onClick={randomSalt}
          >
            Generate random salt
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="iteration" className="mb-3 font-bold">
            Iteration
          </label>
          <input
            type="number"
            name="iteration"
            id="iteration"
            className="w-full bg-gray-50"
            value={iteration}
            onChange={(e) => setIteration(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="keyLength" className="mb-3 font-bold">
            Key Length
          </label>
          <input
            type="number"
            name="keyLength"
            id="keyLength"
            className="w-full bg-gray-50"
            value={keyLength}
            onChange={(e) => setKeyLength(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <button
            className="primary-button w-full"
            type="button"
            onClick={submitHandler}
          >
            Generate PBKDF2 key
          </button>
        </div>

        <div className="mb-4 overflow-x-auto">
          <h2 className="mb-3 font-bold">Result</h2>
          <div className="px-4 bg-slate-200">
            <p>Password: {password}</p>
            <p>Salt: {salt}</p>
            <p>Iteration: {iteration}</p>
            <p>Key length: {keyLength} bytes</p>
            <p className="overflow-x-auto text-red-700">
              Generated key (client-side): {key1} ({key1.length * 4} bits)
            </p>
            <p className="overflow-x-auto  text-blue-700">
              Generated key (server-side): {key2} ({key2.length * 4} bits)
            </p>
          </div>
        </div>
      </form>
    </Layout>
  )
}
