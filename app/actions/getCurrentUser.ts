import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

// Get the session from the server
export async function getSession() {
    return await getServerSession(authOptions);
}

// Get the current user from the session
export default async function getCurrentUser(){
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        // Get the current user
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        });

        //If the user doesn't exist
        if(!currentUser) {
            return null;
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerifiedAt: currentUser.emailVerified?.toISOString() ?? null
        };
    } catch (error:any) {
        return null;
    }
}