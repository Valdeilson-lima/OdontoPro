import { PlanProps } from "../plans";
import { Plan } from "@/generated/prisma/edge";

export interface PlanDetailInfo {
    maxServices: number;
}

export const PLANS_LIMITS: PlanProps = {
  BASIC: {
    maxServices: 3,
  },
  PROFESSIONAL: {
    maxServices: 50,
  },
};



export async function getPlans(planId: Plan) {
    return PLANS_LIMITS[planId];

}

