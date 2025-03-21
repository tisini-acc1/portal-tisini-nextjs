"use client";

import Image from "next/image";
import { useState } from "react";
import { EyeIcon } from "lucide-react";

type RefProps = {
  title: string;
  refData: Referee;
};

const RefreeCard = ({ title, refData }: RefProps) => {
  const [blur, setBlur] = useState(true);

  return (
    <div className="border rounded-md p-1 pt-2 flex gap-2 items-center bg-slate-50">
      <Image
        src={refData.profileurl || "/avatar.webp"}
        alt={refData.first_name}
        width={50}
        height={50}
        className="rounded-full object-contain"
      />
      <div className="flex flex-col text-xs gap-1 font-mono text-nowrap text-ellipsis">
        <p>
          {refData.first_name} {refData.last_name} -{" "}
          <span className="text-muted-foreground">{title}</span>
        </p>

        <span className="text-muted-foreground flex items-center gap-2">
          <span className={blur ? "blur-lg" : ""}>0700000000</span>
          <EyeIcon
            className="h-4 w-4 cursor-pointer"
            onClick={() => setBlur(!blur)}
          />{" "}
        </span>
      </div>
    </div>
  );
};

export default RefreeCard;
