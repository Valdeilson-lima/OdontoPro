import { getReminders } from "../../_date_acces/get-remiders";
import { ReminderList } from "./reminder-list";
export async function Reminders({ userId }: { userId: string }) {
  const reminders = await getReminders({ userId });

  return (
    <ReminderList reminders={reminders} />
  );
}
