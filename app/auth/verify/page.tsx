import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { InputOTPForm } from "@/components/auth/input-otp-form";

const VerifyPage = () => {
  return (
    <Card className="w-[350px] mb-4">
      <CardHeader>
        <CardTitle>Verify Account</CardTitle>
        <CardDescription>
          Please enter the one-time password sent to your phone.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <InputOTPForm />
      </CardContent>
    </Card>
  );
};

export default VerifyPage;
