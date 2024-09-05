import { db } from '@/lib/db'

export default async function getCertificate(certficateID: string) {
    try {
        console.log('Student Id :', certficateID)
        const graduation = await db.certificate.findUnique({
            where: {
                id: certficateID,
            },
            include: {
                User: true,
                Course: true,
            }
        });
        return  graduation
    } catch(error){
        console.log({error})
        return null
    }
}
