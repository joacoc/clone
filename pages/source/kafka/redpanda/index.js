import { Inter } from '@next/font/google'
import styles from '../../../../styles/Home.module.css'
import Router from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Redpanda() {
    const onNext = () => {
        Router.push('/source/kafka/topics')
    };

    return (
        <main className={styles.main}>
            <div className={styles.center}>
                <div className='flex flex-col z-30 gap-3'>
                    <div>
                        <label htmlFor="broker" className="block text-sm font-medium text-gray-700">
                            Broker URL
                        </label>
                        <div className="mt-1">
                            <input
                            type="text"
                            name="broker"
                            id="broker"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder=""
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="ssl_key" className="block text-sm font-medium text-gray-700">
                            SSL Key
                        </label>
                        <div className="mt-1">
                            <input
                            type="text"
                            name="ssl_key"
                            id="ssl_key"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder=""
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="ssl_cert" className="block text-sm font-medium text-gray-700">
                            SSL Cert
                        </label>
                        <div className="mt-1">
                            <input
                            type="text"
                            name="ssl_cert"
                            id="ssl_cert"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder=""
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-fit p-10 mt-10 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={onNext}
                    >
                        Next
                    </button>
                    </div>
            </div>
        </main>
    )
}
