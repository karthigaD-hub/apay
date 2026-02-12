import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { fetchMotorPolicy, type MotorPolicy } from "@/services/mockApi";

interface Props {
  onNext: () => void;
}

const formatValue = (val: unknown) => {
  if (typeof val === "number") return val.toLocaleString();
  if (typeof val === "boolean") return val ? "Yes" : "No";
  return String(val || "—");
};

const sections: { title: string; keys: (keyof MotorPolicy)[] }[] = [
  {
    title: "Premium Summary",
    keys: ["NetPremium", "BasicPremium", "OriginalPremium", "EndorsedPremium", "FinalPremium", "TotalPremium", "TotalOD", "TotalODPremium", "TotalScheduleODPremium", "TotalLiabilityPremium", "TotalPackagePremium", "TotalAddonPremium", "TotalChangeAmount"],
  },
  {
    title: "Tax & Cess",
    keys: ["ECessAmount", "HECessAmount", "ServiceTaxRate", "ServiceTaxAmount", "EducationalCessRate", "HigherEducationalCessRate", "SwachhBharatCess", "SwachhBharatCessRate", "KrishiKalyanCess", "KrishiKalyanCessRate", "SalesTaxAmount", "SalesTaxRate", "SurchargeAmount", "SurchrgeRate"],
  },
  {
    title: "IDV Details",
    keys: ["IDV", "BodyIDV", "ChassisIDV", "MinIDV", "MaxIDV", "MinBodyIDV", "MaxBodyIDV", "MinChassisIDV", "MaxChassisIDV", "DerivedVehicleIDV", "IDVDepreciationPercentage"],
  },
  {
    title: "NCB & Claims",
    keys: ["IsClaimedInLastPolicy", "CurrentYearNCB", "Current2YearNCB", "Current3YearNCB"],
  },
  {
    title: "2-Year Plan",
    keys: ["NetPremium2Year", "BasicPremium2Year", "FinalPremium2Year", "TotalOD2Year", "TotalODPremium2Year", "TotalLiabilityPremium2Year", "TotalPackagePremium2Year", "TotalAddonPremium2Year", "SecondYearBasicVehicleIDV"],
  },
  {
    title: "3-Year Plan",
    keys: ["NetPremium3Year", "BasicPremium3Year", "FinalPremium3Year", "TotalOD3Year", "TotalODPremium3Year", "TotalLiabilityPremium3Year", "TotalPackagePremium3Year", "TotalAddonPremium3Year", "ThirdYearBasicVehicleIDV", "FourthYearBasicVehicleIDV", "FifthYearBasicVehicleIDV"],
  },
  {
    title: "Other Details",
    keys: ["CompulsoryDeductible", "BasicODwithoutDiscount", "BasicTPPerPaxAmount", "BasicTPAmount", "HevTpDiscount", "InspectionCharges", "InspectionChargesapplicable", "IsEligible", "status", "ProposalNo", "TraceID", "ServiceRequestID", "InvoiceNo"],
  },
];

const MotorPolicyDetails = ({ onNext }: Props) => {
  const [policy, setPolicy] = useState<MotorPolicy | null>(null);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    fetchMotorPolicy().then((data) => {
      setPolicy(data);
      setLoading(false);
    });
  }, []);

  const toggleSection = (i: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
        <p className="text-sm text-muted-foreground">Calculating policy details...</p>
      </div>
    );
  }

  if (!policy) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-foreground">Motor Policy Details</h2>
        <p className="text-xs text-muted-foreground mt-1">Review all policy parameters</p>
      </div>

      {/* Highlight card */}
      <div className="apay-gradient text-primary-foreground rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs opacity-70">Final Premium</p>
          <p className="text-2xl font-bold">₹{policy.FinalPremium.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-xs opacity-70">Proposal</p>
          <p className="text-sm font-semibold">{policy.ProposalNo}</p>
        </div>
      </div>

      {sections.map((section, i) => (
        <div key={section.title} className="apay-card overflow-hidden">
          <button
            onClick={() => toggleSection(i)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
            {openSections.has(i) ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          {openSections.has(i) && (
            <div className="border-t border-border">
              {section.keys.map((key, j) => (
                <div
                  key={key}
                  className={`flex justify-between px-4 py-2.5 text-xs ${
                    j % 2 === 0 ? "bg-background" : "bg-muted/30"
                  }`}
                >
                  <span className="text-muted-foreground">{String(key)}</span>
                  <span className="font-medium text-foreground text-right">
                    {typeof policy[key] === "number" && key !== "IDVDepreciationPercentage"
                      ? `₹${formatValue(policy[key])}`
                      : formatValue(policy[key])}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <Button onClick={onNext} className="w-full h-12 text-base font-semibold apay-gradient text-primary-foreground hover:opacity-90">
        Next — Tax Details
      </Button>
    </motion.div>
  );
};

export default MotorPolicyDetails;
