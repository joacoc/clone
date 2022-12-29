// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function tables(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

const { Client } = require("pg");

export default async function replicate(req, res) {
  if (req.method === 'POST') {
    const { body } = req;
    const { config, step, tableNames } = body;

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

        if (step === "identity") {
            const promises = [];
            tableNames.forEach((tableName) => {
              const query =`ALTER TABLE ${tableName} REPLICA IDENTITY FULL;`
              promises.push(client.query(query));
            });
            await Promise.all(promises);

            return res.status(200).json();
        } else if (step === "publication") {
            const query = `CREATE PUBLICATION mz_auto_source FOR TABLE ${tableNames.join(", ")};`;
            await client.query(query);
            return res.status(200).json();
        }

        return res.status(200);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.toString() });
    }
  }
}