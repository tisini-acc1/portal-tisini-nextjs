"use server";

import { nanoid } from "nanoid";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { uploadPhotoUrl } from "./php-actions";

export async function uploadImage(formData: FormData) {
  try {
    const playerId = formData.get("userId") as string;

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

    // const textResponse = await response.text();
    const location = response.headers.get("location") as string;

    // console.log(textResponse);
    // console.log(location);

    if (response.ok) {
      return { error: "0", url: location };
    } else {
      return { error: "1", message: "File upload failed" };
    }
  } catch (error) {
    console.error(error);
    return {
      error: "1",
      message: "An error occurred during the upload process",
    };
  }
}

// export async function uploadImage(formData: FormData) {
//   try {
//     const playerId = formData.get("userId") as string;

//     const client = new S3Client({
//       region: process.env.AWS_REGION,
//     });

//     const { url, fields } = await createPresignedPost(client, {
//       Bucket: process.env.AWS_BUCKET_NAME || "",
//       Key: nanoid(),
//     });

//     const formDataS3 = new FormData();

//     Object.entries(fields).forEach(([key, value]) => {
//       formDataS3.append(key, value);
//     });

//     formDataS3.append("file", formData.get("file") as string);

//     const response = await fetch(url, {
//       method: "POST",
//       body: formDataS3,
//     });

//     const textResponse = await response.text();
//     const location = response.headers.get("location") as string;

//     console.log(textResponse);
//     console.log(location);

//     if (response.ok) {
//       const res = await uploadPhotoUrl(location, playerId);
//       console.log("file Uploaded", res);
//       return res;
//     } else {
//       console.log("Some error occurred during file upload!");
//       return { error: "1", message: "File upload failed" };
//     }
//   } catch (error) {
//     console.error(error);
//     return {
//       error: "1",
//       message: "An error occurred during the upload process",
//     };
//   }
// }
