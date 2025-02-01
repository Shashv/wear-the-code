import UserModel from "@/modalsmongoose/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const authOptions: NextAuthOptions = {
    secret: "shhh",
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { type: "text", placeholder: "Enter Username" },
                email: { type: "email", placeholder: "Enter Email" },
                checkStatus: { type: "checkbox", placeholder: "Remember Choice" }
            },
            async authorize(credentials, req) {
                // console.log("Environment variable", process.env.NEXTAUTH_SECRET)
                let findedUser = await UserModel.findOne({ email: credentials?.email });
                if (findedUser)
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