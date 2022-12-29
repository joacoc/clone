// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function tables(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

const { Client } = require("pg");

export default async function tables(req, res) {
  if (req.method === 'POST') {
    const { body: config } = req;

    if (!config) {
      console.log("Missing config;")
        res.status(400).json({ error: 'Missing config.' });
        return;
    }

    const { host, username, password, port, database, ssl } = config;
    if (!host || !username || !password || !database) {
      res.status(400).json({ error: 'Missing config fields.' });
      return;
    }

    const client = new Client({
        host,
        port,
        user: username,
        password,
        database,
        ssl: ssl || host.startsWith("https://")
    });

    try {
        await client.connect();
        const results = await client.query(`
          SELECT table_name
          FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_type = 'BASE TABLE';
        `);

        return res.status(200).json(results.rows.map(({ table_name }) => ({ tableName: table_name })));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.toString() });
    }
  }
}