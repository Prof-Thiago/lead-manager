import { useLead } from '@/providers/leadProvider';
import { saveInLocalStorage } from '@/utils/localStorage';

export default function LeadItem(props: any) {

    const { lead, setModal, listStatus } = props;
    const { setLead } = useLead();

    const getItemColor = ( status: string ) => {
        switch (status) {
            case 'potential-client': return 'bg-green-200';
            case 'confirmed-data': return 'bg-teal-200';
            case 'lead-review': return 'bg-blue-200';
            default: return 'bg-gray-200'
        }
    
    }

    const setUpdateForm = () => {
        saveInLocalStorage('@LeadManager:Lead', lead)
        setLead(lead);
        setModal();
    }

    return (
    <div 
        className={`w-48 p-2 overflow-hidden h-24 p-2 text-center flex flex-col justify-center rounded-2xl ${ getItemColor(listStatus) }`}
        >
        <a onClick={setUpdateForm} className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer">
            { lead.name }
        </a>
    </div>
    )
}