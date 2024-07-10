import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session]);

  if (session) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Home</h1>
        <button onClick={() => signIn()} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Sign in</button>
      </div>
    </div>
  );
};

export default Home;
