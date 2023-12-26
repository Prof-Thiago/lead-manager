import { DragDropContext, resetServerContext } from "react-beautiful-dnd";
import LeadList from "./leads-list";
import { LeadStatus } from "@/utils/interfaces";
import { GetServerSideProps } from "next";
import { useLead } from "@/providers/leadProvider";

export default function LeadTable(props: any) {
    const { setModal } = props;
    const { leads, updateLead } = useLead();

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
            const lead = leads.find(lead => lead.id + sourceId === draggableId)
            if (lead) {
                const status: "potential-client" | "confirmed-data" | "lead-review" = destinationId;
                const updatedLead = { ...lead, status }

                updateLead(updatedLead);                
            }
        }
    }
    
    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="flex justify-between">
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