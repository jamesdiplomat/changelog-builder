'use client'
export default function Page() {
    return (
        <div className="flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
            <div className="mt-24 flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-16">Developer View</h1>
                <form className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Enter GitHub repo URL"
                            className="px-4 py-2 border border-gray-300 rounded-md w-80"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors relative group"
                            aria-label="Summarize changes"
                        >
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Summarize changes to the main branch over the last seven days
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>    
    );
}
