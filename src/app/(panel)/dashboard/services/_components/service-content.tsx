
import { getAllServices } from "../_date-access/get-all-services";
import { ServicesListt } from "./services-listt";
import { canPermission} from "@/utils/permissions/canPermission";

interface ServicesContentProps {
  userId: string | null;
}

export async function ServicesContent({ userId }: ServicesContentProps) {
  const services = await getAllServices({ userId: userId });
  const permission = await canPermission({ type: "service" });

  console.log('permission services content', permission);

  return (
    <div>
      <ServicesListt
        services={services.data || []}
        permissions={permission}
      />
    </div>
  );
}
