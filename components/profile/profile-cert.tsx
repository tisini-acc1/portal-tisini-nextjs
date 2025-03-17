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
import UploadCertModal from "./upload-cert-modal";
import { useQuery } from "@tanstack/react-query";
import { getCertification, getUserCerts } from "@/actions/php-actions";

const ProfileCert = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["certifications"],
    queryFn: () => getCertification("1"),
  });

  const { data: userCerts } = useQuery({
    queryKey: ["userCertifications"],
    queryFn: () => getUserCerts(),
  });

  console.log(userCerts);

  if (isLoading || !data || !userCerts) {
    return <div>Loading...</div>;
  }

  return (
    <section className="">
      <div className="flex justify-end">
        <UploadCertModal certs={data as Certification[]} />
      </div>

      <div>
        {userCerts.map((cert) => (
          <div key={cert.id} className="flex items-center">
            <div className="h-64 w-3/4">
              <Image
                src={cert.certdocument}
                alt={"name"}
                width={150}
                height={150}
                className={
                  "h-full w-full object-cover transition-all hover:scale-105 aspect-square"
                }
              />
            </div>
            {cert.certificate}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfileCert;
