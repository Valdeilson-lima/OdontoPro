"use server";

import { Session } from "next-auth";
import { addDays, isAfter } from "date-fns";
import { ResultPermissionProps } from "./canPermission";
import { TRIAL_DAYS } from "./trial-dias";

export async function checkSubscriptionExpired(session: Session): Promise<ResultPermissionProps> {
    const userCreatedAt = session?.user?.createdAt;

    if (!userCreatedAt) {
        // If we don't have a creation date, deny by default
        return {
            hasPermission: false,
            planId: "EXPIRED",
            expired: true,
            plan: null,
        };
    }

    const trialEndDate = addDays(new Date(userCreatedAt), TRIAL_DAYS);

    if (isAfter(new Date(), trialEndDate)) {
        return {
            hasPermission: false,
            planId: "EXPIRED",
            expired: true,
            plan: null
        }
    }

    return {
        hasPermission: true,
        planId: "TRIAL",
        expired: false,
        plan: null
    }
}