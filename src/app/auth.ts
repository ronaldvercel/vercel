import { connectToDatabase } from "@/lib/mongoose";
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import User from "./(models)/user";
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async signIn({ user }) {
            const email = user?.email;
            if (!email) return false;
            await connectToDatabase();
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                return false;
            }
            return true;
        },
        authorized: async ({ auth }) => {
            return !!auth;
        },
    },
});
