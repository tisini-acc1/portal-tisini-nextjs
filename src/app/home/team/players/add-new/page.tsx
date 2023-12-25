import Header from "@/app/home/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreatePlayerForm from "../components/create-player-form";

const AddPlayerPage = () => {
  return (
    <main className="space-y-3">
      {/* <Header /> */}

      <Card>
        <CardHeader>
          <CardTitle>Add new player</CardTitle>
          <CardDescription>
            The default password for the player is &lsquo;player&lsquo;
          </CardDescription>
        </CardHeader>

        <CardContent>
          <CreatePlayerForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default AddPlayerPage;
