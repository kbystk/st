import {pool} from '../../lib/pool'

export default async function latest (req, res) {
  res.statusCode = 200
  if (req.query.salt === process.env.SALT) {
    const client = await pool.connect()
    const result = await client.query(`
      insert into statuses (text) values('${req.query.text}')
    `)
    if (result.rowCount) {
      res.end(JSON.stringify({ ok: true }))
    } else {
      console.error(result)
      res.end(JSON.stringify({ ok: false }))
    }
  } else {
    res.end(JSON.stringify({ who: '?' }))
  }
}
