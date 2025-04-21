"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Input } from "../../ui/input";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/store/store";
import { uploadImage } from "@/actions/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadCertUrl } from "@/actions/php-actions";
import { Label } from "../../ui/label";
import { EditIcon } from "lucide-react";

const UploadCertModal = ({ certs }: { certs: Certification[] }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>("level1");

  const { toast } = useToast();
  const { store } = useStore((state) => state);
  const queryClient = useQueryClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleLevelChange = (value: string) => {
    setSelectedLevel(value);
  };

  const mutation = useMutation({
    mutationFn: uploadCertUrl,
    onSuccess: (data) => {
      console.log(data);
      if (data.error === "0") {
        // setOpen(false);
        // setIsUploading(false);
        setSelectedFile(null);
        queryClient.invalidateQueries({ queryKey: ["userCertifications"] });
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
      mutation.mutate({ url: res.url!, id: selectedLevel });
    } else {
      toast({
        title: "Error!",
        variant: "destructive",
        description: res.message,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"} className="rounded-full">
          <EditIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Qualification</DialogTitle>
        </DialogHeader>

        <section className="p-5 pt-6 grid grid-cols-1 gap-10">
          <div className="border rounded-md flex items-center justify-center">
            {selectedFile && (
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="Selected file preview"
                width={300}
                height={300}
                className="object-contain"
              />
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-8">
            <Input type="hidden" name="userId" value={""} />

            <div className="space-y-2">
              <Label>Level</Label>
              <Select value={selectedLevel} onValueChange={handleLevelChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>

                <SelectContent>
                  {certs.map((cert) => (
                    <SelectItem key={cert.id} value={cert.id}>
                      {cert.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex w-full">
              <Input
                id="picture"
                type="file"
                name="file"
                onChange={handleFileChange}
              />
              <Button type="submit">Upload</Button>
            </div>
          </form>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default UploadCertModal;
