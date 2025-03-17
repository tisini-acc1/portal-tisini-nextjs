"use client";

import { useState } from "react";
import Image from "next/image";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { uploadImage } from "@/actions/upload";
import { useStore } from "@/lib/store";
import { useMutation } from "@tanstack/react-query";
import { uploadPhotoUrl } from "@/actions/php-actions";

const ProfileImage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { toast } = useToast();
  const { store } = useStore((state) => state);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const mutation = useMutation({
    mutationFn: uploadPhotoUrl,
    onSuccess: (data) => {
      console.log(data);
      if (data.error === "0") {
        // setOpen(false);
        // setIsUploading(false);
        setSelectedFile(null);
        // queryClient.invalidateQueries({ queryKey: ["userCertifications"] });
        toast({ title: "Success", description: data.message });
      } else {
        // setIsUploading(false);
        toast({
          title: "Error!",
          variant: "destructive",
          description: data.message,
        });
      }
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Error!",
        variant: "destructive",
        description: "An error occured while creating player",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file before submitting.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("userId", store.user.id);

    const res = await uploadImage(formData);

    if (res.error === "0") {
      mutation.mutate({ url: res.url!, id: store.user.id });
    } else {
      toast({
        title: "Error!",
        variant: "destructive",
        description: res.message,
      });
    }
  };

  return (
    <section className="p-5 pt-6 grid grid-cols-1 gap-10">
      <div className="h-96 border rounded-md flex items-center justify-center">
        {selectedFile && (
          <Image
            src={URL.createObjectURL(selectedFile)}
            alt="Selected file preview"
            width={350}
            height={350}
            className="object-contain"
          />
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex w-full">
        <Input type="hidden" name="userId" value={""} />

        <Input
          id="picture"
          type="file"
          name="file"
          onChange={handleFileChange}
        />
        <Button type="submit">Upload</Button>
      </form>
    </section>
  );
};

export default ProfileImage;
