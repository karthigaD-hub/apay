import { Menu, Globe, Bell, Headphones } from "lucide-react";
import logo from "../assets/apay-logo.png";
import emiBanner from "../assets/emi-banner.png";
import applyLoan from "../assets/apply-loan.png";
import loanCard from "../assets/loan-card.png";
import adBanner from "../assets/ad.png";
import InsuranceSection from "../components/InsuranceSection";
import BottomNav from "../components/BottomNav";
import RechargeSection from "../components/RechargeSection";

const Landing = () => {
  return (
    <div className="bg-[#1D3348] min-h-screen flex justify-center">
      
      {/* Mobile Container */}
      <div className="w-[390px] relative pb-28">

        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 text-white">
          <Menu size={22} />

          <img src={logo} alt="APAY" className="h-8 object-contain" />

          <div className="flex items-center gap-4">
            <Globe size={20} />
            <Bell size={20} />
            <Headphones size={20} />
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="px-3 space-y-4 pb-6">

          {/* EMI Banner */}
          <img
            src={emiBanner}
            alt="EMI Banner"
            className="w-full rounded-2xl"
          />

          {/* Apply Loan */}
          <img
            src={applyLoan}
            alt="Apply Loan"
            className="w-full"
          />

          {/* Loan Card */}
          <img
            src={loanCard}
            alt="Loan Card"
            className="w-full rounded-2xl"
          />

          {/* Insurance Section */}
          <InsuranceSection />
          <img
    src={adBanner}
    alt="Shopping Ad"
    className="w-full rounded-2xl"
  />
          {/* Recharge Section */}
          <RechargeSection />

        </main>

        {/* Bottom Navigation */}
        <BottomNav />

      </div>
    </div>
  );
};

export default Landing;