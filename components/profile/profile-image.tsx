"use client";

import { useState } from "react";
import Image from "next/image";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

const ProfileImage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    console.log("first");
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
