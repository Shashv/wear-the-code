import NextAuth from "next-auth";
import { DefaultUser } from "next-auth/core/types";
declare module "next-auth" {
    interface User extends DefaultUser {
        id: string ; // Or whatever type the user ID is
    }

    interface Session {
        user: User;
    }
}