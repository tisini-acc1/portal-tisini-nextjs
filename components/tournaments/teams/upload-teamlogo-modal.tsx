"use client";

import Image from "next/image";
import { useState } from "react";
import { useStore } from "@/store/store";
import { CameraIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/actions/upload";
import { Button } from "@/components/ui/button";
import { uploadTeamLogo } from "@/actions/php-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const UploadTeamLogoModal = () => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const team = useStore((state) => state.store.team);

  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const mutation = useMutation({
    mutationFn: uploadTeamLogo,
    onSuccess: (data) => {
      //   console.log(data);
      if (data.error === "0") {
        setOpen(false);
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
    formData.append("userId", team.id);

    const res = await uploadImage(formData);

    // console.log(res.url);
    if (res.error === "0") {
      mutation.mutate({ url: res.url!, id: team.id });
    } else {
      toast({
        title: "Error!",
        variant: "destructive",
        description: res.message,
      });
    }
  };

  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <CameraIcon className="w-3 h-3" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Team Logo</DialogTitle>
          <DialogDescription>
            You are uploading {team.name} logo.
          </DialogDescription>
        </DialogHeader>

        <section className="p-5 pt-6 grid grid-cols-1 gap-10">
          {selectedFile && (
            <div className="h-96 border rounded-md flex items-center justify-center">
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="Selected file preview"
                width={350}
                height={350}
                className="object-contain"
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-1 w-full">
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
      </DialogContent>
    </Dialog>
  );
};

export default UploadTeamLogoModal;
