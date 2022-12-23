import { Inter } from '@next/font/google'
import styles from '../../../../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
const topics = [
    "users",
    "sales",
    "cdc_mysql",
    "shopify",
    "stripe",
    "comments"
]

export default function Topics() {
    const onNext = () => {
    };

    return (
        <main className={styles.main}>
            <div className={styles.center}>
                <fieldset>
                    <legend className="text-lg font-medium text-gray-900">Topics</legend>
                    <div className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
                        {topics.map((topic, topicIdx) => (
                        <div key={topicIdx} className="relative flex items-start py-4">
                            <div className="min-w-0 flex-1 text-sm">
                            <label htmlFor={`topic-${topic}`} className="select-none font-medium text-gray-700">
                                {topic}
                            </label>
                            </div>
                            <div className="ml-3 flex h-5 items-center">
                            <input
                                id={`topic-${topic}`}
                                name={`topic-${topic}`}
                                type="checkbox"
                                className="ml-6 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            </div>
                        </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        className="w-fit p-10 mx-auto mt-10 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={onNext}
                    >
                        Build
                    </button>
                </fieldset>
            </div>
        </main>
    )
}