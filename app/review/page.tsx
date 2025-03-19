'use client'
import { useState } from "react";
import { useChangelogContext, ChangelogContextObj } from "@/context/changelog";

export default function Page() {
    const changeLogContextObj = useChangelogContext() as ChangelogContextObj;
    const reversedChangelog = [...changeLogContextObj.changelog].reverse();

    const handleDeleteSection = (title: string) => {
        const newChangelog = changeLogContextObj.changelog.filter(
            section => section.title !== title
        );
        changeLogContextObj.setChangelog(newChangelog);
    };

    const handleDeleteEntry = (sectionTitle: string, entryToDelete: string) => {
        const newChangelog = changeLogContextObj.changelog.map(section => {
            if (section.title === sectionTitle) {
                return {
                    ...section,
                    entries: section.entries.filter(entry => entry !== entryToDelete)
                };
            }
            return section;
        }).filter(section => section.entries.length > 0); // Remove sections with no entries
        
        changeLogContextObj.setChangelog(newChangelog);
    };

    return (
        <div className="flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
            <div className="mt-24 flex flex-col items-center gap-4 w-full max-w-4xl px-4">
                <h1 className="text-4xl font-bold mb-4">Developer Changelog Console</h1>
                
                {reversedChangelog.map((section, index) => (
                    <div key={index} className="w-full border rounded-lg p-6 mb-6 bg-white shadow-sm">
                        <div className="group relative">
                            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                            <button
                                onClick={() => handleDeleteSection(section.title)}
                                className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Delete Section
                            </button>
                        </div>
                        <ul className="space-y-3">
                            {section.entries.map((entry, entryIndex) => (
                                <li key={entryIndex} className="text-gray-700 group flex items-center justify-between">
                                    <span>• {entry}</span>
                                    <button
                                        onClick={() => handleDeleteEntry(section.title, entry)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                                    >
                                        Delete
                                    </button>
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
