'use client'
import { createContext, useContext, useState } from "react";

const ChangelogContext = createContext<any>(null)

export interface ChangelogContextObj {
    changelog: string[];
    setChangelog: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ChangelogContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [changelog, setChangelog] = useState<string[]>([]);

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