import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { fetchPricing, type PricingItem } from "@/services/mockApi";

interface Props {
  onNext: () => void;
}

const DRAFT_KEY = "indusind_pricing_draft";

const PricingQuote = ({ onNext }: Props) => {
  const [pricing, setPricing] = useState<PricingItem[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD SAVED PRICING ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPricing(parsed);
        setLoading(false);
        console.log("Pricing restored from draft ✅");
        return;
      } catch {
        console.log("Draft corrupted, fetching again");
      }
    }

    // If no draft → fetch from API
    fetchPricing().then((data) => {
      setPricing(data);
      setLoading(false);
    });
  }, []);

  /* ---------------- AUTO SAVE ---------------- */
  useEffect(() => {
    if (!loading && pricing.length > 0) {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(pricing));
      console.log("Pricing auto-saved ✅");
    }
  }, [pricing, loading]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
        <p className="text-sm text-muted-foreground">
          Generating your quote...
        </p>
      </div>
    );
  }

  const quoteNo = pricing[0]?.QuoteNo || "—";
  const totalPremium = pricing.reduce((s, p) => s + p.Premium, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div>
        <h2 className="text-lg font-bold text-foreground">
          Pricing & Quote
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Review your coverage premiums
        </p>
      </div>

      {/* Quote header */}
      <div className="apay-gradient text-primary-foreground rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs opacity-70">Quote Number</p>
            <p className="text-sm font-bold">{quoteNo}</p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-70">Total Premium</p>
            <p className="text-2xl font-bold">
              ₹{totalPremium.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Coverage cards */}
      <div className="space-y-3">
        {pricing.map((item) => (
          <div key={item.CoverID} className="apay-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">
                {item.CoverageName}
              </h3>
              <span className="text-base font-bold text-secondary">
                ₹{item.Premium.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cover ID</span>
                <span>{item.CoverID}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sum Insured</span>
                <span>₹{item.SumInsured.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">2-Year</span>
                <span>₹{item.Premium2Year.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">3-Year</span>
                <span>₹{item.Premium3Year.toLocaleString()}</span>
              </div>
            </div>

            <div className="text-[10px] text-muted-foreground">
              Request: {new Date(item.RequestTime).toLocaleString()} |
              Response: {new Date(item.ResponseTime).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={onNext}
        className="w-full h-12 text-base font-semibold apay-gradient text-primary-foreground hover:opacity-90"
      >
        Review & Confirm — Proceed to Payment
      </Button>
    </motion.div>
  );
};

export default PricingQuote;