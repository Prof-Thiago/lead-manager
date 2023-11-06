import { useUser } from "@/providers/userProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";



export default function MainHeader(props: any) {
    const { user, handleLogout } = useUser();
    const route = useRouter();

    const logout = () => {
        handleLogout();
        route.push('/')
    }

    return (
        <header className="bg-white w-full h-24 absolute">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">

                <div className="flex lg:flex-1">
                    <h1 className="text-3xl text-center font-bold tracking-tight text-black">Lead Manager</h1>
                </div>
                
                <div className="lg:flex lg:flex-1 lg:justify-end">
                    <p className="text-sm font-semibold leading-6 text-gray-900" onClick={logout}>
                        {!!user.id ? 'Log out' : 'Sign up'}
                    </p>
                </div>

            </nav>
        </header>
    )
}