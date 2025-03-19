'use client'
import { useChangelogContext, ChangelogContextObj } from "@/context/changelog";

export default function Page() {
    const changeLogContextObj = useChangelogContext() as ChangelogContextObj;
    const reversedChangelog = [...changeLogContextObj.changelog].reverse();

    return (
        <div className="flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
            <div className="mt-24 flex flex-col items-center gap-4 w-full max-w-4xl px-4">
                <h1 className="text-4xl font-bold mb-4">Application Changelog</h1>
                
                {reversedChangelog.map((section, index) => (
                    <div key={index} className="w-full border rounded-lg p-6 mb-6 bg-white shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                        <ul className="space-y-3">
                            {section.entries.map((entry, entryIndex) => (
                                <li key={entryIndex} className="text-gray-700">
                                    • {entry}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {reversedChangelog.length === 0 && (
                    <p className="text-gray-500 mt-4 text-lg">No changelog entries yet.</p>
                )}
            </div>
        </div>    
    );
}
