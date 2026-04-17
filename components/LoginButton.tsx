import Link from 'next/link';
import { User } from 'lucide-react';

export default function LoginButton() {
  return (
    <Link 
      href="/login"
      className="flex text-white hover:text-[#ef9a9a] p-2 transition-colors items-center justify-center cursor-pointer"
      aria-label="Login"
    >
      <User size={24} />
    </Link>
  );
}
