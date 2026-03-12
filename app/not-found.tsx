import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 text-stone-900 font-serif p-4 text-center">
      <h1 className="text-3xl mb-4">Story not found.</h1>
      <Link href="/" className="text-[10px] font-bold uppercase tracking-widest border-b border-stone-900 pb-1">
        Back to Journal
      </Link>
    </div>
  );
}
