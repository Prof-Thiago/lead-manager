import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useUser } from "@/providers/userProvider";
import { v4 as uuid } from "uuid";
import { useState } from "react";

export default function SignUpForm() {
    const route = useRouter();
    const { createUser } = useUser();
    const [ signUpError, setSignUpError ] = useState<boolean>(false);

    const PasswordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
    const NameValidation = /^[a-z][a-z\s]*$/i;

    const schema = yup.object().shape({
        name: yup.string().required("Campo obrigatório").min(6, "Mínimo de 6 dígitos").matches(NameValidation),
        email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
        password: yup
          .string()
          .min(8, "Mínimo de 8 dígitos")
          .required("Campo obrigatório")
          .matches(PasswordStrength, "Letras maiúsculas, minúsculas, números e símbolos."),
        confirmPassword: yup
          .string()
          .required("Campo obrigatório")
          .oneOf([yup.ref("password")], "Ambas as senhas devem ser iguais."),
    }); 

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: schema,
        onSubmit: async ({ name, email, password }) => {
            const userId = uuid()
            const user = { id: userId, name, email, password, leads: [] };

            const result = createUser(user);
            if (result === 'Success') {
                route.push('/leads');
            } else {
                setSignUpError(true);
            }          
        },
    });
    
    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return   (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6" method="POST">
            <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Nome completo*:</label>
                <div className="mt-2">
                    <input 
                        id="name" 
                        name="name" 
                        type="text" 
                        value={values.name}
                        onChange={handleChange}
                        required 
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                        />
                    {errors.name && touched.name && <span className="text-sm font-small text-red-300">{errors.name}</span>}
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">E-mail*:</label>
                <div className="mt-2">
                    <input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={values.email}
                        onChange={handleChange}
                        required 
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                        />
                    {errors.email && touched.email && <span className="text-sm font-small text-red-300">{errors.email}</span>}
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Senha*:</label>
                </div>
                <div className="mt-2">
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        value={values.password}
                        onChange={handleChange} 
                        required 
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                        />
                    {errors.password && touched.password && <span className="text-sm font-small text-red-300">{errors.password}</span>}
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirmar Senha*:</label>
                </div>
                <div className="mt-2">
                    <input 
                        id="confirmPassword" 
                        name="confirmPassword"  
                        value={values.confirmPassword}
                        onChange={handleChange}
                        type="password" 
                        required 
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                        />
                    {errors.confirmPassword && touched.confirmPassword && <span className="text-sm font-small text-red-300">{errors.confirmPassword}</span>}
                </div>
            </div>

            <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
            </div>

            {signUpError && <span className="text-sm font-small text-red-300">Este usuário já existe!</span>}
        </form>
    </div>
    )
}