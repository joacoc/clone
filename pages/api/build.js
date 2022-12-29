// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Client } = require("pg");

export default async function build(req, res) {
  if (req.method === 'POST') {
    const { body } = req;
    const { config, materializeConfig, step } = body;

    const { host, username, password, port, database } = config;
    if (!host || !username || !password || !database) {
      res.status(400).json({ error: 'Missing Postgres config fields.' });
      return;
    }


    const { host: mHost, username: mUsername, password: mPassword, port: mPort, database: mDatabase } = materializeConfig;
    if (!mHost || !mUsername || !mPassword || !mDatabase) {
      res.status(400).json({ error: 'Missing Materialize config fields.' });
      return;
    }

    const client = new Client({
      host: mHost,
      user: mUsername,
      password: mPassword,
      database: mDatabase,
      port: mPort,
      ssl: true
    });

    try {
      await client.connect();

      switch (step) {
        case "connection":
          return res.status(200).json();

        case "secrets":
          await client.query(`CREATE SECRET pg_auto_pass AS '${password}';`);
          return res.status(200).json();

        case "connection_postgres":
          await client.query(`CREATE CONNECTION pg_auto_connection TO POSTGRES (
            HOST '${host}',
            PORT ${port},
            USER '${username}',
            PASSWORD SECRET pg_auto_pass,
            SSL MODE 'require',
            DATABASE '${database}'
          );`);
          return res.status(200).json();
        case "source":
          await client.query(`CREATE SOURCE mz_auto_source
          FROM POSTGRES CONNECTION pg_auto_connection (PUBLICATION 'mz_auto_source')
          FOR ALL TABLES
          WITH (SIZE = '3xsmall');`);
          return res.status(200).json();

        default:
          break;
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.toString() });
    }
  }
}