import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full h-16 border-b border-black/[.1] px-4">
      <div className="h-full max-w-screen-xl mx-auto flex items-center justify-between font-inter">
        <div className="relative group">
          <button
            className="text-lg font-bold hover:text-black/70 transition-colors"
          >
            Developer View
          </button>
          <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="py-1">
              <Link
                href="/developer"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Add to Changelog
              </Link>
              <Link
                href="/review"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Edit/Review Changelog
              </Link>
            </div>
          </div>
        </div>
        <code className="font-[family-name:var(--font-geist-mono)] bg-black text-white px-4 py-1.5 rounded-md text-sm">
          <Link href="/">
            &#47;&#47; changelog
          </Link>
        </code>
        <Link
          href="/user"
          className="text-lg font-bold hover:text-black/70 transition-colors"
        >
          User View
        </Link>
      </div>
    </nav>
  );
}
