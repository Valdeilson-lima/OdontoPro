"use server";

import { prisma } from "@/lib/prisma";



export async function getAllServices({userId}: {userId: string | null}) {
  

    if (!userId) {
        return {
            error: "Falha ao carregar os serviços.",
        };
    }

    try {
        const services = await prisma.service.findMany({
            where: {
                userId: userId,
                status: true
            }
        });

        return {
            data: services
        }
        
    } catch (error) {
        return {
            error: "Falha ao carregar os serviços.",
        };
    }
}
        