import { useUser } from "../providers/userProvider";
import SignUpForm from '../components/account/signup-form';
import { useEffect, useState } from "react";
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
      <div className="flex min-h-full flex-col justify-between px-6 py-12 lg:px-8 bg-white rounded-md">
        <h2 className="text-2xl text-center font-bold tracking-tight text-black mb-5">Criar Conta</h2>

        <div className="mb-5">
          <SignUpForm />
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Já tem conta? 
          <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Entre na sua conta.</a>
        </p>
      </div>      
    </PageWrapper>
  )
}
