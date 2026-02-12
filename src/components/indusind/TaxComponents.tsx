import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { fetchTaxComponents, type TaxComponent } from "@/services/mockApi";

interface Props {
  onNext: () => void;
}

const TaxComponents = ({ onNext }: Props) => {
  const [taxes, setTaxes] = useState<TaxComponent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTaxComponents().then((data) => {
      setTaxes(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
        <p className="text-sm text-muted-foreground">Loading tax components...</p>
      </div>
    );
  }

  const totalAmount = taxes.reduce((s, t) => s + t.Amount, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-foreground">Tax Components</h2>
        <p className="text-xs text-muted-foreground mt-1">Breakdown of applicable taxes</p>
      </div>

      <div className="apay-card overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-6 gap-1 px-3 py-2.5 bg-primary text-primary-foreground text-[10px] font-semibold">
          <span className="col-span-1">Code</span>
          <span className="col-span-1">Tax Name</span>
          <span className="text-right">Rate %</span>
          <span className="text-right">1 Year</span>
          <span className="text-right">2 Years</span>
          <span className="text-right">3 Years</span>
        </div>
        {taxes.map((tax, i) => (
          <div
            key={tax.TaxComponent}
            className={`grid grid-cols-6 gap-1 px-3 py-2.5 text-[11px] ${
              i % 2 === 0 ? "bg-background" : "bg-muted/30"
            }`}
          >
            <span className="text-muted-foreground font-medium col-span-1">{tax.TaxComponent}</span>
            <span className="text-foreground col-span-1 truncate">{tax.TaxName}</span>
            <span className="text-right text-foreground">{tax.Rate}%</span>
            <span className="text-right font-medium text-foreground">₹{tax.Amount.toLocaleString()}</span>
            <span className="text-right text-muted-foreground">₹{tax.TaxComponent2YEARS.toLocaleString()}</span>
            <span className="text-right text-muted-foreground">₹{tax.TaxComponent3YEARS.toLocaleString()}</span>
          </div>
        ))}
        {/* Total row */}
        <div className="grid grid-cols-6 gap-1 px-3 py-3 bg-accent text-[11px] font-bold border-t border-border">
          <span className="col-span-3 text-accent-foreground">Total Tax</span>
          <span className="text-right text-accent-foreground">₹{totalAmount.toLocaleString()}</span>
          <span className="text-right text-muted-foreground">₹{taxes.reduce((s, t) => s + t.TaxComponent2YEARS, 0).toLocaleString()}</span>
          <span className="text-right text-muted-foreground">₹{taxes.reduce((s, t) => s + t.TaxComponent3YEARS, 0).toLocaleString()}</span>
        </div>
      </div>

      <Button onClick={onNext} className="w-full h-12 text-base font-semibold apay-gradient text-primary-foreground hover:opacity-90">
        Next — View Quote
      </Button>
    </motion.div>
  );
};

export default TaxComponents;
