"use client";

import Image from "next/image";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { uploadImage } from "@/actions/upload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ImageUploadForm = ({ playerId }: { playerId: string }) => {
  const [isUploading, setIsUploading] = useState(false);

  const { toast } = useToast();

  const handleSubit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("userId", playerId);

    try {
      setIsUploading(true);

      const res = await uploadImage(formData);

      if (res.error === "0") {
        toast({ title: "Success", description: res.message });
      } else {
        toast({
          title: "Upload Failed!",
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Upload Failed!",
        description: "An error occurred during the upload process",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="space-y-8">
      <div className="overflow-hidden rounded-md w-full">
        <Image
          src={
            "https://tisini-bucket.s3.eu-north-1.amazonaws.com/A6kEtImcug7tzXRjnWXnG"
          }
          alt={"name"}
          width={250}
          height={250}
          className={"h-full w-full object-cover transition-all aspect-square"}
        />
      </div>

      {/* <div className="h-96 bg-gray-300 rounded-sm flex items-center justify-center mx-auto text-gray-600">
        No Image
      </div> */}

      <form
        onSubmit={handleSubit}
        className="flex w-full items-center space-x-2"
      >
        <Input type="hidden" name="userId" value={playerId} />
        <Input id="picture" type="file" name="file" />
        <Button type="submit" disabled={isUploading}>
          Upload
        </Button>
      </form>
    </section>
  );
};

export default ImageUploadForm;
