import {useEffect, useState, useMemo} from 'react'
import Head from 'next/head'

export default function TopPage () {
  const [status, setStatus] = useState(null)
  const createdAt = useMemo(() => {
    if (status) {
      return new Date(status.created_at).toLocaleString()
    } else {
      return ''
    }
  }, [status])
  useEffect(() => {
    fetch('/api/latest').then(res => res.json()).then(json => setStatus(json))
  }, [])
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
