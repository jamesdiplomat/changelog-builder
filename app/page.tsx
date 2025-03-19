'use client'
import Link from "next/link";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-[32px] row-start-2 items-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Changelog Builder</h1>
        <p className="text-xl mb-4">See and track additions and changes to the codebase.</p>
        <div className="flex gap-4">
          <Link href="/developer" className="bg-blue-600 text-white text-lg px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Developer View
          </Link>
          <Link href="/user" className="bg-green-600 text-white text-lg px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            User View
          </Link>
        </div>
        <div className="flex gap-4">
          <Link href="https://github.com/jamesdiplomat/changelog-builder" target="_blank" rel="noopener noreferrer" className="bg-black text-white text-lg px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            Link to repo
          </Link>
        </div>
      </div>
    </div>
  );
}
