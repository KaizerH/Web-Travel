import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const adminEmail = process.env.ADMIN_EMAIL!;
        const adminPassword = process.env.ADMIN_PASSWORD!;

        if (credentials.email !== adminEmail) return null;

        const isValid = credentials.password === adminPassword ||
          (await bcrypt.compare(credentials.password, adminPassword).catch(() => false));

        if (!isValid) return null;

        return { id: "1", email: adminEmail, name: "Admin" };
      },
    }),
  ],
  pages: { signIn: "/admin/login" },
  callbacks: {
    async session({ session }) {
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
