import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import StepIndicator from "@/components/StepIndicator";
import UserDetailsForm from "@/components/indusind/UserDetailsForm";
import CoverageSelection from "@/components/indusind/CoverageSelection";
import MotorPolicyDetails from "@/components/indusind/MotorPolicyDetails";
import TaxComponents from "@/components/indusind/TaxComponents";
import PricingQuote from "@/components/indusind/PricingQuote";
import ProposalDetailsForm from "@/components/indusind/ProposalDetailsForm";
import PaymentPage from "@/components/indusind/PaymentPage";

/* ================================
Types
================================ */
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

export interface ProposalDetails {
nomineeName: string;
nomineeRelation: string;
nomineeAge: string;
panNumber: string;
aadharNumber: string;
isFinanced: boolean;
financierName?: string;
}

/* ================================
Step Labels (Mentor Flow)
================================ */
const STEP_LABELS = [
"Details",
"Coverage",
"Policy",
"Tax",
"Quote",
"Proposal",
"Payment",
];

/* ================================
Main Flow Component
================================ */
const InsuranceFlow = () => {
const navigate = useNavigate();

/* Step State */
const [currentStep, setCurrentStep] = useState(1);

/* Data States */
const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
const [selectedCoverages, setSelectedCoverages] = useState<string[]>([]);
const [proposalData, setProposalData] = useState<ProposalDetails | null>(null);

/* Navigation Handlers */
const handleNext = () => {
setCurrentStep((prev) => Math.min(prev + 1, 7));
};

const handleBack = () => {
if (currentStep === 1) {
navigate("/insurance");
} else {
setCurrentStep((prev) => prev - 1);
}
};

return ( <div className="min-h-screen bg-background">
{/* ================= Header ================= */} <header className="apay-gradient text-primary-foreground px-4 pt-12 pb-4 rounded-b-2xl"> <div className="flex items-center gap-3 mb-4"> <button
         onClick={handleBack}
         className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center"
       > <ArrowLeft className="w-5 h-5" /> </button> <h1 className="text-lg font-bold">Bike Insurance</h1> </div> </header>


  {/* ================= Step Indicator ================= */}
  <div className="px-4 py-4 max-w-2xl mx-auto">
    <StepIndicator
      currentStep={currentStep}
      totalSteps={7}
      labels={STEP_LABELS}
    />
  </div>

  {/* ================= Step Content ================= */}
  <main className="px-4 pb-8 max-w-2xl mx-auto">
    {/* Step 1 — User Details */}
    {currentStep === 1 && (
      <UserDetailsForm
        onNext={(details: UserDetails) => {
          setUserDetails(details);
          handleNext();
        }}
      />
    )}

    {/* Step 2 — Coverage */}
    {currentStep === 2 && (
      <CoverageSelection
        selectedCoverages={selectedCoverages}
        onSelectionChange={setSelectedCoverages}
        onNext={handleNext}
      />
    )}

    {/* Step 3 — Premium / Policy */}
    {currentStep === 3 && <MotorPolicyDetails onNext={handleNext} />}

    {/* Step 4 — Tax */}
    {currentStep === 4 && <TaxComponents onNext={handleNext} />}

    {/* Step 5 — Final Quote */}
    {currentStep === 5 && <PricingQuote onNext={handleNext} />}

    {/* Step 6 — Proposal (All XML fields UI here) */}
    {currentStep === 6 && (
      <ProposalDetailsForm
        onSubmit={(data: ProposalDetails) => {
          setProposalData(data);
          handleNext();
        }}
      />
    )}

    {/* Step 7 — Payment */}
    {currentStep === 7 && (
      <PaymentPage
        userDetails={userDetails}
        proposalData={proposalData}
        selectedCoverages={selectedCoverages}
      />
    )}
  </main>
</div>


);
};

export default InsuranceFlow;
