"use client";

import Image from "next/image";

import { useStore } from "@/lib/store";

const ImageAvatar = () => {
  const user = useStore((state) => state.store.user);

  return (
    <Image
      src={user.profileurl || "/avatar.webp"}
      alt="profile"
      width={100}
      height={100}
      className="rounded-full"
    />
  );
};

export default ImageAvatar;
