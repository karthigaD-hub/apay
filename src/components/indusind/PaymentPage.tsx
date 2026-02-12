import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, CreditCard, Building2, Smartphone } from "lucide-react";
import type { UserDetails } from "@/pages/IndusIndFlow";

interface Props {
  userDetails: UserDetails | null;
}

type PaymentMethod = "card" | "netbanking" | "upi";

const PaymentPage = ({ userDetails }: Props) => {
  const [method, setMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [bankName, setBankName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2500);
  };

  if (success) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-6">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-12 h-12 text-success" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Payment Successful!</h2>
          <p className="text-sm text-muted-foreground mt-2">Your insurance policy has been activated</p>
        </div>
        <div className="apay-card p-5 text-left space-y-3 max-w-sm mx-auto">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Proposal No</span>
            <span className="font-semibold text-foreground">APAY-2026-INS-00451</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Policy Holder</span>
            <span className="font-semibold text-foreground">{userDetails?.fullName || "—"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Vehicle</span>
            <span className="font-semibold text-foreground">{userDetails ? `${userDetails.vehicleMake} ${userDetails.vehicleModel}` : "—"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Premium Paid</span>
            <span className="font-bold text-success">₹27,087</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Coverage</span>
            <span className="font-semibold text-foreground">Comprehensive</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <span className="bg-success text-success-foreground text-xs font-bold px-2 py-0.5 rounded-full">Active</span>
          </div>
        </div>
        <Button onClick={() => window.location.href = "/"} className="apay-gradient text-primary-foreground hover:opacity-90 h-11 px-8">
          Back to Home
        </Button>
      </motion.div>
    );
  }

  const methods: { id: PaymentMethod; label: string; icon: React.ElementType }[] = [
    { id: "upi", label: "UPI", icon: Smartphone },
    { id: "card", label: "Card", icon: CreditCard },
    { id: "netbanking", label: "Net Banking", icon: Building2 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-foreground">Payment</h2>
        <p className="text-xs text-muted-foreground mt-1">Complete your insurance purchase</p>
      </div>

      {/* Policy Summary */}
      <div className="apay-gradient text-primary-foreground rounded-xl p-4">
        <p className="text-xs opacity-70">Amount to Pay</p>
        <p className="text-3xl font-bold mt-1">₹27,087</p>
        <p className="text-xs opacity-70 mt-2">Proposal: APAY-2026-INS-00451</p>
      </div>

      {/* Payment Method Selector */}
      <div className="flex gap-2">
        {methods.map((m) => {
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`flex-1 apay-card p-3 flex flex-col items-center gap-1.5 transition-all ${
                method === m.id ? "ring-2 ring-secondary" : ""
              }`}
            >
              <Icon className={`w-5 h-5 ${method === m.id ? "text-secondary" : "text-muted-foreground"}`} />
              <span className={`text-xs font-medium ${method === m.id ? "text-secondary" : "text-muted-foreground"}`}>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Payment Forms */}
      <AnimatePresence mode="wait">
        <motion.div key={method} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="apay-card p-4 space-y-4">
          {method === "upi" && (
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">UPI ID</Label>
              <Input value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="yourname@upi" className="h-11" />
            </div>
          )}
          {method === "card" && (
            <>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Card Number</Label>
                <Input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="1234 5678 9012 3456" className="h-11" maxLength={19} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Name on Card</Label>
                <Input value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Full name" className="h-11" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Expiry</Label>
                  <Input value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} placeholder="MM/YY" className="h-11" maxLength={5} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">CVV</Label>
                  <Input value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} placeholder="***" className="h-11" maxLength={4} type="password" />
                </div>
              </div>
            </>
          )}
          {method === "netbanking" && (
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Select Bank</Label>
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full h-11 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">Choose your bank</option>
                <option>State Bank of India</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
                <option>IndusInd Bank</option>
                <option>Kotak Mahindra Bank</option>
              </select>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <Button
        onClick={handlePay}
        disabled={processing}
        className="w-full h-12 text-base font-semibold apay-gradient text-primary-foreground hover:opacity-90"
      >
        {processing ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          "Pay Now — ₹27,087"
        )}
      </Button>

      <p className="text-[10px] text-center text-muted-foreground">
        🔒 Your payment is secured with 256-bit encryption
      </p>
    </motion.div>
  );
};

export default PaymentPage;
