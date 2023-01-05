import Link from 'next/link'
import React from 'react'
import Layout from '../../components/Layout'

export default function Crypto() {
  return (
    <Layout title="Crypto">
      <h1 className="mb-4 text-2xl text-center">
        Crypto Test (Shifrlash algoritm tets)
      </h1>
      <div className="mx-auto max-w-screen-sm ">
        <div className="button-link">
          <Link href="crypto/hash">
            <a className="text-lg"> Hash Function - Hash funksiyasi </a>
          </Link>
        </div>

        <div className="button-link">
          <Link href="crypto/hmac">
            <a className="text-lg">
              Message Authentication Code (HMAC) - SMS Kodi
            </a>
          </Link>
        </div>

        <div className="button-link">
          <Link href="crypto/pbkdf2">
            <a className="text-lg">
              Password-based Key Derivation Function - Parolga asoslangan kalit
            </a>
          </Link>
        </div>

        <div className="button-link">
          <Link href="crypto/passwordHash">
            <a className="text-lg">Password Hash Salting - Parol hash</a>
          </Link>
        </div>

        <div className="button-link">
          <Link href="crypto/aes">
            <a className=" text-xl">AES encryption - Shifrlash </a>
          </Link>
        </div>

        <div className="button-link">
          <Link href="crypto/rsaenc">
            <a className=" text-xl">
              RSA encryption - Ommaviy kalitlar kriptografiyasi{' '}
            </a>
          </Link>
        </div>

        <div className="button-link">
          <Link href="crypto/rsasig">
            <a className=" text-xl">
              RSA signature - Elektron raqamli imzolar{' '}
            </a>
          </Link>
        </div>

        <div className="button-link">
          <Link href="crypto/jwt">
            <a className=" text-xl">JSON Web Token (JWT) </a>
          </Link>
        </div>

        <div className="button-link">
          <Link href="crypto/cert">
            <a className=" text-xl">Certificate - sertifikat </a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
