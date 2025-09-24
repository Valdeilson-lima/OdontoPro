import { getAllServices } from "../_date-access/get-all-services";
import { ServicesListt } from "./services-listt";

interface ServicesContentProps {
  userId: string | null;
}

export async function ServicesContent({ userId }: ServicesContentProps) {
  const services = await getAllServices({ userId: userId });

  return (
    <div>
      <ServicesListt
        services={services.data || []}
      />
    </div>
  );
}
