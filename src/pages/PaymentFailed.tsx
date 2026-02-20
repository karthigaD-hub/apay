import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentFailed = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <XCircle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Payment Failed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {params.get("orderId") && (
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="text-lg font-semibold">{params.get("orderId")}</p>
            </div>
          )}
          <p className="text-muted-foreground">Your payment could not be processed. Please try again or contact support.</p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/")} className="flex-1">Home</Button>
            <Button onClick={() => navigate("/insurance")} className="flex-1">Try Again</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentFailed;
