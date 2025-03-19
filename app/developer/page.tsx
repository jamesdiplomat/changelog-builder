'use client'
import { useState } from "react";
import { setEventChange } from "@/utils/all";
import { EntryReview } from "@/components/entries";
import { useChangelogContext, ChangelogContextObj } from "@/context/changelog";

type EditState = "before" | "generating" | "reviewing";

const genNotes = async (repo: string, setEntries: (_: string[]) => void, setEditState: (_: EditState) => void) => {
    setEntries([]);
    setEditState("generating");
    const response = await fetch("/api/openai", {
        method: "GET",
        headers: {
            "repo": repo
        }
    })
    const data = await response.text();
    let entries = data.split("\n");
    entries = entries.filter((entry: string) => entry !== "");
    setEditState("reviewing");
    setEntries(entries);
}

const acceptAllChanges = (
    title: string, 
    entries: string[], 
    setEntries: (_: string[]) => void, 
    changeLogContextObj: ChangelogContextObj, 
    setEditState: (_: EditState) => void, 
    setRepoField: (_: string) => void,
    setTitle: (_: string) => void,
    setShowToast: (_: boolean) => void
) => {
    changeLogContextObj.setChangelog([...changeLogContextObj.changelog, { title: title, entries: entries }]);
    setEntries([]);
    setRepoField("");
    setEditState("before");
    setTitle(`${new Date().toISOString().split('T')[0]} Updates`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
    console.log(changeLogContextObj.changelog);
};

export default function Page() {
    const [editState, setEditState] = useState<EditState>("before");
    const [repoField, setRepoField] = useState<string>("");
    const [showToast, setShowToast] = useState(false);
    const repoFieldChange = setEventChange(setRepoField);
    const [entries, setEntries] = useState<string[]>([]);
    const [title, setTitle] = useState<string>(`${new Date().toISOString().split('T')[0]} Updates`);
    const titleChange = setEventChange(setTitle);
    const changeLogContextObj = useChangelogContext() as ChangelogContextObj;

    const handleReject = (entry: string) => {
        setEntries(entries.filter(e => e !== entry));
    };

    const handleEdit = (oldEntry: string, newEntry: string) => {
        setEntries(entries.map(e => e === oldEntry ? newEntry : e));
    };


    return (
        <div className="flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
            <div className="mt-24 flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-8">Add to Changelog</h1>
                <form className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Enter GitHub repo URL"
                            className="px-4 py-2 border border-gray-300 rounded-md w-80"
                            value={repoField}
                            onChange={repoFieldChange}
                        />
                        <button
                            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors relative group"
                            aria-label="Summarize changes"
                            onClick={(event: any) => {event.preventDefault(); genNotes(repoField, setEntries, setEditState)}}
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
                
                {editState === "generating" && (
                    <div className="mt-16 flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600">Generating changelog entries...</p>
                    </div>
                )}
                
                <div className="mt-16 mb-32 flex flex-col gap-4 w-full max-w-4xl">
                    {entries.length > 0 && (
                        <div>
                            <input
                                type="text"
                                value={title}
                                onChange={titleChange}
                                className="text-2xl w-full font-semibold mb-4 px-2 py-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                            />
                            <h2 className="text-2xl font-semibold mb-4">Review Changes</h2>
                        </div>
                    )}
                    {entries.map((entry, index) => (
                        <EntryReview
                            key={index}
                            entry={entry}
                            onReject={() => handleReject(entry)}
                            onEdit={handleEdit}
                        />
                    ))}
                    {entries.length > 0 && (
                        <button
                            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors w-full"
                            onClick={(event: any) => {
                                event.preventDefault(); 
                                acceptAllChanges(title, entries, setEntries, changeLogContextObj, setEditState, setRepoField, setTitle, setShowToast)
                            }}
                        >
                            Accept All Changes
                        </button>
                    )}
                </div>
            </div>
            {showToast && (
                <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg animate-fade-in-out">
                    Changes committed successfully
                </div>
            )}
        </div>    
    );
}
