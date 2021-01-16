import {useState, useEffect} from 'react'
import Head from 'next/head'

const endpoint = process.env.VERCEL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'

export async function getStaticPaths () {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export async function getStaticProps () {
  const res = await fetch(`${endpoint}/api/latest`)
  const status = await res.json()
  return {
    props: {
      status,
      generatedAt: new Date().getTime()
    },
    revalidate:60
  }
}

export default function TopPage ({ status, generatedAt }) {
  const [createdAt, setCreatedAt] = useState('')
  useEffect(() => {
    setCreatedAt(new Date(status.created_at).toLocaleString())
  }, [])
  return status ? (
    <>
      <Head>
        <title>{status.text}</title>
      </Head>
      <div className="h-screen flex flex-col justify-center">
        <p className="text-9xl ml-8">{status.text}</p>
        <p className="text-2xl ml-16">{createdAt}</p>
        <p className="text-2xl ml-16">{generatedAt}</p>
      </div>
    </>
  ) : null
}
