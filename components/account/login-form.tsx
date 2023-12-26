import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useUser } from "@/providers/userProvider";
import { v4 as uuid } from "uuid";
import { saveInLocalStorage } from "@/utils/localStorage";
import { useState } from "react";

export default function SignUpForm() {
    const route = useRouter();
    const { login } = useUser();
    const [ loginError, setLoginError ] = useState<boolean>(false);

    const schema = yup.object().shape({
        email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
        password: yup
          .string()
          .required("Campo obrigatório"),
    }); 

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: async (data) => {
            const result = login(data)
            
            if (result === 'Success') {
                route.push('/leads');                
            } else {
                setLoginError(true);
            }
        },
    });
    
    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return   (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6" method="POST">
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
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign In</button>
            </div>

            {loginError && <span className="text-sm font-small text-red-300">Não foi possível encontrar um usuário que corresponda a informação fornecida!</span>}
        </form>
    </div>
    )
}