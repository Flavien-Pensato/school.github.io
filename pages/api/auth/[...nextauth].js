import NextAuth from 'next-auth';
import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import Account from '../../../modules/account/account.model';

const isBacon = (password, hash) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (err) {
        reject(err);
      }

      if (res) {
        resolve(true);
      } else {
        reject(new Error('nok'));
      }
    });
  });

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      authorize: async (credentials) => {
        // Add logic here to look up the user from the credentials supplied
        const account = await Account.findOne({ email: credentials.email });

        if (account) {
          try {
            const bacon = await isBacon(credentials.password, account.hash);
            // Any object returned will be saved in `user` property of the JWT

            if (bacon) {
              return Promise.resolve(account);
            }
          } catch (error) {
            return Promise.resolve(null);
          }
        }

        return Promise.resolve(null);
      },
      callbacks: {
        /**
         * @param  {string} url      URL provided as callback URL by the client
         * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
         * @return {string}          URL the client will be redirect to
         */
        redirect: async (url, baseUrl) =>
          url.startsWith(baseUrl)
            ? Promise.resolve(url)
            : Promise.resolve(baseUrl),
      },
    }),
  ],
});
