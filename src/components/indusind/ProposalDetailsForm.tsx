import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const DRAFT_KEY = "indusind_proposal_draft";

interface ProposalData {
  vehicleDetails: {
    vehicleMake: string;
    vehicleModel: string;
    manufactureYear: string;
    manufactureMonth: string;
    registrationNumber: string;
    registrationDate: string;
    fuelType: string;
    rto: string;
    exShowroomPrice: string;
  };
  coverDetails: {
    electricalAccessories: boolean;
    electricalSI: string;
    nonElectricalAccessories: boolean;
    nonElectricalSI: string;
    biFuelKit: boolean;
    voluntaryDeductible: boolean;
    antiTheft: boolean;
    nilDep: boolean;
    engineProtect: boolean;
    returnToInvoice: boolean;
    keyProtect: boolean;
    tyreProtect: boolean;
    rimProtect: boolean;
    payAsYouDrive: boolean;
  };
  nomineeDetails: {
    nomineeName: string;
    nomineeDOB: string;
    nomineeRelationship: string;
    nomineeAddress: string;
  };
  previousPolicy: {
    previousInsurer: string;
    previousPolicyNumber: string;
    previousStartDate: string;
    previousEndDate: string;
    ncbPercentage: string;
    isClaimedLastYear: boolean;
  };
}

const defaultFormData: ProposalData = {
  vehicleDetails: {
    vehicleMake: "",
    vehicleModel: "",
    manufactureYear: "",
    manufactureMonth: "",
    registrationNumber: "",
    registrationDate: "",
    fuelType: "",
    rto: "",
    exShowroomPrice: "",
  },
  coverDetails: {
    electricalAccessories: false,
    electricalSI: "",
    nonElectricalAccessories: false,
    nonElectricalSI: "",
    biFuelKit: false,
    voluntaryDeductible: false,
    antiTheft: false,
    nilDep: false,
    engineProtect: false,
    returnToInvoice: false,
    keyProtect: false,
    tyreProtect: false,
    rimProtect: false,
    payAsYouDrive: false,
  },
  nomineeDetails: {
    nomineeName: "",
    nomineeDOB: "",
    nomineeRelationship: "",
    nomineeAddress: "",
  },
  previousPolicy: {
    previousInsurer: "",
    previousPolicyNumber: "",
    previousStartDate: "",
    previousEndDate: "",
    ncbPercentage: "",
    isClaimedLastYear: false,
  },
};

const Input = ({ label, value, ...props }: any) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-muted-foreground">{label}</label>
    <input
      value={value}
      className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
      {...props}
    />
  </div>
);

const Checkbox = ({ label, checked, onChange }: any) => (
  <label className="flex items-center gap-2 text-sm">
    <input type="checkbox" checked={checked} onChange={onChange} />
    {label}
  </label>
);

const Section = ({ title, children }: any) => (
  <div className="apay-card p-4 space-y-4">
    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
    {children}
  </div>
);

const ProposalDetailsForm = ({ onSubmit }: { onSubmit: (data: ProposalData) => void }) => {
  const [formData, setFormData] = useState<ProposalData>(defaultFormData);

  /* -------------------- LOAD DRAFT ON MOUNT -------------------- */
  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch {
        console.log("Draft corrupted");
      }
    }
  }, []);

  /* -------------------- AUTO SAVE (Debounce 800ms) -------------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
      console.log("Auto Saved ✅");
    }, 800);

    return () => clearTimeout(timer);
  }, [formData]);

  const handleChange = (section: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);

    // Optional: clear draft after submit
    localStorage.removeItem(DRAFT_KEY);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div>
        <h2 className="text-lg font-bold text-foreground">Proposal Details</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Provide complete details for policy issuance
        </p>
      </div>

      {/* Vehicle Details */}
      <Section title="Vehicle Information">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Make"
            value={formData.vehicleDetails.vehicleMake}
            onChange={(e: any) =>
              handleChange("vehicleDetails", "vehicleMake", e.target.value)
            }
          />
          <Input
            label="Model"
            value={formData.vehicleDetails.vehicleModel}
            onChange={(e: any) =>
              handleChange("vehicleDetails", "vehicleModel", e.target.value)
            }
          />
          <Input
            label="Manufacture Year"
            value={formData.vehicleDetails.manufactureYear}
            onChange={(e: any) =>
              handleChange("vehicleDetails", "manufactureYear", e.target.value)
            }
          />
          <Input
            label="Manufacture Month"
            value={formData.vehicleDetails.manufactureMonth}
            onChange={(e: any) =>
              handleChange("vehicleDetails", "manufactureMonth", e.target.value)
            }
          />
        </div>
      </Section>

      <Button
        type="submit"
        className="w-full h-12 text-base font-semibold apay-gradient text-primary-foreground hover:opacity-90"
      >
        Proceed to Payment
      </Button>
    </motion.form>
  );
};

export default ProposalDetailsForm;