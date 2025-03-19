import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full h-16 border-b border-black/[.1] px-4">
      <div className="h-full max-w-screen-xl mx-auto flex items-center justify-between font-inter">
        <a 
          href="/developer"
          className="text-lg font-bold hover:text-black/70 transition-colors"
        >
          Developer View
        </a>
        <code className="font-[family-name:var(--font-geist-mono)] bg-black text-white px-4 py-1.5 rounded-md text-sm">
          <Link href="/">
            &#47;&#47; changelog
          </Link>
        </code>
        <a 
          href="/user"
          className="text-lg font-bold hover:text-black/70 transition-colors"
        >
          User View
        </a>
      </div>
    </nav>
  );
}
