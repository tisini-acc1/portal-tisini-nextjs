import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const RecentPayments = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Payments</CardTitle>
        <CardDescription>You made 2 payments this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex items-center">
            <div className=" space-y-1">
              <p className="text-sm font-medium leading-none">03-12-24</p>
              <p className="text-sm text-muted-foreground">
                manchester v liverpool
              </p>
            </div>
            <div className="ml-auto font-medium">+$1,999.00</div>
          </div>
          <div className="flex items-center">
            <div className=" space-y-1">
              <p className="text-sm font-medium leading-none">03-12-24</p>
              <p className="text-sm text-muted-foreground">
                Gor Mahia v AFC Leopards
              </p>
            </div>
            <div className="ml-auto font-medium">+$39.00</div>
          </div>
          <div className="flex items-center">
            <div className=" space-y-1">
              <p className="text-sm font-medium leading-none">03-12-24</p>
              <p className="text-sm text-muted-foreground">
                Life & Sports Academy v Kibagare sportiff
              </p>
            </div>
            <div className="ml-auto font-medium">+$299.00</div>
          </div>
          <div className="flex items-center">
            <div className=" space-y-1">
              <p className="text-sm font-medium leading-none">03-12-24</p>
              <p className="text-sm text-muted-foreground">
                AFC Leopards v Tusker
              </p>
            </div>
            <div className="ml-auto font-medium">+$99.00</div>
          </div>
          <div className="flex items-center">
            <div className=" space-y-1">
              <p className="text-sm font-medium leading-none">03-12-24</p>
              <p className="text-sm text-muted-foreground">
                Mathare United v KCB FC
              </p>
            </div>
            <div className="ml-auto font-medium">+$39.00</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
