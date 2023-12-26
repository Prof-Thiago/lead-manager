import { useUser } from "@/providers/userProvider";
import LeadItem from "./lead-item";
import { useEffect, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useLead } from "@/providers/leadProvider";
import { Lead } from "@/utils/interfaces";

export default function LeadList(props: any) {
    const { setModal, listStatus, children } = props;
    const { user } = useUser();
    const { leads } = useLead();
    const [ userLeads, setUserLeads ] = useState<Lead[]>([])

    useEffect(() => {
        const filteredLeads = leads.filter(lead => lead.userId === user.id);

        setUserLeads(filteredLeads);
    }, [leads])

    return (
    <Droppable 
        droppableId={listStatus} 
        key={listStatus}
        direction="vertical">
        {(provided) =>
        <div 
            className="w-60 m-1"                         
            {...provided.droppableProps} 
            ref={provided.innerRef}>

            <div className="text-center flex flex-col justify-center bg-black text-center h-20 rounded-t-xl">
                <h3 className="text-white text-base">
                    { children }
                </h3>                
            </div>

 


            <ul 
                role="list" 
                className="border-solid border-gray-200 border-2 rounded-b-xl"
                >
                {userLeads && userLeads.map((lead, index) =>  { 
                    if (lead.status === listStatus ) { return (
                        <Draggable 
                            key={lead.id + listStatus} 
                            draggableId={lead.id + listStatus} 
                            index={index}
                            >
                            {(prov) => {
                                return (
                            <li key={index} 
                                ref={prov.innerRef} 
                                {...prov.draggableProps} 
                                {...prov.dragHandleProps}
                                className="h-36 p-2 text-center flex flex-col justify-center"
                                >
                                <div>
                                    <div>
                                        <LeadItem 
                                            lead={lead} 
                                            setModal={setModal}
                                            listStatus={listStatus}
                                            />                                                     
                                    </div>                                        
                                </div>
                            </li>
                        )}}
                        </Draggable> 
                    )}
                })}
                { provided.placeholder }
                <li className="h-5 bg-gray-100"></li>
            </ul>                                    
        </div>
        }
    </Droppable>  
    )
}