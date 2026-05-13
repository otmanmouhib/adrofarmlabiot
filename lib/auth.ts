import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const fallbackAdminEmail = "admin";
const fallbackAdminPasswordHash = "$2a$10$bft2aVnAzPJT/YZK5B1ml.TzUKfLSyELCGg45gK6dRS7eQHOItA.a"; // password: admin
const authDebug = process.env.NODE_ENV !== "production";

const adminEmail = (process.env.ADMIN_EMAIL || fallbackAdminEmail).trim();
const adminPasswordHashBase64 = process.env.ADMIN_PASSWORD_HASH_BASE64?.trim();
const adminPasswordHashRaw = process.env.ADMIN_PASSWORD_HASH?.trim()
  .replace(/^"(.*)"$/, "$1")
  .replace(/^'(.*)'$/, "$1");
const adminPasswordHash = adminPasswordHashBase64
  ? Buffer.from(adminPasswordHashBase64, "base64").toString("utf8")
  : adminPasswordHashRaw || fallbackAdminPasswordHash;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (authDebug) {
          console.log("[AUTH DEBUG] authorize called", {
            credentials: credentials ? { username: credentials.username, password: credentials.password } : null,
            adminEmail,
            adminPasswordHashSet: Boolean(adminPasswordHash),
          });
        }

        if (!credentials?.username || !credentials?.password) {
          if (authDebug) console.log("[AUTH DEBUG] missing username or password");
          return null;
        }

        if (!adminEmail || !adminPasswordHash) {
          if (authDebug) console.log("[AUTH DEBUG] missing admin environment variables");
          throw new Error("Authentication is not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD_HASH.");
        }

        if (credentials.username !== adminEmail) {
          if (authDebug) console.log("[AUTH DEBUG] username mismatch", { provided: credentials.username, expected: adminEmail });
          return null;
        }

        if (authDebug) {
          console.log("[AUTH DEBUG] hash info", {
            adminPasswordHash: JSON.stringify(adminPasswordHash),
            hashStartsWith: adminPasswordHash.startsWith("$2a$10$"),
            hashLength: adminPasswordHash.length,
            passwordLength: credentials.password.length,
            hashChars: adminPasswordHash.split("").slice(0, 20),
          });
        }

        const isValid = bcrypt.compareSync(credentials.password, adminPasswordHash);
        if (authDebug) console.log("[AUTH DEBUG] password compare result", { isValid });
        if (!isValid) {
          if (authDebug) console.log("[AUTH DEBUG] invalid password");
          return null;
        }

        if (authDebug) console.log("[AUTH DEBUG] authentication successful", { email: adminEmail });

        return {
          id: "admin",
          name: "Admin",
          email: adminEmail,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as any;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "dev-secret",
  debug: process.env.NODE_ENV === "development",
};
