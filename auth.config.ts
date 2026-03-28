import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/admin/login",
  },
  providers:
    googleClientId && googleClientSecret
      ? [
          Google({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : [],
} satisfies NextAuthConfig;

export default authConfig;
