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
    if (json.ok) {
      setText('')
    }
  }, [salt, text])
  return (
    <div className="h-screen flex flex-col justify-between">
      <div>
        <div>
          <button onClick={submit} className="border rounded border-solid border-black p-2 m-2">submit</button>
        </div>
        <div>
          <textarea value={text} onChange={(e) => setText(e.currentTarget.value)} className="w-5/6 h-20 m-2 p-2 border rounded border-solid border-black"></textarea>
        </div>
      </div>
      <div className="p-2">
        <input value={salt} onChange={(e) => setSalt(e.currentTarget.value)} type="password" className="border rounded border-solid border-black mr-4 p-2 "></input>
        <button onClick={saveSalt} className="border border-solid border-black p-2">set</button>
      </div>
    </div>
  )
}
