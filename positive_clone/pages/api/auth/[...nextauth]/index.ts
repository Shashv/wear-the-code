import UserModel from "@/modalsmongoose/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import positive from "bcryptjs";
import mongoose from "mongoose";
// authorize options////
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
                try {
                    await mongoose.connect("mongodb+srv://traineewebframez:0xrgceVRyQWHMzBJ@cluster0.wgwyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
                    let findedUser = await UserModel.findOne({ email: credentials?.email });
                    const babaji = await positive.compare(credentials?.password || "", findedUser?.password || "");
                    if (findedUser && babaji)
                        return {
                            id: findedUser["id"],
                            name: findedUser["username"],
                            email: findedUser["email"],
                            image: findedUser.image
                        }
                    else if (findedUser && !babaji) {
                        throw new Error("Invalid or Incorrect Password");
                    }
                    else if (!findedUser) {
                        throw new Error("unable to find the user");
                        // return {
                        //     id: "not_available",
                        //     name: "babaji",
                        //     email: "email"
                        // }
                    }
                    else return null;
                }
                catch (er: any) {
                    console.log("error occured in the authentication process", er);
                    // return {
                    //     id: "error",
                    //     name: "error",
                    //     email: "emailerror"
                    // }
                    // return null;
                    throw new Error(er.message ? er.message : "Oops something went wrong")
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        // max age testing..//
        maxAge: 60 * 60
    },
    callbacks: {
        jwt: async (props) => {
            let { token, account, user } = props;
            if (account) {
                token.accessToken = account.access_token;
                token.id = user.id;
                token.email = user.email;
            }
            return token
        },
        session: async params => {
            let { session, token } = params;
            session.user.id = token.sub || "";
            return session;
        }
    },
    pages: {
        signIn: "/authentication/login",
        error: "/authentication/login"
    }

}
const authorizeOptions = NextAuth(authOptions);
export default authorizeOptions;
// ... authorize options...//