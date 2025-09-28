import { redirect } from "next/navigation";
import { getInfoClinic } from "./_date-access/get-info-clinic";
import { ClinicContent } from "./_components/clinic-content";

export default async function SchedulePage({ params }: { params: Promise<{ id: string }> }) {
    const userId = (await params).id;
    const user = await getInfoClinic({ userId });

    if(!user) {
        redirect("/");
    }

    

    return (
        <ClinicContent
            user={user}
         />
    );
}