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
};

/* ✅ MOVE FIELD COMPONENT OUTSIDE */
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
    <Label className="text-xs font-medium text-foreground">{label}</Label>
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`h-11 text-sm ${error ? "border-destructive" : ""}`}
    />
    {error && <p className="text-[11px] text-destructive">{error}</p>}
  </div>
);

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

    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "Invalid email";
    if (!form.phone.match(/^\d{10}$/))
      e.phone = "Enter 10 digit number";
    if (!form.dob) e.dob = "Required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.state.trim()) e.state = "Required";
    if (!form.pincode.match(/^\d{6}$/))
      e.pincode = "Enter 6 digit pincode";
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* PERSONAL DETAILS */}
      <div>
        <h2 className="text-lg font-bold text-foreground">
          Personal Details
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Enter your personal information
        </p>
      </div>

      <div className="apay-card p-4 space-y-4">
        <Field
          label="Full Name"
          value={form.fullName}
          error={errors.fullName}
          placeholder="Enter full name"
          onChange={(val) => update("fullName", val)}
        />

        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Email"
            type="email"
            value={form.email}
            error={errors.email}
            placeholder="email@example.com"
            onChange={(val) => update("email", val)}
          />
          <Field
            label="Phone"
            type="tel"
            value={form.phone}
            error={errors.phone}
            placeholder="10 digit number"
            onChange={(val) => update("phone", val)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Date of Birth"
            type="date"
            value={form.dob}
            error={errors.dob}
            onChange={(val) => update("dob", val)}
          />
          <Field
            label="Pincode"
            value={form.pincode}
            error={errors.pincode}
            placeholder="6 digit pincode"
            onChange={(val) => update("pincode", val)}
          />
        </div>

        <Field
          label="Address"
          value={form.address}
          error={errors.address}
          placeholder="Full address"
          onChange={(val) => update("address", val)}
        />

        <div className="grid grid-cols-2 gap-3">
          <Field
            label="City"
            value={form.city}
            error={errors.city}
            placeholder="City"
            onChange={(val) => update("city", val)}
          />
          <Field
            label="State"
            value={form.state}
            error={errors.state}
            placeholder="State"
            onChange={(val) => update("state", val)}
          />
        </div>
      </div>

      {/* VEHICLE DETAILS */}
      <div>
        <h2 className="text-lg font-bold text-foreground">
          Vehicle Details
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Enter vehicle registration info
        </p>
      </div>

      <div className="apay-card p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Vehicle Make"
            value={form.vehicleMake}
            error={errors.vehicleMake}
            placeholder="e.g. Maruti"
            onChange={(val) => update("vehicleMake", val)}
          />
          <Field
            label="Vehicle Model"
            value={form.vehicleModel}
            error={errors.vehicleModel}
            placeholder="e.g. Swift"
            onChange={(val) => update("vehicleModel", val)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Year of Manufacture"
            value={form.vehicleYear}
            error={errors.vehicleYear}
            placeholder="e.g. 2023"
            onChange={(val) => update("vehicleYear", val)}
          />
          <Field
            label="Registration No"
            value={form.registrationNo}
            error={errors.registrationNo}
            placeholder="e.g. MH01AB1234"
            onChange={(val) => update("registrationNo", val)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Engine No"
            value={form.engineNo}
            error={errors.engineNo}
            placeholder="Engine number"
            onChange={(val) => update("engineNo", val)}
          />
          <Field
            label="Chassis No"
            value={form.chassisNo}
            error={errors.chassisNo}
            placeholder="Chassis number"
            onChange={(val) => update("chassisNo", val)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-foreground">
              Fuel Type
            </Label>
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

          <Field
            label="Previous Policy No"
            value={form.previousPolicyNo}
            error={errors.previousPolicyNo}
            placeholder="Optional"
            onChange={(val) => update("previousPolicyNo", val)}
          />
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full h-12 text-base font-semibold apay-gradient text-primary-foreground hover:opacity-90"
      >
        Next — Select Coverage
      </Button>
    </motion.div>
  );
};

export default UserDetailsForm;
