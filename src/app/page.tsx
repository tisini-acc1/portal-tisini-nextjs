import { ModeToggle } from "@/components/shared/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Tisini Portal
      <ModeToggle />
      <Button size="sm">login</Button>
    </main>
  );
}
