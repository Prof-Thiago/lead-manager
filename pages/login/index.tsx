import { useUser } from "../../providers/userProvider";
import LoginForm from '../../components/account/login-form';
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

  return (
    <PageWrapper>
      <div className="flex min-h-64 flex-col justify-between px-6 py-12 lg:px-8 bg-white rounded-md">
        <h2 className="text-2xl text-center font-bold tracking-tight text-black mb-5">Entrar na Conta</h2>

        <div className="mb-5">
          <LoginForm />
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Não tem uma conta?
          <a href="/sign-up" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Criar nova conta.</a>
        </p>
      </div>      
    </PageWrapper>
  )
}