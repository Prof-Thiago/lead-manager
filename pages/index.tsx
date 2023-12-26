import { useUser } from "../providers/userProvider";
import { useEffect } from "react";
import { useRouter } from "next/router";
import PageWrapper from "@/components/styles/page-wrapper";

export default function Home() {
  const { user } = useUser();
  const route = useRouter();

  useEffect( () => {
    if (!!user.id) {
      route.push('/leads');
    }
  }, [])

  const goToLoginPage = () => {
    route.push('/login');
  }

  const goToSignUpPage = () => {
    route.push('/sign-up');
  }

  return (
    <PageWrapper>
      <div className="flex min-h-64 flex-col justify-between px-6 py-12 lg:px-8 bg-white rounded-md">
        <h2 className="text-2xl text-center font-bold tracking-tight text-indigo-500 mb-5">Lead Manager</h2>

        <div>
          <p className="mt-5 text-center text-sm text-gray-500 mb-5">
            Não tem conta?            
          </p>
          
          <button onClick={goToSignUpPage} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
              Criar Conta
          </button>
        </div>

        <div>
          <p className="mt-5 text-center text-sm text-gray-500 mb-5">
            Já tem conta?            
          </p>

          <button onClick={goToLoginPage} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Entrar
          </button>
        </div>
      </div>      
    </PageWrapper>
  )
}