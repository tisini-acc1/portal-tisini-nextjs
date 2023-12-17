import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "../components/login-form";

const LoginPage = () => {
  return (
    <Card className="w-[350px] mb-4">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>
          Don&apos;t have an account?
          <Link href="/register" className="text-ring text-sm hover:underline">
            {" "}
            get started
          </Link>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <LoginForm />
      </CardContent>

      <Separator />

      <CardFooter className="flex items-center justify-center p-3">
        <Link href="" className="text-sm hover:underline text-ring">
          Forgot password?
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
