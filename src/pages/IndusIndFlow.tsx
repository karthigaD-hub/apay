import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import StepIndicator from "@/components/StepIndicator";
import UserDetailsForm from "@/components/indusind/UserDetailsForm";
import CoverageSelection from "@/components/indusind/CoverageSelection";
import MotorPolicyDetails from "@/components/indusind/MotorPolicyDetails";
import TaxComponents from "@/components/indusind/TaxComponents";
import PricingQuote from "@/components/indusind/PricingQuote";
import PaymentPage from "@/components/indusind/PaymentPage";

export interface UserDetails {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  registrationNo: string;
  engineNo: string;
  chassisNo: string;
  fuelType: string;
  previousPolicyNo: string;
}

const STEP_LABELS = ["Details", "Coverage", "Policy", "Tax", "Quote", "Payment"];

const IndusIndFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [selectedCoverages, setSelectedCoverages] = useState<string[]>([]);

  const handleNext = () => setCurrentStep((s) => Math.min(s + 1, 6));
  const handleBack = () => {
    if (currentStep === 1) {
      navigate("/insurance");
    } else {
      setCurrentStep((s) => s - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="apay-gradient text-primary-foreground px-4 pt-12 pb-4 rounded-b-2xl">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={handleBack}
            className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">IndusInd Insurance</h1>
        </div>
      </header>

      {/* Step Indicator */}
      <div className="px-4 py-4 max-w-2xl mx-auto">
        <StepIndicator currentStep={currentStep} totalSteps={6} labels={STEP_LABELS} />
      </div>

      {/* Step Content */}
      <main className="px-4 pb-8 max-w-2xl mx-auto">
        {currentStep === 1 && (
          <UserDetailsForm
            onNext={(details) => {
              setUserDetails(details);
              handleNext();
            }}
          />
        )}
        {currentStep === 2 && (
          <CoverageSelection
            selectedCoverages={selectedCoverages}
            onSelectionChange={setSelectedCoverages}
            onNext={handleNext}
          />
        )}
        {currentStep === 3 && <MotorPolicyDetails onNext={handleNext} />}
        {currentStep === 4 && <TaxComponents onNext={handleNext} />}
        {currentStep === 5 && <PricingQuote onNext={handleNext} />}
        {currentStep === 6 && <PaymentPage userDetails={userDetails} />}
      </main>
    </div>
  );
};

export default IndusIndFlow;
