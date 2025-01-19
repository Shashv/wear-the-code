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
                let findedUser = await UserModel.find({ email: credentials?.email }).lean();
                console.log("Finded User", findedUser);
                if (findedUser.length > 0)
                    // return { ...findedUser[0], id: "", name: "", email: "" }
                    return {
                        id: findedUser[0]["id"],
                        name: findedUser[0]["username"],
                        email: findedUser[0]["email"]
                    }
                else return null
            },
        }),
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        jwt: async (props) => {

            let { token, account } = props;
            if (account) {
                token.accessToken = account.access_token;
            }
            return token
        },
        session: params => params.session,
    },

}
const authorizeOptions = NextAuth(authOptions);
export default authorizeOptions;