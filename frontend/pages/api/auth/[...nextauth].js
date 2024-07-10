import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const refreshAccessToken = async (token) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/refresh-token', {
      refreshToken: token.refreshToken,
    });

    const { accessToken } = response.data;
    const decoded = jwtDecode(accessToken);

    console.log('Access token refreshed:', accessToken);

    return {
      ...token,
      accessToken,
      expiresAt: decoded.exp,
    };
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

export default NextAuth({

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        try {
          const res = await axios.post('http://localhost:5000/api/auth/login', {
            email: credentials.email,
            password: credentials.password
          });

          const { accessToken, refreshToken } = res.data;
          const decoded = jwtDecode(accessToken);

          console.log('Access token received:', accessToken);

          if (decoded) {
            return {
              id: decoded.id,
              email: credentials.email,
              role: decoded.role,
              accessToken,
              refreshToken,
              expiresAt: decoded.exp,
            };
          }
          return null;
        } catch (error) {
          console.error('Error in authorize:', error.response ? error.response.data : error.message);
          return null;
        }
      }
    })
  ],
  session: {
    jwt: true,
    maxAge: 2 * 60, // 15 minutes
    updateAge: 1 * 60
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT callback', token);
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: user.expiresAt,
          id: user.id,
          role: user.role,
        };
      }

      if (Date.now() / 1000 < token.expiresAt) {
        return token;
      }

      console.log('Refreshing access token');
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (Date.now() / 1000 > token.expiresAt) {
        return null;
      } else {
        session.accessToken = token.accessToken;
        session.user.id = token.id;
        session.user.role = token.role;
        session.expires = new Date(token.expiresAt * 1000).toISOString();
        session.error = token.error;
        console.log('Session callback', session);
        return session;
      }
    }
  },
  pages: {
    signIn: '/auth/signin'
  },
  secret: 'YOUR_SECRET_KEY'
});
