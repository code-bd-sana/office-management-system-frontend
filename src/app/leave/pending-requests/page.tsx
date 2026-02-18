import { MainLayout } from "@/components/layout";
import { LeaveRequests } from "../../../components/leave/LeaveRequests";

export default function PendingLeaveRequests(){
    return(
        <MainLayout pageTitle="Pending Requests">
            <LeaveRequests />
        </MainLayout>
    );
}