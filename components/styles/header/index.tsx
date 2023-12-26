import { useLead } from "@/providers/leadProvider";
import { useUser } from "@/providers/userProvider";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { opportunitiesBase } from "@/utils/constants";



export default function MainHeader(props: any) {
    const { user, setUser } = useUser();
    const { lead, setLead } = useLead();
    const route = useRouter();

    const [winReady, setwinReady] = useState(false);

    const logout = () => {
        localStorage.removeItem('@LeadManager:User')
        setUser({
            id: "",
            name: "",
            email: "",
            password: ""
        });
        
        if (!!lead.id) {
            localStorage.removeItem('@LeadManager:Lead')
            setLead({
                id: "",
                userId: "",
                status: "potential-client",
                name: "",
                email: "",
                phone: "",
                opportunities: opportunitiesBase
            });            
        }
        route.push('/');
    }

    useEffect( () => {
        setwinReady(true);
    }, [])

    return (
        <header className="bg-white w-full h-16 absolute">
            <nav className="mx-auto flex items-center justify-between p-2 lg:px-8" aria-label="Global">

                <div className="flex lg:flex-1">
                    <h1 className="text-3xl text-center font-bold tracking-tight text-black">Lead Manager</h1>
                </div>
                
                <div className="lg:flex lg:flex-1 lg:justify-end">
                    {winReady 
                        ?   !!user.id ?
                                <a href="/" className="text-sm font-semibold leading-6 text-gray-900" onClick={logout}>
                                    Sair
                                </a>
                                : <span>
                                    <a href="/login" className="mr-2 text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-400" onClick={logout}>
                                        Entrar
                                    </a>
                                    |
                                    <a href="/sign-up" className="ml-2 text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-400" onClick={logout}>
                                        Criar Conta
                                    </a>
                                </span>
                        :   <a></a>
                    }

                </div>

            </nav>
        </header>
    )
}