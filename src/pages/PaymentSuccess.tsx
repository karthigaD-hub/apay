import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="h-12 w-12 text-success" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {params.get("orderId") && (
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="text-lg font-semibold">{params.get("orderId")}</p>
            </div>
          )}
          {params.get("transactionId") && (
            <div>
              <p className="text-sm text-muted-foreground">Transaction ID</p>
              <p className="text-lg font-semibold">{params.get("transactionId")}</p>
            </div>
          )}
          {params.get("amount") && (
            <div>
              <p className="text-sm text-muted-foreground">Amount Paid</p>
              <p className="text-xl font-bold text-accent">₹{params.get("amount")}</p>
            </div>
          )}
          <p className="text-muted-foreground">Your policy will be issued shortly. You will receive a confirmation on your registered email.</p>
          <Button onClick={() => navigate("/")} className="mt-4 w-full">Back to Home</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
