/**
 * Verifica se a data fornecida é hoje
 * @param date Date
 * @returns boolean
 */
export function isToday(date: Date) {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}



/**
 * Verificar se determibado slot já passouou não
 * @param timeSlot string no formato "HH:MM"
 * @param selectedDate Date
 * @returns boolean
 */
export function isSlotInThePast(slotTime: string) {
    const [slotHours, slotMinutes] = slotTime.split(":").map(Number);
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    if (slotHours < currentHours) {
        return {
            hasPassed: true,
        };
    } else if (slotHours === currentHours && slotMinutes <= currentMinutes) {
        return {
            hasPassed: true,
        };
    } else {
        return {
            hasPassed: false,
        };
    }

   
 
}

/** Verifica se uma sequência de slots está disponível
 * @param startSlot string - Horário inicial
 * @param requiredSlots number - Quantidade de slots necessários
 * @param allSlots string[] - Todos os horários da clínica
 * @param blockedTimes string[] - Horários já bloqueados
 * @returns boolean
 */

export function isSlotSequenceAvailable(
    startSlot: string, // Horário inicial
    requiredSlots: number, // Quantidade de slots necessários
    allSlots: string[], // Todos os horários da clínica
    blockedTimes: string[] // Horários já bloqueados
) {
    const startIndex = allSlots.indexOf(startSlot);

    if (startIndex === -1 || requiredSlots > allSlots.length) {
        return false; // Slot inicial não encontrado na lista de horários da clínica
    }

    for (let i = startIndex; i < startIndex + requiredSlots; i++) {
        const slotTime = allSlots[i];

        if (blockedTimes.includes(slotTime) || !slotTime) {
            return false; // Slot está bloqueado ou não existe
        }
    }

    return true; // Todos os slots necessários estão disponíveis
}