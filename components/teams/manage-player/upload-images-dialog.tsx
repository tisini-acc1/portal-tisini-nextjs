"use client";

import Image from "next/image";
import { useState } from "react";

import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/actions/upload";
import { Button } from "@/components/ui/button";
import { uploadPhotoUrl } from "@/actions/php-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type UploadProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  player: TeamPlayer;
};

const UploadImagesDialog = ({ open, setOpen, player }: UploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

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
      // console.log(data);
      if (data.error === "0") {
        setOpen(false);
        setIsUploading(false);
        setSelectedFile(null);
        queryClient.invalidateQueries({ queryKey: ["allPlayers"] });
        toast({ title: "Success", description: data.message });
      } else {
        setIsUploading(false);
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
    formData.append("userId", player?.player_id);

    setIsUploading(true);

    const res = await uploadImage(formData);

    if (res.error === "0") {
      mutation.mutate({ url: res.url!, id: player?.player_id });
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
        <Button size="sm" variant="ghost" className="hidden">
          Transfer
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload</DialogTitle>
          <DialogDescription>
            You are about to upload a file to{" "}
            <strong>{player?.pname}&apos;s</strong> profile.
          </DialogDescription>
        </DialogHeader>

        <div>
          {selectedFile && (
            <Image
              src={URL.createObjectURL(selectedFile)}
              alt="Selected file preview"
              width={350}
              height={350}
            />
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center space-x-2"
        >
          <Input type="hidden" name="userId" value={player?.player_id} />

          <Input
            id="picture"
            type="file"
            name="file"
            onChange={handleFileChange}
          />
          <Button type="submit" disabled={mutation.isPending || isUploading}>
            Upload
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadImagesDialog;
