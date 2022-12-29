export default function Materialize(props) {
    const { handleInputChange } = props;

    return (
        <div className='flex flex-col gap-3'>
            <div>
                <label htmlFor="host" className="block text-sm font-medium text-gray-700">
                    Materialize Host
                </label>
                <div className="mt-1">
                    <input
                    type="text"
                    name="host"
                    id="host"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder=""
                    onChange={handleInputChange}
                    autoComplete="none"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder=""
                        onChange={handleInputChange}
                        autoComplete="none"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <div className="mt-1">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder=""
                        onChange={handleInputChange}
                        autoComplete="none"
                    />
                </div>
            </div>
        </div>
    );
}