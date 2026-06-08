'use server';

import WhatsappRepository from "../repositories/WhatsappRepository";
import { revalidateTag } from "next/cache";

export const validateWhatsappNumber = async (phone: string) => {
    const exists = await WhatsappRepository.doesWhatsappNumExists(phone);
    if (!exists) {
        throw new Error('invalid_whatsapp_number');
    }
    return true;
}