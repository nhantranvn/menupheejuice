import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { prisma } from "@/lib/prisma";

const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      if (adminEmail && user.email.toLowerCase() === adminEmail) {
        await prisma.user.upsert({
          where: { email: user.email.toLowerCase() },
          update: {
            role: "ADMIN",
            name: user.name ?? undefined,
            image: user.image ?? undefined,
          },
          create: {
            email: user.email.toLowerCase(),
            name: user.name ?? "",
            image: user.image,
            role: "ADMIN",
          },
        });
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user?.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email.toLowerCase() },
          select: { id: true, role: true, name: true, email: true, image: true },
        });

        if (existingUser) {
          token.sub = existingUser.id;
          token.role = existingUser.role;
          token.name = existingUser.name;
          token.email = existingUser.email;
          token.picture = existingUser.image;
        }
      }

      if (trigger === "update" && session?.user) {
        token.name = session.user.name;
        token.picture = session.user.image;
      }

      if (!token.sub && token.email) {
        const currentUser = await prisma.user.findUnique({
          where: { email: token.email.toLowerCase() },
          select: { id: true, role: true },
        });

        if (currentUser) {
          token.sub = currentUser.id;
          token.role = currentUser.role;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = (token.role as "ADMIN" | "CUSTOMER" | undefined) ?? "CUSTOMER";
        session.user.email = token.email ?? session.user.email ?? null;
        session.user.name = token.name ?? session.user.name;
        session.user.image = (token.picture as string | null | undefined) ?? session.user.image;
      }

      return session;
    },
  },
});
