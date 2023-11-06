import { useUser } from "@/providers/userProvider";
import LeadItem from "./lead-item";
import { useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function LeadList(props: any) {
    const { setModal, listStatus, children } = props;
    const { userLeads, getUserLeads } = useUser();

    useEffect(() => {
        getUserLeads();
    }, [])

    return (
        <div className="border-solid border-gray-200 border-2 w-1/3 m-0 p-0">
            <div className="text-center flex flex-col justify-center bg-black text-center h-20">
                <h3 className="text-white text-base">
                    { children }
                </h3>                
            </div>

 

            <Droppable 
                droppableId={listStatus} 
                key={listStatus}
                direction="vertical">
                {(provided) =>
                    <ul 
                        role="list" 
                        className="max-h-md divide-gray-100 divide-y-2"
                        {...provided.droppableProps} 
                        ref={provided.innerRef}
                        >
                    {userLeads && userLeads.map((lead, index) =>  (
                        <li key={index}>
                                <Draggable 
                                    key={lead.id + listStatus} 
                                    draggableId={lead.id + listStatus} 
                                    index={index}
                                    >
                                    {(prov) => {
                                        return (
                                            <div 
                                                ref={prov.innerRef} 
                                                {...prov.draggableProps} 
                                                {...prov.dragHandleProps}
                                                className="p-2" 
                                                >

                                                <LeadItem 
                                                    lead={lead} 
                                                    setModal={setModal}
                                                    showStatus={listStatus}
                                                    />
                                                                                            
                                            </div>                                        
                                    )}}
                                </Draggable>
                            </li>
                            )                                
                        )}
                        {provided.placeholder}
                    </ul>  
                }
            </Droppable>                                              
        </div>
    )
}