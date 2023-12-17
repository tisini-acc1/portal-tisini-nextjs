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
import RegisterForm from "../components/register-form";

const RegisterPage = () => {
  return (
    <Card className="w-[350px] mb-3">
      <CardHeader>
        <CardTitle>Get Started Today</CardTitle>
        <CardDescription>And be inspired by numbers</CardDescription>
      </CardHeader>

      <CardContent>
        <RegisterForm />
      </CardContent>

      <Separator />

      <CardFooter className="p-3 flex items-center justify-center">
        <CardDescription>
          Already have an account?
          <Link href="/login" className="text-ring text-sm hover:underline">
            {" "}
            Login
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default RegisterPage;
