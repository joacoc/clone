import { useState, useEffect } from "react";

export default function Tables(props) {
    const { config, onChange } = props;
    const [tables, setTables] = useState([]);

    useEffect(() => {
        if (config) {
            fetch(`/api/tables`, {
                body: JSON.stringify({ ...config, database: "postgres", port: "5432" }),
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then((r) => {
                if (r.status === 200) {
                    r.json().then((data) => {
                        if (!data || data.error) {
                            console.error("Error: ", data);
                        } else {
                            setTables(data);
                        }
                    });
                } else {
                    console.error(r);
                }
            });
        }
    }, [config]);

    const handleOnChange = (event) => {
        const { target } = event;
        const { checked, name } = target;

        onChange(name, checked);
    };

    return (
        <div className='z-30'>
            <fieldset>
                <legend className="text-lg font-medium text-gray-900">Tables</legend>
                <div className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
                    {tables.map(({ tableName }, tableIdx) => (
                        <div key={tableIdx} className="relative flex items-start py-4">
                            <div className="min-w-0 flex-1 text-sm">
                            <label htmlFor={`table-${tableName}`} className="select-none font-medium text-gray-700">
                                {tableName}
                            </label>
                            </div>
                            <div className="ml-3 flex h-5 items-center">
                            <input
                                id={`table-${tableName}`}
                                name={`${tableName}`}
                                type="checkbox"
                                className="ml-6 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                onChange={handleOnChange}
                            />
                            </div>
                        </div>
                    ))}
                </div>
            </fieldset>
        </div>
    );
}