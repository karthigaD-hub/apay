import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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

const Input = ({ label, ...props }: any) => (

  <div className="space-y-1">
    <label className="text-xs font-medium text-muted-foreground">{label}</label>
    <input
      className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
      {...props}
    />
  </div>
);

const Checkbox = ({ label, checked, onChange }: any) => ( <label className="flex items-center gap-2 text-sm"> <input type="checkbox" checked={checked} onChange={onChange} />
{label} </label>
);

const Section = ({ title, children }: any) => (

  <div className="apay-card p-4 space-y-4">
    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
    {children}
  </div>
);

const ProposalDetailsForm = ({ onSubmit }: { onSubmit: (data: ProposalData) => void }) => {
const [formData, setFormData] = useState<ProposalData>({
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
});

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
};

return (
<motion.form
onSubmit={handleSubmit}
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
className="space-y-4"
> <div> <h2 className="text-lg font-bold text-foreground">Proposal Details</h2> <p className="text-xs text-muted-foreground mt-1">
Provide complete details for policy issuance </p> </div>


  {/* Vehicle Details */}
  <Section title="Vehicle Information">
    <div className="grid grid-cols-2 gap-3">
      <Input label="Make" onChange={(e: any) => handleChange("vehicleDetails", "vehicleMake", e.target.value)} />
      <Input label="Model" onChange={(e: any) => handleChange("vehicleDetails", "vehicleModel", e.target.value)} />
      <Input label="Manufacture Year" onChange={(e: any) => handleChange("vehicleDetails", "manufactureYear", e.target.value)} />
      <Input label="Manufacture Month" onChange={(e: any) => handleChange("vehicleDetails", "manufactureMonth", e.target.value)} />
      <Input label="Registration No" onChange={(e: any) => handleChange("vehicleDetails", "registrationNumber", e.target.value)} />
      <Input label="Registration Date" type="date" onChange={(e: any) => handleChange("vehicleDetails", "registrationDate", e.target.value)} />
      <Input label="Fuel Type" onChange={(e: any) => handleChange("vehicleDetails", "fuelType", e.target.value)} />
      <Input label="RTO" onChange={(e: any) => handleChange("vehicleDetails", "rto", e.target.value)} />
      <Input label="Ex-Showroom Price" onChange={(e: any) => handleChange("vehicleDetails", "exShowroomPrice", e.target.value)} />
    </div>
  </Section>

  {/* Addons */}
  <Section title="Addon Covers">
    <div className="grid grid-cols-2 gap-2">
      {Object.keys(formData.coverDetails)
        .filter((k) => !k.toLowerCase().includes("si"))
        .map((key) => (
          <Checkbox
            key={key}
            label={key}
            checked={(formData.coverDetails as any)[key]}
            onChange={(e: any) =>
              handleChange("coverDetails", key, e.target.checked)
            }
          />
        ))}
    </div>

    <div className="grid grid-cols-2 gap-3">
      <Input
        label="Electrical SI"
        onChange={(e: any) => handleChange("coverDetails", "electricalSI", e.target.value)}
      />
      <Input
        label="Non Electrical SI"
        onChange={(e: any) => handleChange("coverDetails", "nonElectricalSI", e.target.value)}
      />
    </div>
  </Section>

  {/* Nominee */}
  <Section title="Nominee Details">
    <div className="grid grid-cols-2 gap-3">
      <Input label="Nominee Name" onChange={(e: any) => handleChange("nomineeDetails", "nomineeName", e.target.value)} />
      <Input label="DOB" type="date" onChange={(e: any) => handleChange("nomineeDetails", "nomineeDOB", e.target.value)} />
      <Input label="Relationship" onChange={(e: any) => handleChange("nomineeDetails", "nomineeRelationship", e.target.value)} />
      <Input label="Address" onChange={(e: any) => handleChange("nomineeDetails", "nomineeAddress", e.target.value)} />
    </div>
  </Section>

  {/* Previous Policy */}
  <Section title="Previous Insurance">
    <div className="grid grid-cols-2 gap-3">
      <Input label="Previous Insurer" onChange={(e: any) => handleChange("previousPolicy", "previousInsurer", e.target.value)} />
      <Input label="Policy Number" onChange={(e: any) => handleChange("previousPolicy", "previousPolicyNumber", e.target.value)} />
      <Input label="Start Date" type="date" onChange={(e: any) => handleChange("previousPolicy", "previousStartDate", e.target.value)} />
      <Input label="End Date" type="date" onChange={(e: any) => handleChange("previousPolicy", "previousEndDate", e.target.value)} />
      <Input label="NCB %" onChange={(e: any) => handleChange("previousPolicy", "ncbPercentage", e.target.value)} />
    </div>

    <Checkbox
      label="Claim made in last year"
      checked={formData.previousPolicy.isClaimedLastYear}
      onChange={(e: any) =>
        handleChange("previousPolicy", "isClaimedLastYear", e.target.checked)
      }
    />
  </Section>

  {/* Submit */}
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
