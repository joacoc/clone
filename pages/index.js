import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Router from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const onNext = (url) => {
      Router.push(url)
  };

  return (
    <>
      <Head>
        <title>Materialize CDC</title>
        <meta name="description" content="Materialize CDC" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          {/* <div
            className={styles.card}
            onClick={() => {onNext("/source/kafka")}}
          >
            <h2 className={inter.className}>
              Kafka
            </h2>
            <p className={inter.className}>
              Consume, process and serve multiple topics
            </p>
          </div> */}
          <div
              className={styles.card}
              onClick={() => {onNext("/source/postgres")}}
            >
              <h2 className={inter.className}>
                Postgres
              </h2>
              <p className={inter.className}>
                Replicate, process and serve one or more tables
              </p>
            </div>
        </div>
      </main>
    </>
  )
}
