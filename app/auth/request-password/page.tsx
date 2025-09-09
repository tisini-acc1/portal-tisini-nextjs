import React from "react";

import RequestPasswordForm from "@/components/auth/request-pass-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RequestPasswordPage = () => {
  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle>Confirm Phone Number</CardTitle>
        <CardDescription>
          Enter your registered phone number to request for new password.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <RequestPasswordForm />
      </CardContent>
    </Card>
  );
};

export default RequestPasswordPage;
