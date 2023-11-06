import LeadForm from '../../components/leads/lead-create-form';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../providers/userProvider";

import Modal from "react-modal";
import dynamic from "next/dynamic";
import PageWrapper from '@/components/styles/page-wrapper';

const LeadTable = dynamic(import("@/components/leads/leads-table"))

export default function LeadsPage() {
    const { user } = useUser();
    const route = useRouter();

    const [modalIsOpen, setIsOpen] = useState(false);
    const [winReady, setwinReady] = useState(false);

    const setModal = () => {
        setIsOpen(!modalIsOpen);
    };

    useEffect( () => {
        setwinReady(true);
        if (!user.id) {
          route.push('/');
        }
    }, [])

    return (
        <PageWrapper>
            <div className="flex w-full max-w-3xl min-h-full box-border flex-col justify-start items-center px-6 py-12 lg:px-8 bg-white rounded-md">
                <div className="flex justify-between min-w-full mb-4 p-6">
                    <h2 className="text-3xl text-center font-bold tracking-tight text-black sm:text-4xl">
                        Leads Manager
                    </h2>

                    <div className="flex justify-center">
                        <button 
                            type="button" 
                            onClick={setModal}
                            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Criar Lead
                            </button>
                    </div>
                </div>

                <div className="overflow-auto w-full max-w-2xl">
                    { winReady 
                        ? <LeadTable setModal={setModal} />
                        : <div></div>
                    }
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    className="mt-10 sm:mx-auto max-w-sm"
                    ariaHideApp={false}
                    contentLabel="Novo Lead"
                >
                    <LeadForm setModal={setModal}/>
                </Modal>
            </div>            
        </PageWrapper>
    )
}