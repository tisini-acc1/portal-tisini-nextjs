import Link from "next/link";

import { Separator } from "@/components/ui/separator";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import UsernameForm from "../../../components/auth/username-form";

const LoginPage = () => {
  return (
    <Card className="w-[350px] mb-4">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>
          Don&apos;t have an account?
          <Link
            href="/auth/register"
            className="text-ring text-sm hover:underline"
          >
            {" "}
            get started
          </Link>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <UsernameForm />
        {/* <Tabs defaultValue="username">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="username">Phone number</TabsTrigger> 
            <TabsTrigger value="email">Email</TabsTrigger>
          </TabsList>
          <TabsContent value="username">
          </TabsContent>
           <TabsContent value="email">
            <EmailForm />
          </TabsContent>
        </Tabs> */}
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
