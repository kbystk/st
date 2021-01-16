import {pool} from '../../lib/pool'

export default async function latest (req, res) {
  const client = await pool.connect()
  const result = await client.query(`
    select *
    from statuses
    order by created_at desc
    limit 1
  `)
  res.statusCode = 200
  res.end(JSON.stringify(result.rows[0]))
}
