import { useEffect, useState } from "react";

export default function Replicate(props) {
    const { config, tableNames, onHandleDone, onHandleError } = props;
    const [step, setStep] = useState("identity");
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/replicate`, {
            body: JSON.stringify({
                step,
                config: {
                    ...config,
                    database: "postgres",
                    port: "5432"
                },
                tableNames,
            }),
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((r) => {
            if (r.status === 200) {
                if (step === "identity") {
                    setStep("publication");
                } else if (step === "publication" && onHandleDone) {
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
    }, [config, step, onHandleDone, onHandleError, tableNames]);

    return (
        <div className="font-light space-y-10 mt-4 divide-y divide-gray-200">
            <div>
                <div className={`flex flex-row space-x-5 ${(error || step !== "identity") ? "opacity-50" : "" }`}>
                    {loading && step === "identity" && <p className="text-gray-600">Loading</p>}
                    {!loading && step === "identity" && <p className="text-red-600 font-normal">Failed</p>}
                    {step === "publication" && <p className="text-green-600 font-normal">Done</p>}
                    <p>Setting the replica identity for each table</p>
                </div>
                {error && step === "identity" && <div className="rounded-sm p-2 bg-red-50 border border-red-300 flex flex-row space-x-2 mt-2 text-sm">
                    <p className="text-gray-500">Error </p>
                    <p className="text-gray-600">{error}</p>
                </div>}
            </div>
            <div className="py-10">
                <div className={`flex flex-row space-x-5 ${(error || step !== "publication") ? "opacity-50" : "" }`}>
                    {step === "identity" && <p className="text-gray-600">Next</p>}
                    {loading && step === "publication" && <p className="text-gray-600">Loading</p>}
                    {!loading && error && step === "publication" && <p className="text-red-600 font-normal">Failed</p>}
                    {!loading && !error && step === "publication" && <p className="text-green-600 font-normal">Done</p>}
                    <p>Creating the publication</p>
                </div>
                {error && step === "publication" && <div className="rounded-sm p-2 bg-red-50 border border-red-300 flex flex-row space-x-2 mt-2 text-sm">
                    <p className="text-gray-500">Error </p>
                    <p className="text-gray-600">{error}</p>
                </div>}
            </div>
        </div>
    )
}