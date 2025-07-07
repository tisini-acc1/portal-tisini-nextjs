import React from "react";

import ResetPasswordForm from "@/components/auth/reset-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ResetPasswordPage = () => {
  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Set your new password. For old password use the one set on phone.
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full">
        <ResetPasswordForm />
      </CardContent>
    </Card>
  );
};

export default ResetPasswordPage;
