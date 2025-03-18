"use client";

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
    <section className="space-y-4">
      <div className="flex justify-end">
        <UploadCertModal certs={data as Certification[]} />
      </div>

      <div className="space-y-4">
        {userCerts.map((cert) => (
          <div key={cert.id} className="flex items-center gap-4 border p-1">
            <div className="">
              <Image
                src={cert.certdocument}
                alt={"name"}
                width={50}
                height={50}
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
