import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UserDetails } from "@/pages/IndusIndFlow";

interface Props {
  onNext: (details: UserDetails) => void;
}

/* ---------------- INITIAL DATA ---------------- */
const initialDetails: UserDetails = {
  salutation: "",
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  address: "",
  city: "",
  state: "",
  pincode: "",

  vehicleMake: "",
  vehicleModel: "",
  vehicleYear: "",
  registrationNo: "",
  engineNo: "",
  chassisNo: "",
  fuelType: "Petrol",

  previousPolicyNo: "",
  previousInsurer: "",
  policyExpiryDate: "",
};

/* ---------------- FIELD COMPONENT ---------------- */
interface FieldProps {
  label: string;
  value: string;
  error?: string;
  type?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const Field = ({
  label,
  value,
  error,
  type = "text",
  placeholder = "",
  onChange,
}: FieldProps) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-medium">{label}</Label>
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`h-11 ${error ? "border-red-500" : ""}`}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

/* ---------------- MAIN COMPONENT ---------------- */
const UserDetailsForm = ({ onNext }: Props) => {
  const [form, setForm] = useState<UserDetails>(initialDetails);
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserDetails, string>>
  >({});

  const update = (key: keyof UserDetails, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};

    if (!form.fullName) e.fullName = "Required";
    if (!form.email) e.email = "Required";
    if (!form.phone.match(/^\d{10}$/))
      e.phone = "Enter valid number";
    if (!form.registrationNo) e.registrationNo = "Required";
    if (!form.engineNo) e.engineNo = "Required";
    if (!form.chassisNo) e.chassisNo = "Required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onNext(form);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      
      {/* PERSONAL DETAILS */}
      <div className="apay-card p-4 space-y-4">
        <h2 className="font-bold text-lg">Personal Details</h2>

        {/* Salutation */}
        <div className="space-y-1.5">
          <Label className="text-xs">Salutation</Label>
          <select
            value={form.salutation}
            onChange={(e) => update("salutation", e.target.value)}
            className="w-full h-11 border rounded-md px-3"
          >
            <option value="">Select</option>
            <option>Mr</option>
            <option>Mrs</option>
            <option>Ms</option>
          </select>
        </div>

        <Field
          label="Full Name"
          value={form.fullName}
          error={errors.fullName}
          onChange={(v) => update("fullName", v)}
        />

        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Email"
            value={form.email}
            error={errors.email}
            onChange={(v) => update("email", v)}
          />
          <Field
            label="Phone"
            value={form.phone}
            error={errors.phone}
            onChange={(v) => update("phone", v)}
          />
        </div>

        <Field
          label="DOB"
          type="date"
          value={form.dob}
          onChange={(v) => update("dob", v)}
        />

        <Field
          label="Address"
          value={form.address}
          onChange={(v) => update("address", v)}
        />

        <div className="grid grid-cols-2 gap-3">
          <Field label="City" value={form.city} onChange={(v) => update("city", v)} />
          <Field label="State" value={form.state} onChange={(v) => update("state", v)} />
        </div>

        <Field
          label="Pincode"
          value={form.pincode}
          onChange={(v) => update("pincode", v)}
        />
      </div>

      {/* VEHICLE DETAILS */}
      <div className="apay-card p-4 space-y-4">
        <h2 className="font-bold text-lg">Vehicle Details</h2>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Make" value={form.vehicleMake} onChange={(v) => update("vehicleMake", v)} />
          <Field label="Model" value={form.vehicleModel} onChange={(v) => update("vehicleModel", v)} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Year" value={form.vehicleYear} onChange={(v) => update("vehicleYear", v)} />
          <Field label="Registration No" value={form.registrationNo} error={errors.registrationNo} onChange={(v) => update("registrationNo", v)} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Engine No" value={form.engineNo} error={errors.engineNo} onChange={(v) => update("engineNo", v)} />
          <Field label="Chassis No" value={form.chassisNo} error={errors.chassisNo} onChange={(v) => update("chassisNo", v)} />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Fuel Type</Label>
          <select
            value={form.fuelType}
            onChange={(e) => update("fuelType", e.target.value)}
            className="w-full h-11 border rounded-md px-3"
          >
            <option>Petrol</option>
            <option>Diesel</option>
            <option>CNG</option>
            <option>Electric</option>
          </select>
        </div>
      </div>

      {/* PREVIOUS POLICY */}
      <div className="apay-card p-4 space-y-4">
        <h2 className="font-bold text-lg">Previous Policy</h2>

        <Field
          label="Previous Policy No"
          value={form.previousPolicyNo}
          onChange={(v) => update("previousPolicyNo", v)}
        />

        <Field
          label="Previous Insurer"
          value={form.previousInsurer}
          onChange={(v) => update("previousInsurer", v)}
        />

        <Field
          label="Policy Expiry Date"
          type="date"
          value={form.policyExpiryDate}
          onChange={(v) => update("policyExpiryDate", v)}
        />
      </div>

      <Button onClick={handleSubmit} className="w-full h-12">
        Next — Select Coverage
      </Button>
    </motion.div>
  );
};

export default UserDetailsForm;