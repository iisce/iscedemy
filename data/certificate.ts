import { db } from '@/lib/db'

export default async function getCertificate(certid: string) {
    try {
        const graduation = await db.certificate.findUnique({
            where: {
                id: certid,
            },
            include: {
                User: true,
                Course: true,
            }
        });
        return graduation
    } catch(error){
        console.log({error})
        return null
    }
}
