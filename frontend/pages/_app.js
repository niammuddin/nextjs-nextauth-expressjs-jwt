// import '../app/globals.css';
// import { SessionProvider } from 'next-auth/react';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Loading from '../components/Loading';

// function MyApp({ Component, pageProps }) {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const handleStart = (url) => (url !== router.asPath) && setLoading(true);
//     const handleComplete = (url) => (url === router.asPath) && setLoading(false);

//     router.events.on('routeChangeStart', handleStart);
//     router.events.on('routeChangeComplete', handleComplete);
//     router.events.on('routeChangeError', handleComplete);

//     return () => {
//       router.events.off('routeChangeStart', handleStart);
//       router.events.off('routeChangeComplete', handleComplete);
//       router.events.off('routeChangeError', handleComplete);
//     };
//   }, [router]);

//   return (
//     <SessionProvider session={pageProps.session}>
//       {loading ? <Loading /> : <Component {...pageProps} />}
//     </SessionProvider>
//   );
// }

// export default MyApp;


import '../app/globals.css';
import { SessionProvider } from 'next-auth/react';
function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
export default MyApp;




