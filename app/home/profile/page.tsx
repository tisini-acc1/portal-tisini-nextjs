"use client";

import Image from "next/image";
import { Mail, PhoneIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/lib/store";
import UploadCertModal from "@/components/profile/upload-cert-modal";
import EditAvatarModal from "@/components/profile/edit-avatar-modal";
import EditProfileBioModal from "@/components/profile/edit-bio-modal";
import { getCertification, getUserCerts } from "@/actions/php-actions";

const ProfilePage = () => {
  const user = useStore((state) => state.store.user);

  const { data, isLoading } = useQuery({
    queryKey: ["certifications"],
    queryFn: () => getCertification("1"),
  });

  const { data: userCerts } = useQuery({
    queryKey: ["userCertifications"],
    queryFn: () => getUserCerts(),
  });

  // console.log(userCerts);

  if (isLoading || !data || !userCerts) {
    return <div>Loading...</div>;
  }

  return (
    <main className="space-y-4">
      <header className="h-60 bg-gray-100 rounded-md">
        <div className="h-24 bg-wallet bg-center bg-no-repeat bg-cover rounded-t-md">
          <div className="pt-10 pl-3 relative">
            <Image
              src={user.profileurl || "/avatar.webp"}
              alt="profile"
              width={100}
              height={100}
              className="rounded-full"
            />

            <div className="absolute bottom-0 left-20">
              <EditAvatarModal />
            </div>
          </div>
        </div>
        <div className="pt-12 p-3 space-y-2">
          <div className="flex justify-between items-center">
            <strong className="text-xl">John Doe</strong>

            <EditProfileBioModal />
          </div>

          <div className="flex flex-col gap-1">
            <p className="flex items-center gap-2 text-xs">
              <PhoneIcon className="h-3 w-3" />
              <span>{user.phone}</span>
            </p>
            <p className="flex items-center gap-2 text-xs">
              <Mail className="h-3 w-3" />
              <span>........</span>
            </p>
          </div>
        </div>
      </header>

      <section className="bg-gray-100 rounded-md p-4 space-y-3">
        <div className="flex justify-between items-center">
          <strong>Your Qualifications</strong>

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
    </main>
  );
};

export default ProfilePage;
