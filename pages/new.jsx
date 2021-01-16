import { useCallback, useEffect, useState } from "react"

export default function New () {
  const [salt, setSalt] = useState('')
  const saveSalt = useCallback(() => {
    localStorage.setItem('salt', salt)
  }, [salt])
  useEffect(() => {
    setSalt(localStorage.getItem('salt'))
  }, [])
  const [text, setText] = useState('')
  const submit = useCallback(async () => {
    const res = await fetch(`/api/new?salt=${salt}&text=${encodeURIComponent(text)}`)
    const json = await res.json()
    console.log(json)
  }, [salt, text])
  return (
    <div>
      <div>
        <button onClick={submit}>submit</button>
      </div>
      <div>
        <textarea value={text} onChange={(e) => setText(e.currentTarget.value)}></textarea>
      </div>
      <div>
        <input value={salt} onChange={(e) => setSalt(e.currentTarget.value)} type="password"></input>
        <button onClick={saveSalt}>set</button>
      </div>
    </div>
  )
}
