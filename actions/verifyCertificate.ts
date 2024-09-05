"use server"

import { db } from "@/lib/db";

export const getCertificate = async (certificateID: string) => {
    try{
        console.log('Certificate ID', certificateID);

        const certificate = await db.certificate.findUnique({
            where:{
                id: certificateID,
            },
            include: {
                User: true,
            },
        });

        if (certificate) {
            return {
                success: 'Certificate found successfully',
                certificate,
            };
        } else {
            return {error: 'certificate not found'};
        }
    } catch (error) {
        console.error('Error fetching cretificate:', error);
        return { error: 'An error occured while fetching the certificate'};
    }
};