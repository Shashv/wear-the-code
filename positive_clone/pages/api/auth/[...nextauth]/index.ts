import UserModel from "@/modalsmongoose/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import positive from "bcryptjs";
import mongoose from "mongoose";

const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { type: "text", placeholder: "Enter Username" },
                email: { type: "email", placeholder: "Enter Email" },
                checkStatus: { type: "checkbox", placeholder: "Remember Choice" },
                password: { type: "password", placeholder: "Enter password" }
            },
            async authorize(credentials, req) {
                await mongoose.connect("mongodb+srv://traineewebframez:0xrgceVRyQWHMzBJ@cluster0.wgwyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
                let findedUser = await UserModel.findOne({ email: credentials?.email });
                const babaji = await positive.compare(credentials?.password || "", findedUser?.password || "");
                if (findedUser && babaji)
                    return {
                        id: findedUser["id"],
                        name: findedUser["username"],
                        email: findedUser["email"]
                    }
                else return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
        //update maxage for token using the normal value or by passing the value in string..
        maxAge: 25
    },
    callbacks: {
        jwt: async (props) => {
            let { token, user } = props;
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token
        },
        session: async params => {
            let { session, token } = params;
            session.user = token;
            return session;
        }
    },
    pages: {
        signIn: "/authentication/login",
    }

}
const authorizeOptions = NextAuth(authOptions);
export default authorizeOptions;