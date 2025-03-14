"use client";

import React, { useState } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";

const ProfileCert = () => {
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
      <div className="h-80 border rounded-md flex items-center justify-center">
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

        <Select defaultValue="level1">
          <SelectTrigger>
            <SelectValue placeholder="level 1" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="level1">Level 1</SelectItem>
            <SelectItem value="level2">Level 2</SelectItem>
            <SelectItem value="level3">Level 3</SelectItem>
            <SelectItem value="level4">Level 4</SelectItem>
            <SelectItem value="level5">Level 5</SelectItem>
            <SelectItem value="level6">Level 6</SelectItem>
          </SelectContent>
        </Select>

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
  );
};

export default ProfileCert;
