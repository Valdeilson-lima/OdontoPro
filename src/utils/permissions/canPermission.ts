"use server";

import { auth } from "@/lib/auth";
import { getPlans, PlanDetailInfo } from "./get-plans";
import { prisma } from "@/lib/prisma";
import { canCreateService } from "./canCreateService";



export type PLAN_PROPS = "BASIC" | "PROFESSIONAL" | "TRIAL" | "EXPIRED";
type TypeCheck = "service";

export interface ResultPermissionProps {
    hasPermission: boolean;
    planId: PLAN_PROPS;
    expired: boolean;
    plan: PlanDetailInfo | null;
}

interface CanPermissionProps {
    type: TypeCheck;
}

export async function canPermission({ type }: CanPermissionProps): Promise<ResultPermissionProps> {
    const session = await auth();

    if (!session?.user?.id) {
        return {
            hasPermission: false,
            planId: "EXPIRED",
            expired: true,
            plan: null
        }
    }

    const subscription = await prisma.subscription.findFirst({
        where: {
            userId: session.user.id,

        }
    });

    switch (type) {
        case "service":
            const permisions = await canCreateService(subscription, session);
            return permisions;

        default:
            return {
                hasPermission: false,
                planId: "EXPIRED",
                expired: true,
                plan: null
            }
    }
}