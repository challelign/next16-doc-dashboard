import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
 
export default function NotFound() {
  return (
    <main className="flex flex-col justify-center items-center gap-2 h-full">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="font-semibold text-xl">404 Not Found</h2>
      <p>Could not find the requested invoice.</p>
      <Link
        href="/dashboard/invoices"
        className="bg-blue-500 hover:bg-blue-400 mt-4 px-4 py-2 rounded-md text-white text-sm transition-colors"
      >
        Go Back
      </Link>
    </main>
  );
}