// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Client } = require("pg");

export default async function test(req, res) {
  if (req.method === 'POST') {
    const { body } = req;
    const { config, step } = body;

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
      if (step === "connection") {
        return res.status(200).json();
      } else if (step === "wal_level") {
        const results = await client.query("SHOW wal_level;");
        const { rows } = results;
        const [{ wal_level }] = rows;

        if (wal_level === "logical") {
          return res.status(200).json();
        } else {
          return res.status(400).json({ error: "Invalid. Set the WAL level to 'logical'"});
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.toString() });
    }
  }
}