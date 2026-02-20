import { useState, useEffect } from "react";
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

const DRAFT_KEY = "indusind_payment_draft";

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

  /* ---------------- LOAD DRAFT ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (!saved) return;

    try {
      const data = JSON.parse(saved);
      setMethod(data.method || "upi");
      setUpiId(data.upiId || "");
      setCardNumber(data.cardNumber || "");
      setCardExpiry(data.cardExpiry || "");
      setCardCvv(data.cardCvv || "");
      setCardName(data.cardName || "");
      setBankName(data.bankName || "");
      console.log("Payment draft restored ✅");
    } catch {
      console.log("Payment draft corrupted");
    }
  }, []);

  /* ---------------- AUTO SAVE ---------------- */
  useEffect(() => {
    const draft = {
      method,
      upiId,
      cardNumber,
      cardExpiry,
      cardCvv,
      cardName,
      bankName,
    };

    const timer = setTimeout(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      console.log("Payment auto-saved ✅");
    }, 500);

    return () => clearTimeout(timer);
  }, [method, upiId, cardNumber, cardExpiry, cardCvv, cardName, bankName]);

  /* ---------------- PAYMENT ---------------- */
  const handlePay = () => {
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);

      // Clear payment draft after success
      localStorage.removeItem(DRAFT_KEY);
      console.log("Payment draft cleared 🗑️");
    }, 2500);
  };

  /* ---------------- SUCCESS SCREEN ---------------- */
  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 space-y-6"
      >
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-12 h-12 text-success" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground">
            Payment Successful!
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Your insurance policy has been activated
          </p>
        </div>

        <div className="apay-card p-5 text-left space-y-3 max-w-sm mx-auto">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Policy Holder</span>
            <span className="font-semibold">
              {userDetails?.fullName || "—"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Vehicle</span>
            <span className="font-semibold">
              {userDetails
                ? `${userDetails.vehicleMake} ${userDetails.vehicleModel}`
                : "—"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Premium Paid</span>
            <span className="font-bold text-success">₹27,087</span>
          </div>
        </div>

        <Button
          onClick={() => (window.location.href = "/")}
          className="apay-gradient text-primary-foreground h-11 px-8"
        >
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

  /* ---------------- UI ---------------- */
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div>
        <h2 className="text-lg font-bold">Payment</h2>
        <p className="text-xs text-muted-foreground">
          Complete your insurance purchase
        </p>
      </div>

      {/* Amount */}
      <div className="apay-gradient text-primary-foreground rounded-xl p-4">
        <p className="text-xs opacity-70">Amount to Pay</p>
        <p className="text-3xl font-bold mt-1">₹27,087</p>
      </div>

      {/* Method Selector */}
      <div className="flex gap-2">
        {methods.map((m) => {
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`flex-1 apay-card p-3 flex flex-col items-center gap-1.5 ${
                method === m.id ? "ring-2 ring-secondary" : ""
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Forms */}
      <AnimatePresence mode="wait">
        <motion.div
          key={method}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="apay-card p-4 space-y-4"
        >
          {method === "upi" && (
            <div className="space-y-1.5">
              <Label className="text-xs">UPI ID</Label>
              <Input
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@upi"
              />
            </div>
          )}

          {method === "card" && (
            <>
              <Input
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <Input
                placeholder="Name on Card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                />
                <Input
                  placeholder="CVV"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  type="password"
                />
              </div>
            </>
          )}

          {method === "netbanking" && (
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full h-11 border rounded-md px-3"
            >
              <option value="">Choose your bank</option>
              <option>State Bank of India</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>Axis Bank</option>
              <option>IndusInd Bank</option>
            </select>
          )}
        </motion.div>
      </AnimatePresence>

      <Button
        onClick={handlePay}
        disabled={processing}
        className="w-full h-12 apay-gradient text-primary-foreground"
      >
        {processing ? "Processing..." : "Pay Now — ₹27,087"}
      </Button>
    </motion.div>
  );
};

export default PaymentPage;