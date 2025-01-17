"use server";

import { nanoid } from "nanoid";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

export async function uploadImage(formData: FormData) {
  try {
    const client = new S3Client({
      region: process.env.AWS_REGION,
    });

    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME || "",
      Key: nanoid(),
    });

    const formDataS3 = new FormData();

    Object.entries(fields).forEach(([key, value]) => {
      formDataS3.append(key, value);
    });

    formDataS3.append("file", formData.get("file") as string);

    const response = await fetch(url, {
      method: "POST",
      body: formDataS3,
    });

    const textResponse = await response.text();
    const location = response.headers.get("location");

    console.log(textResponse);
    console.log(location);

    if (response.ok) {
      console.log("file Uploaded");
      //   return location;
    } else {
      console.log("Some error occured during file upload!");
    }
  } catch (error) {
    console.log(error);
  }
}
