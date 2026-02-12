import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Shield, Lock } from "lucide-react";
import { fetchCoverages, type CoverageItem } from "@/services/mockApi";

interface Props {
  selectedCoverages: string[];
  onSelectionChange: (ids: string[]) => void;
  onNext: () => void;
}

const CoverageSelection = ({ selectedCoverages, onSelectionChange, onNext }: Props) => {
  const [coverages, setCoverages] = useState<CoverageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoverages().then((data) => {
      setCoverages(data);
      // Auto-select mandatory
      const mandatory = data.filter((c) => c.ISMANDATORY).map((c) => c.CoverageID);
      onSelectionChange([...new Set([...selectedCoverages, ...mandatory])]);
      setLoading(false);
    });
  }, []);

  const toggleCoverage = (id: string, mandatory: boolean) => {
    if (mandatory) return;
    onSelectionChange(
      selectedCoverages.includes(id)
        ? selectedCoverages.filter((c) => c !== id)
        : [...selectedCoverages, id]
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
        <p className="text-sm text-muted-foreground">Fetching coverage options...</p>
      </div>
    );
  }

  const total = coverages
    .filter((c) => selectedCoverages.includes(c.CoverageID))
    .reduce((s, c) => s + c.AMOUNT, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-foreground">Select Coverage</h2>
        <p className="text-xs text-muted-foreground mt-1">Choose your insurance coverage options</p>
      </div>

      <div className="space-y-3">
        {coverages.map((cov) => {
          const selected = selectedCoverages.includes(cov.CoverageID);
          return (
            <div
              key={cov.CoverageID}
              onClick={() => toggleCoverage(cov.CoverageID, cov.ISMANDATORY)}
              className={`apay-card p-4 cursor-pointer transition-all ${
                selected ? "ring-2 ring-secondary" : ""
              } ${cov.ISMANDATORY ? "cursor-default" : ""}`}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selected}
                  disabled={cov.ISMANDATORY}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{cov.CoverageName}</h3>
                    {cov.ISMANDATORY && (
                      <span className="flex items-center gap-0.5 text-[9px] font-bold text-warning bg-warning/10 px-1.5 py-0.5 rounded">
                        <Lock className="w-2.5 h-2.5" /> Mandatory
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{cov.lstPACoverBenefits}</p>
                  <div className="flex flex-wrap gap-2 mt-2 text-[10px]">
                    <span className="bg-muted px-2 py-0.5 rounded text-muted-foreground">ID: {cov.CoverageID}</span>
                    <span className="bg-muted px-2 py-0.5 rounded text-muted-foreground">Type: {cov.TypeofCover}</span>
                    <span className="bg-muted px-2 py-0.5 rounded text-muted-foreground">Rate: {cov.rate}%</span>
                    <span className="bg-muted px-2 py-0.5 rounded text-muted-foreground">{cov.LISTVALUE}</span>
                    {cov.DerivedVehicleIDV > 0 && (
                      <span className="bg-muted px-2 py-0.5 rounded text-muted-foreground">IDV: ₹{cov.DerivedVehicleIDV.toLocaleString()}</span>
                    )}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-base font-bold text-foreground">₹{cov.AMOUNT.toLocaleString()}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div className="apay-card p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-secondary" />
          <span className="text-sm font-semibold text-foreground">Selected Premium</span>
        </div>
        <span className="text-xl font-bold text-secondary">₹{total.toLocaleString()}</span>
      </div>

      <Button onClick={onNext} disabled={selectedCoverages.length === 0} className="w-full h-12 text-base font-semibold apay-gradient text-primary-foreground hover:opacity-90">
        Next — View Policy Details
      </Button>
    </motion.div>
  );
};

export default CoverageSelection;
