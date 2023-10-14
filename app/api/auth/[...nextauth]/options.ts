import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret : process.env.GITHUB_SECRET as string,

        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-username-here"
                },
                password: {
                    label: "Password:",
                    type: "password" ,
                    placeholder: "your-password-here"
                }
            },
            async authorize(credentials) {
                //This is where the user data would be retrieved
                //to verify with credentials
                //Docs: https://next-auth.js.org.configuration/providers/credentials
                const user = { id:"42", name: "dummy", password:"nextauth"}

                if (credentials?.username === user.name && credentials?.password === 
                    user.password) {
                        return user
                    } else {
                        return null
                    }
            }
        })
    ],
    
}