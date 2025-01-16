import Image from "next/image";

import { Input } from "@/components/ui/input";
import { uploadImage } from "@/actions/upload";
import { Button } from "@/components/ui/button";

const ImageUploadForm = () => {
  return (
    <section className="space-y-8">
      <div className="overflow-hidden rounded-md w-full">
        <Image
          src={"/footballer.jpg"}
          alt={"name"}
          width={250}
          height={250}
          className={"h-full w-full object-cover transition-all aspect-square"}
        />
      </div>

      {/* <div className="h-96 bg-gray-300 rounded-sm flex items-center justify-center mx-auto text-gray-600">
        No Image
      </div> */}

      <form action={uploadImage} className="flex w-full items-center space-x-2">
        <Input id="picture" type="file" name="file" />
        <Button type="submit">Upload</Button>
      </form>
    </section>
  );
};

export default ImageUploadForm;
