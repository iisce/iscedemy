import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
	const { filename, contentType } = await request.json();

	try {
		const client = new S3Client({ region: process.env.AWS_REGION });
		const { url, fields } = await createPresignedPost(client, {
			Bucket: process.env.AWS_BUCKET_NAME ?? '',
			Key: uuidv4(),
			Conditions: [
				["content-length-range", 0, 10485760], 
				["starts-with", "$Content-Type", contentType],
			],
			Fields: {
				acl: "public-read",
				"Content-Type": contentType,
			},
			Expires: 600, 
		});

		const imageUrl = `${url}${fields.key}`;
		console.log({ imageUrl, fields, url });
		return Response.json({ url, fields, imageUrl });
	} catch (error) {
		return new Response(JSON.stringify({ error:"unknown error occured"}), {
			status: 500,
			headers: {"Content-Type" : "application/json"},
		})
	}
}