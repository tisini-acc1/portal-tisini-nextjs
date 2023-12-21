type AuthProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthProps) {
  const date = new Date().getFullYear();

  return (
    <div className="h-screen relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}

        <span className="text-sm text-muted-foreground flex items-center justify-center">
          Copyright @{date} Tisini, All rights reserved
        </span>
      </div>
    </div>
  );
}
