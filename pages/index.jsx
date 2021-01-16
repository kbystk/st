import {useEffect, useState} from 'react'

export default function TopPage () {
  const [status, setStatus] = useState(null)
  useEffect(() => {
    fetch('/api/latest').then(res => res.json()).then(json => setStatus(json))
  }, [])
  return status ? <h1>{status.text}</h1> : null
}
