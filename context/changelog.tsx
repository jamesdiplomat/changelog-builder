'use client'
import { createContext, useContext, useState } from "react";

const ChangelogContext = createContext<ChangelogContextObj | null>(null)

interface ChangelogSection {
    title: string;
    entries: string[];
}

export interface ChangelogContextObj {
    changelog: ChangelogSection[];
    setChangelog: React.Dispatch<React.SetStateAction<ChangelogSection[]>>;
}

export const ChangelogContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [changelog, setChangelog] = useState<ChangelogSection[]>([]);

    const changeLogContextObj: ChangelogContextObj = {
        changelog: changelog,
        setChangelog: setChangelog,
    }

    return (
        <ChangelogContext.Provider value={changeLogContextObj}>
            {children}
        </ChangelogContext.Provider>
    )
}

export const useChangelogContext = () => {
    return useContext(ChangelogContext);
}