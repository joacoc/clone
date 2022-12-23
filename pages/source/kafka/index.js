import { Inter } from '@next/font/google'
import { useState } from 'react'
import styles from '../../../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Kafka() {
    return (
        <main className={styles.main}>
            <div className={styles.center}>
                <a
                    href="/source/kafka/confluent"
                    className={styles.card}
                >
                    <h2 className={inter.className}>
                    Confluent Cloud
                    </h2>
                    <p className={inter.className}>
                    Using your Confluent Cloud credentials
                    </p>
                </a>
                <a
                    href="/source/kafka/redpanda"
                    className={styles.card}
                    >
                    <h2 className={inter.className}>
                        Redpanda Cloud
                    </h2>
                    <p className={inter.className}>
                        Using your Redpanda Cloud credentials
                    </p>
                </a>
                <a
                    href="/source/kafka/manual"
                    className={styles.card}
                    >
                    <h2 className={inter.className}>
                        Manual
                    </h2>
                    <p className={inter.className}>
                        Insert your Kafka config
                    </p>
                </a>
            </div>
        </main>
    )
}