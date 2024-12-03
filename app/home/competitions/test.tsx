"use client";

import { useStore } from "@/lib/store";

const TestApp = () => {
  const { user } = useStore((state) => state);
  console.log(user);
  return (
    <div>
      <h4>Test app</h4>
      {user.role}
    </div>
  );
};

export default TestApp;
