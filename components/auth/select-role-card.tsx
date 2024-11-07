import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import NavigationButton from "./navigation-button";

const SelectRoleCard = (account: Role) => {
  return (
    <Card className="md:w-[150px] w-[150px]">
      <CardContent className="space-y-4 p-4">
        <div className="flex items-center justify-center">
          <Avatar>
            <AvatarImage src={account.img} />
            <AvatarFallback>RP</AvatarFallback>
          </Avatar>
        </div>

        <CardDescription className="flex items-center justify-center capitalize whitespace-nowrap">
          {account.role}
        </CardDescription>

        <div className="flex items-center justify-center">
          <NavigationButton role={account.role} />
        </div>
      </CardContent>
    </Card>
  );
};

export default SelectRoleCard;
