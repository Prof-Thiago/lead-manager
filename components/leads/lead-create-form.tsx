import * as yup from "yup";
import { useFormik } from "formik";
import { useUser } from "@/providers/userProvider";
import { useLead } from "@/providers/leadProvider";
import { useEffect, useState } from "react";
import { Opportunity, Lead, LeadStatus } from "@/utils/interfaces";
import { opportunitiesBase } from "@/utils/constants";
import { v4 as uuid } from "uuid";
import { saveInLocalStorage } from "@/utils/localStorage";

export default function LeadForm(props: any) {
    const { setUser, user, userLeads, setUserLeads } = useUser();
    const { lead, setLead } = useLead();
    const { setModal } = props;

    const [ checkAll, setCheckAll ] = useState<boolean>( true );
    const [ opportunities, setOpportunities ] = useState<Opportunity[]>(opportunitiesBase);

    const NameValidation = /^[a-z][a-z\s]*$/i;
    
    const PhoneValidation = /^[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{5}[-\s\.]?[0-9]{4}/;

    const schema = yup.object().shape({
        name: yup.string().required("Campo obrigatório").min(6, "Mínimo de 6 dígitos").matches(NameValidation),
        email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
        phone: yup
            .string()
            .required("Required field")
            .matches(PhoneValidation, "(xx)xxxxx-xxxx"),
        opportunities: yup.array()
    }); 

    useEffect( () => {
        if (lead && !!lead.id && !!lead.opportunities) {
            if (!lead.opportunities.every(o => o.status)) {
                setCheckAll(false);
            }
            setOpportunities(lead.opportunities);
        }
      }, [])

    const formik = useFormik({
        initialValues: lead || {
            name: "",
            email: "",
            phone: "",
        },
        validationSchema: schema,
        onSubmit: async ({ name, email, phone }) => {
            if (!!lead.id) {
                const emptyLead = {
                    id: "",
                    status: "potential-client" as LeadStatus,
                    name: "",
                    email: "",
                    phone: "",
                    opportunities: opportunitiesBase
                }

                setLead(emptyLead)
                saveInLocalStorage("@LeadManager:Lead", emptyLead)
            } else {
                const leads = userLeads;
                const status = "potential-client";
                const leadId = uuid();
                const newLead: Lead = { id: leadId, status, name, email, phone, opportunities };

                leads.push(newLead);

                const updatedUser = { ...user, leads }

                setUser(updatedUser);
                saveInLocalStorage("@LeadManager:User", updatedUser);
            }

            setModal();
        },
    });

    const handleOpportunityChange = (e: any) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.checked;

        if (fieldName === "all") {
            let updatedOpportunities = opportunities.map((o) => {
                const updatedOpportunity = { name: o.name, status: fieldValue }

                return updatedOpportunity;
            })

            setOpportunities(updatedOpportunities);
            setCheckAll(fieldValue);

        } else {
            let updatedOpportunities = opportunities.map((o) => {
                if (o.name === fieldName) {
                    const updatedOpportunity = { name: o.name, status: fieldValue }

                    return updatedOpportunity;
                }

                return o;
            })

            const allMarked = updatedOpportunities.every(o => o.status)

            setCheckAll(allMarked);
            setOpportunities(updatedOpportunities);
        }

    }

    const handleCancel =() => {
        if (lead.id) {
            const emptyLead = {
                id: "",
                status: "potential-client" as LeadStatus,
                name: "",
                email: "",
                phone: "",
                opportunities: opportunitiesBase
            }

            setLead(emptyLead)
            saveInLocalStorage("@LeadManager:Lead", emptyLead) 
        }

        setModal();
    }
    
    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return   (
    <div className="flex min-h-full flex-col justify-around px-6 py-12 lg:px-8 bg-white rounded-md">
        <h2 className="text-3xl text-center font-bold tracking-tight text-black sm:text-4xl mb-5">
            { lead ? "Detalhes do Lead" : "Criar Lead" }
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 mb-5" method="POST">
            <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Nome completo*:</label>
                <div className="mt-2">
                    <input 
                        id="name" 
                        name="name" 
                        type="text" 
                        value={values.name}
                        disabled={!!lead.id}
                        onChange={handleChange}
                        required 
                        className={`${!!lead.id ? "bg-gray-400" : ""} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
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
                        disabled={!!lead.id}
                        onChange={handleChange}
                        required 
                        className={`${!!lead.id ? "bg-gray-400" : ""} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`} 
                        />
                    {errors.email && touched.email && <span className="text-sm font-small text-red-300">{errors.email}</span>}
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Telefone*:</label>
                </div>
                <div className="mt-2">
                    <input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        placeholder="(xx)xxxxx-xxxx"
                        value={values.phone}
                        disabled={!!lead.id}
                        onChange={handleChange} 
                        required 
                        className={`${!!lead.id ? "bg-gray-400" : ""} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                        />
                    {errors.phone && touched.phone && <span className="text-sm font-small text-red-300">{errors.phone}</span>}
                </div>
            </div>

            <div className="mt-10 space-y-10">
                <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">Oportunidades</legend>
                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input 
                                    id="all" 
                                    name="all" 
                                    type="checkbox" 
                                    checked={checkAll}
                                    disabled={!!lead.id}
                                    onChange={handleOpportunityChange}
                                    className={`${!!lead.id ? "bg-gray-400 text-gray-400" : "text-indigo-600"} h-4 w-4 rounded border-gray-300 focus:ring-indigo-600`} 
                                    />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">Todos</label>
                            </div>
                        </div>

                        {opportunities && 
                        opportunities.map((opportunity, index) => (
                            <div className="relative flex gap-x-3" key={index}>
                                <div className="flex h-6 items-center">
                                    <input 
                                        name={opportunity.name}
                                        onChange={handleOpportunityChange}
                                        checked={opportunity.status} 
                                        disabled={!!lead.id} 
                                        type="checkbox" 
                                        className={`${!!lead.id ? "bg-gray-400 text-gray-400" : "text-indigo-600"} h-4 w-4 rounded border-gray-300 focus:ring-indigo-600`} />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor={opportunity.name} className="font-medium text-gray-900">{opportunity.name}</label>
                                </div>
                            </div>
                        ))}
                    </div>
                </fieldset>
            </div>

            <div className="flex justify-around">
                { !lead.id &&
                    <button 
                        type="submit" 
                        className="flex sm:w-1/3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Confirmar
                    </button>
                }
                <button 
                    type="button" 
                    onClick={handleCancel}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                        Cancelar
                </button>
            </div>
        </form>
    </div>
    )
}