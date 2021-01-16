import {useMemo} from 'react'
import Head from 'next/head'

const endpoint = process.env.VERCEL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'

export async function getServerSideProps () {
  const res = await fetch(`${endpoint}/api/latest`)
  const status = await res.json()
  return {
    props: {
      status
    }
  }
}

export default function TopPage ({ status }) {
  const createdAt = useMemo(() => {
    if (status) {
      return new Date(status.created_at).toLocaleString()
    } else {
      return ''
    }
  }, [status])
  return status ? (
    <>
      <Head>
        <title>{status.text}</title>
      </Head>
      <div className="h-screen flex flex-col justify-center">
        <p className="text-9xl ml-8">{status.text}</p>
        <p className="text-2xl ml-16">{createdAt}</p>
      </div>
    </>
  ) : null
}
