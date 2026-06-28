import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Hỗ trợ nhiều admin: ADMIN_ACCOUNTS=email1:pass1,email2:pass2
// Hoặc dùng ADMIN_EMAIL + ADMIN_PASSWORD cho 1 tài khoản
function getAdminAccounts(): { email: string; password: string; name: string }[] {
  // Multi-account từ ADMIN_ACCOUNTS
  if (process.env.ADMIN_ACCOUNTS) {
    return process.env.ADMIN_ACCOUNTS.split(",").map((entry, i) => {
      const [email, ...passParts] = entry.trim().split(":");
      return { email, password: passParts.join(":"), name: `Admin ${i + 1}` };
    });
  }
  // Single account (backwards compatible)
  return [{ email: process.env.ADMIN_EMAIL!, password: process.env.ADMIN_PASSWORD!, name: "Admin" }];
}

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

        const accounts = getAdminAccounts();
        const account = accounts.find(a => a.email === credentials.email);
        if (!account) return null;

        const isValid =
          credentials.password === account.password ||
          (await bcrypt.compare(credentials.password, account.password).catch(() => false));

        if (!isValid) return null;

        return { id: account.email, email: account.email, name: account.name };
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
