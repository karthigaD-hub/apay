import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UserDetails } from "@/pages/IndusIndFlow";

interface Props {
  onNext: (details: UserDetails) => void;
}

const initialDetails: UserDetails = {
  fullName: "", email: "", phone: "", dob: "", address: "", city: "", state: "", pincode: "",
  vehicleMake: "", vehicleModel: "", vehicleYear: "", registrationNo: "", engineNo: "",
  chassisNo: "", fuelType: "Petrol", previousPolicyNo: "",
};

const UserDetailsForm = ({ onNext }: Props) => {
  const [form, setForm] = useState<UserDetails>(initialDetails);
  const [errors, setErrors] = useState<Partial<Record<keyof UserDetails, string>>>({});

  const update = (key: keyof UserDetails, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Invalid email";
    if (!form.phone.match(/^\d{10}$/)) e.phone = "Enter 10 digit number";
    if (!form.dob) e.dob = "Required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.state.trim()) e.state = "Required";
    if (!form.pincode.match(/^\d{6}$/)) e.pincode = "Enter 6 digit pincode";
    if (!form.vehicleMake.trim()) e.vehicleMake = "Required";
    if (!form.vehicleModel.trim()) e.vehicleModel = "Required";
    if (!form.vehicleYear.trim()) e.vehicleYear = "Required";
    if (!form.registrationNo.trim()) e.registrationNo = "Required";
    if (!form.engineNo.trim()) e.engineNo = "Required";
    if (!form.chassisNo.trim()) e.chassisNo = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onNext(form);
  };

  const Field = ({ label, field, type = "text", placeholder = "" }: { label: string; field: keyof UserDetails; type?: string; placeholder?: string }) => (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-foreground">{label}</Label>
      <Input
        type={type}
        value={form[field]}
        onChange={(e) => update(field, e.target.value)}
        placeholder={placeholder}
        className={`h-11 text-sm ${errors[field] ? "border-destructive" : ""}`}
      />
      {errors[field] && <p className="text-[11px] text-destructive">{errors[field]}</p>}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground">Personal Details</h2>
        <p className="text-xs text-muted-foreground mt-1">Enter your personal information</p>
      </div>
      <div className="apay-card p-4 space-y-4">
        <Field label="Full Name" field="fullName" placeholder="Enter full name" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Email" field="email" type="email" placeholder="email@example.com" />
          <Field label="Phone" field="phone" type="tel" placeholder="10 digit number" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Date of Birth" field="dob" type="date" />
          <Field label="Pincode" field="pincode" placeholder="6 digit pincode" />
        </div>
        <Field label="Address" field="address" placeholder="Full address" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="City" field="city" placeholder="City" />
          <Field label="State" field="state" placeholder="State" />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-foreground">Vehicle Details</h2>
        <p className="text-xs text-muted-foreground mt-1">Enter vehicle registration info</p>
      </div>
      <div className="apay-card p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Vehicle Make" field="vehicleMake" placeholder="e.g. Maruti" />
          <Field label="Vehicle Model" field="vehicleModel" placeholder="e.g. Swift" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Year of Manufacture" field="vehicleYear" placeholder="e.g. 2023" />
          <Field label="Registration No" field="registrationNo" placeholder="e.g. MH01AB1234" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Engine No" field="engineNo" placeholder="Engine number" />
          <Field label="Chassis No" field="chassisNo" placeholder="Chassis number" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-foreground">Fuel Type</Label>
            <select
              value={form.fuelType}
              onChange={(e) => update("fuelType", e.target.value)}
              className="w-full h-11 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option>Petrol</option>
              <option>Diesel</option>
              <option>CNG</option>
              <option>Electric</option>
            </select>
          </div>
          <Field label="Previous Policy No" field="previousPolicyNo" placeholder="Optional" />
        </div>
      </div>

      <Button onClick={handleSubmit} className="w-full h-12 text-base font-semibold apay-gradient text-primary-foreground hover:opacity-90">
        Next — Select Coverage
      </Button>
    </motion.div>
  );
};

export default UserDetailsForm;
