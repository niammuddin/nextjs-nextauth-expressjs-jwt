import Link from 'next/link';
import { signOut } from 'next-auth/react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/dashboard" className="text-white">Dashboard
          </Link>
        </li>
        <li>
          <Link href="/dashboard/profile" className="text-white">Profile
          </Link>
        </li>
        <li>
          <Link href="/dashboard/settings" className="text-white">Settings
          </Link>
        </li>
        <li>
          <Link href="/admin" className="text-white">Admin
          </Link>
        </li>
        <li>
          <Link href="/admin/user" className="text-white">User
          </Link>
        </li>
        <li>
          <button onClick={() => signOut({ callbackUrl: '/auth/signin' })} className="text-white">
            Logout
          </button>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
