import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import RegisterForm from "../../../../components/auth/register-form";
import React from "react";

type RegProps = {
  params: Promise<{ role: string }>;
};

export default async function RegisterPage({ params }: RegProps) {
  const { role } = await params;

  return (
    <Card className="w-[350px] md:w-[400px] mb-3">
      <CardHeader>
        <CardTitle>Get Started Today</CardTitle>
        <CardDescription>And be inspired by numbers</CardDescription>
      </CardHeader>

      <CardContent>
        <RegisterForm role={role} />
      </CardContent>

      <Separator />

      <CardFooter className="p-3 flex items-center justify-center">
        <CardDescription>
          Already have an account?
          <Link
            href="/auth/login"
            className="text-ring text-sm hover:underline"
          >
            {" "}
            Login
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
