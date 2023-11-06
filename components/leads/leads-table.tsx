import { DragDropContext, resetServerContext } from "react-beautiful-dnd";
import LeadList from "./leads-list";
import { useUser } from "@/providers/userProvider";
import { saveInLocalStorage } from "@/utils/localStorage";
import { Lead, LeadStatus } from "@/utils/interfaces";
import { GetServerSideProps } from "next";

export default function LeadTable(props: any) {
    const { setModal } = props;
    const { userLeads, setUserLeads, setUser, user } = useUser();

    const ListStatus = [
        { status: 'potential-client', label: 'Cliente em Potencial'}, 
        { status: 'confirmed-data', label: 'Dados Confirmados'}, 
        { status: 'lead-review', label: 'Análise do Lead'}
    ]

    const handleOnDragEnd = ({ source, destination, draggableId }: any) => {
        const draggableAllowed: { [ key in LeadStatus ]: string } = {
            "potential-client": "confirmed-data",
            "confirmed-data": "lead-review",
            "lead-review": ""
        }

        if (!destination) return;

        const sourceId: LeadStatus = source.droppableId
        const destinationId: LeadStatus = destination.droppableId

        if(destinationId === draggableAllowed[sourceId]) {
            const updatedLeads: Lead[] = userLeads.map(lead => {
                if ( lead.id + sourceId === draggableId ) {
                    const status: "potential-client" | "confirmed-data" | "lead-review" = destinationId;
                    return { ...lead, status }
                }

                return lead
            })

            const updatedUser = { ...user, updatedLeads }
            
            setUser(updatedUser);
            saveInLocalStorage('@LeadManager:User', updatedUser);
            setUserLeads(updatedLeads);
        }

        return
    }
    
    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="flex">
                { ListStatus.map(listStatus => (
                    <LeadList listStatus={listStatus.status} key={listStatus.status} setModal={setModal} > { listStatus.label } </LeadList>
                ))}       
            </div>
        </DragDropContext>
    )  
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    resetServerContext()   // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

    return {props: { data : []}}

}