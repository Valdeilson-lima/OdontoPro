"use server";

import { Subscription } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";
import { getPlans } from "./get-plans";
import { PLANS } from "../plans";
import { checkSubscriptionExpired } from "./checkSubscriptionExpired";
import { ResultPermissionProps } from "./canPermission";

export async function canCreateService(subscription: Subscription | null, session: Session): Promise<ResultPermissionProps> {
    try {
        const servicesCount = await prisma.service.count({
            where: {
                userId: session?.user?.id,
                status: true
            }
        });

        if (subscription && subscription.status === "active") {
            const plan = subscription.plan;
            const planLimits = await getPlans(plan);

            return {
                // Permite criar somente se ainda NÃO atingiu o limite
                hasPermission: servicesCount < planLimits.maxServices,
                planId: subscription.plan,
                expired: false,
                plan: PLANS[subscription.plan]
            }

        }

        const checkTestLimit = await checkSubscriptionExpired(session);

        return checkTestLimit
    } catch (error) {
        return {
            hasPermission: false,
            planId: "EXPIRED",
            expired: true,
            plan: null
        }


    }
}