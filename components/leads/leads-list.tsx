import { useUser } from "@/providers/userProvider";
import LeadItem from "./lead-item";
import { useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function LeadList(props: any) {
    const { setModal, listStatus, children } = props;
    const { userLeads, getUserLeads, setUserLeads } = useUser();

    useEffect(() => {
        getUserLeads();
    }, [])

    return (
        <div className="border-solid border-gray-200 border-2 w-1/3">
            <div className="text-center flex flex-col justify-center bg-black text-center h-20">
                <h3 className="text-white text-base">
                    { children }
                </h3>                
            </div>

 
            <ul 
                role="list" 
                className="max-h-md"
                >
                    <Droppable 
                        droppableId={listStatus} 
                        key={listStatus}
                        direction="vertical">
                        {(provided) =>
                            <li
                                {...provided.droppableProps} 
                                ref={provided.innerRef}
                                >
                                {userLeads && userLeads.map((lead, index) =>  {
                                    if (lead.id) {
                                        return (
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
                                        )                                
                                    }
                                    return (
                                        <Draggable 
                                            key={index + listStatus} 
                                            draggableId={index + listStatus} 
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
                                    )
                                })}
                            {provided.placeholder}                                
                        </li>
                    }
                </Droppable>                        
            </ul>                      
        </div>
    )
}