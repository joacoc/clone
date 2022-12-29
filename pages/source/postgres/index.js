import styles from '../../../styles/Home.module.css'
import { useState } from 'react';
import Test from './test';
import Config from './config';
import Tables from "./tables";
import Replicate from './replicate';
import Materialize from "./materialize";
import Build from './build';
import Done from './done';

export default function Postgres() {
    const [config, setConfig] = useState();
    const [materializeConfig, setMaterializeConfig] = useState();
    const [step, setStep] = useState("config");
    const [tableNames, setTableNames] = useState(new Set());

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setConfig({
            ...config,
            [name]: value
        });
    };

    const handleMaterializeInputChange = (event) => {
        const { name, value } = event.target;

        setMaterializeConfig({
            ...materializeConfig,
            [name]: value
        });
    };

    const handleNextClick = () => {
        switch (step) {
            case "config":
                setStep("test");
                break;
            case "test":
                setStep("tables");
                break;
            case "tables":
                setStep("replicate");
                break;
            case "replicate":
                setStep("materialize");
                break;
            case "materialize":
                setStep("build");
                break;
            case "build":
                setStep("done");
                break;
            default:
                break;
        }
    };

    const handleOnTableChange = (name, checked) => {
        if (checked) {
            tableNames.add(name);
        } else {
            tableNames.delete(name);
        }

        setTableNames(new Set(tableNames));
    }

    return (
        <main className={styles.main}>
            <div className={styles.center}>
                <div className='z-30 flex flex-col'>
                    <div className='text-center font-light pb-10'>
                        {step === "config" && (
                            <>
                                <h1 className='text-gray-500 text-xl'>Postgres</h1>
                                <p className='text-gray-400'>Type your source credentials</p>
                            </>
                        )}
                        {step === "test" && (
                            <>
                                <h1 className='text-gray-500 text-xl'>Postgres</h1>
                                <p className='text-gray-400'>Veryfing your source</p>
                            </>
                        )}
                        {step === "tables" && (
                            <>
                                <h1 className='text-gray-500 text-xl'>Postgres</h1>
                                <p className='text-gray-400'>Select the tables you want to replicate</p>
                            </>
                        )}
                        {step === "replicate" && (
                            <>
                                <h1 className='text-gray-500 text-xl'>Postgres</h1>
                                <p className='text-gray-400'>Enabling replication in the tables</p>
                            </>
                        )}
                        {step === "materialize" && (
                            <>
                                <h1 className='text-gray-500 text-xl'>Materialize</h1>
                                <p className='text-gray-400'>Type your Materialize credentials</p>
                            </>
                        )}
                        {step === "build" && (
                            <>
                                <h1 className='text-gray-500 text-xl'>Materialize</h1>
                                <p className='text-gray-400'>Building your source</p>
                            </>
                        )}
                        {step === "done" && (
                            <>
                                <h1 className='text-gray-500 text-xl'>Done.</h1>
                                <p className='text-gray-400'>Your source is now ready and ingesting 🎉</p>
                            </>
                        )}
                    </div>

                    {step === "config" && <Config handleInputChange={handleInputChange} /> }
                    {step === "test" && <Test config={config} onBack={() => {}} /> }
                    {step === "tables" && <Tables config={config} onChange={handleOnTableChange} /> }
                    {step === "replicate" && <Replicate config={config} tableNames={Array.from(tableNames.values())} onBack={() => {}} /> }
                    {step === "materialize" && <Materialize config={config} handleInputChange={handleMaterializeInputChange}  /> }
                    {step === "build" && <Build config={config} materializeConfig={materializeConfig}  /> }

                    <button
                        type="button"
                        className="w-fit p-10 mt-10 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleNextClick}
                    >
                    {step === "config" && "Test" }
                    {step === "test" && "Next" }
                    {step === "tables" && "Replicate" }
                    {step === "replicate" && "Materialize" }
                    {step === "materialize" && "Continue" }
                    {step === "build" && "Done" }
                    {step === "done" && "Nothing" }
                    </button>
                </div>
            </div>
        </main>
    )
}
