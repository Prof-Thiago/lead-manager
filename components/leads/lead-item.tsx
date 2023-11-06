import { useLead } from '@/providers/leadProvider';
import { saveInLocalStorage } from '@/utils/localStorage';

export default function LeadItem(props: any) {

    const { lead, showStatus, setModal } = props;
    const { setLead } = useLead();

    const setUpdateForm = () => {
        saveInLocalStorage('@LeadManager:Lead', lead)
        setLead(lead);
        setModal();
    }

    return (
        <div className="w-48 p-2 overflow-hidden">
            { (lead && lead.id && lead.status === showStatus) ?
                    ( 
                        <div className="h-24 bg-gray-200 p-2 text-center flex flex-col justify-center">
                            <a onClick={setUpdateForm} className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer">
                                { lead.name }
                            </a>
                        </div>
                    )
                : (<div className="h-24"></div>) 
            }
        </div>
    )
}