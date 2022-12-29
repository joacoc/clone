import { useEffect, useState } from "react";

export default function Test(props) {
    const { config, onHandleDone, onHandleError } = props;
    const [step, setStep] = useState("connection");
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/test`, {
            body: JSON.stringify({
                step,
                config: {
                    ...config,
                    database: "postgres",
                    port: "5432"
                }
            }),
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((r) => {
            if (r.status === 200) {
                if (step === "connection") {
                    setStep("wal_level");
                } else if (step === "wal_level" && onHandleDone) {
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
    }, [config, step, onHandleDone, onHandleError]);

    return (
        <div className="font-light space-y-10 mt-4 divide-y divide-gray-200">
            <div>
                <div className={`flex flex-row space-x-5 ${(error || step !== "connection") ? "opacity-50" : "" }`}>
                    {loading && step === "connection" && <p className="text-gray-600">Loading</p>}
                    {!loading && step === "connection" && <p className="text-red-600 font-normal">Failed</p>}
                    {step === "wal_level" && <p className="text-green-600 font-normal">Done</p>}
                    <p>Connection test</p>
                </div>
                {error && step === "connection" && <div className="rounded-sm p-2 bg-red-50 border border-red-300 flex flex-row space-x-2 mt-2 text-sm">
                    <p className="text-gray-500">Error </p>
                    <p className="text-gray-600">{error}</p>
                </div>}
            </div>
            <div className="py-10">
                <div className={`flex flex-row space-x-5 ${(error || step !== "wal_level") ? "opacity-50" : "" }`}>
                    {step === "connection" && <p className="text-gray-600">Next</p>}
                    {loading && step === "wal_level" && <p className="text-gray-600">Loading</p>}
                    {!loading && error && step === "wal_level" && <p className="text-red-600 font-normal">Failed</p>}
                    {!loading && !error && step === "wal_level" && <p className="text-green-600 font-normal">Done</p>}
                    <p>WAL level verification</p>
                </div>
                {error && step === "wal_level" && <div className="rounded-sm p-2 bg-red-50 border border-red-300 flex flex-row space-x-2 mt-2 text-sm">
                    <p className="text-gray-500">Error </p>
                    <p className="text-gray-600">{error}</p>
                </div>}
            </div>
        </div>
    )
}