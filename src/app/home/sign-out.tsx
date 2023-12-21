"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const LogOut = () => {
  return (
    <Button
      variant="outline"
      // onClick={() => console.log(Date.now() < 1705691141 * 100)}
      onClick={() => signOut()}
    >
      Sign out
    </Button>
  );
};

export default LogOut;
