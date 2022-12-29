import { useEffect, useState } from "react";

export default function Build(props) {
    const { config, materializeConfig, onHandleDone, onHandleError } = props;
    const [step, setStep] = useState("connection");
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/build`, {
            body: JSON.stringify({
                step,
                config: {
                    ...config,
                    database: "postgres",
                    port: "5432"
                },
                materializeConfig: {
                    ...materializeConfig,
                    database: "materialize",
                    port: "6875"
                },
            }),
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((r) => {
            if (r.status === 200) {
                if (step === "connection") {
                    setStep("secrets");
                } else if (step === "secrets") {
                    setStep("connection_postgres");
                } else if (step === "connection_postgres") {
                    setStep("source");
                } else if (step === "source" && onHandleDone) {
                    onHandleDone();
                }
            } else {
                r.json().then(({ error }) => {
                    setError(error);
                }).catch((err) => {
                    console.error(err);
                    setError("Error querying Postgres.");
                });

                if (onHandleError) {
                    onHandleError();
                }
            }
        }).finally(() => setLoading(false));
    }, [config, step, onHandleDone, onHandleError, materializeConfig]);

    return (
        <div className="font-light space-y-10 mt-4 divide-y divide-gray-200">
            <div>
                <div className={`flex flex-row space-x-5 ${(error || step !== "connection") ? "opacity-50" : "" }`}>
                    {loading && step === "connection" && <p className="text-gray-600">Loading</p>}
                    {!loading && step === "connection" && <p className="text-red-600 font-normal">Failed</p>}
                    {step !== "connection" && <p className="text-green-600 font-normal">Done</p>}
                    <p>Connection test</p>
                </div>
                {error && step === "connection" && <div className="rounded-sm p-2 bg-red-50 border border-red-300 flex flex-row space-x-2 mt-2 text-sm">
                    <p className="text-gray-500">Error </p>
                    <p className="text-gray-600">{error}</p>
                </div>}
            </div>
            <div className="pt-5">
                <div className={`flex flex-row space-x-5 ${(error || step !== "secrets") ? "opacity-50" : "" }`}>
                    {step === "connection" && <p className="text-gray-600">Next</p>}
                    {loading && step === "secrets" && <p className="text-gray-600">Loading</p>}
                    {!loading && step === "secrets" && <p className="text-red-600 font-normal">Failed</p>}
                    {(step === "connection_postgres" || step === "source") && <p className="text-green-600 font-normal">Done</p>}
                    <p>Creating secrets</p>
                </div>
                {error && step === "secrets" && <div className="rounded-sm p-2 bg-red-50 border border-red-300 flex flex-row space-x-2 mt-2 text-sm">
                    <p className="text-gray-500">Error </p>
                    <p className="text-gray-600">{error}</p>
                </div>}
            </div>
            <div className="pt-5">
                <div className={`flex flex-row space-x-5 ${(error || step !== "connection_postgres") ? "opacity-50" : "" }`}>
                    {(step === "connection" || step === "secrets") && <p className="text-gray-600">Next</p>}
                    {loading && step === "connection_postgres" && <p className="text-gray-600">Loading</p>}
                    {!loading && error && step === "connection_postgres" && <p className="text-red-600 font-normal">Failed</p>}
                    {step === "source" && <p className="text-green-600 font-normal">Done</p>}
                    <p>Creating connection to Postgres</p>
                </div>
                {error && step === "connection_postgres" && <div className="rounded-sm p-2 bg-red-50 border border-red-300 flex flex-row space-x-2 mt-2 text-sm">
                    <p className="text-gray-500">Error </p>
                    <p className="text-gray-600">{error}</p>
                </div>}
            </div>
            <div className="pt-5">
                <div className={`flex flex-row space-x-5 ${(error || step !== "source") ? "opacity-50" : "" }`}>
                    {step !== "source" && <p className="text-gray-600">Next</p>}
                    {loading && step === "source" && <p className="text-gray-600">Loading</p>}
                    {!loading && error && step === "source" && <p className="text-red-600 font-normal">Failed</p>}
                    {!loading && !error && step === "source" && <p className="text-green-600 font-normal">Done</p>}
                    <p>Creating Postgres source</p>
                </div>
                {error && step === "source" && <div className="rounded-sm p-2 bg-red-50 border border-red-300 flex flex-row space-x-2 mt-2 text-sm">
                    <p className="text-gray-500">Error </p>
                    <p className="text-gray-600">{error}</p>
                </div>}
            </div>
        </div>
    )
}