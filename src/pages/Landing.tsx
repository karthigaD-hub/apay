import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  QrCode,
  Wallet,
  Receipt,
  Smartphone,
  Shield,
  CreditCard,
  ArrowRight,
  Bell,
  Search,
  User,
} from "lucide-react";

const menuItems = [
  { icon: QrCode, label: "Scan QR", dummy: true },
  { icon: Wallet, label: "Balance", dummy: true },
  { icon: Receipt, label: "Pay Bills", dummy: true },
  { icon: Smartphone, label: "Recharge", dummy: true },
  { icon: CreditCard, label: "Wallet", dummy: true },
  { icon: Shield, label: "Insurance", dummy: false },
];

const Landing = () => {
  const navigate = useNavigate();

  const handleClick = (item: (typeof menuItems)[0]) => {
    if (!item.dummy) {
      navigate("/insurance");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="apay-gradient text-primary-foreground px-4 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">APAY</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </button>
            <button className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </button>
            <button className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-primary-foreground/10 backdrop-blur rounded-2xl p-4">
          <p className="text-primary-foreground/70 text-sm">Available Balance</p>
          <p className="text-3xl font-bold mt-1">₹24,500.00</p>
          <div className="flex gap-3 mt-4">
            <button className="flex-1 bg-primary-foreground/15 rounded-xl py-2.5 text-sm font-medium flex items-center justify-center gap-2">
              Add Money
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="flex-1 bg-primary-foreground/15 rounded-xl py-2.5 text-sm font-medium flex items-center justify-center gap-2">
              Send Money
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Services Grid */}
      <main className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
        <h2 className="text-lg font-semibold text-foreground mb-4">Services</h2>
        <div className="grid grid-cols-3 gap-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isInsurance = !item.dummy;
            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                onClick={() => handleClick(item)}
                className={`apay-card-hover p-4 flex flex-col items-center gap-3 ${
                  isInsurance ? "ring-2 ring-secondary" : "opacity-60"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    isInsurance
                      ? "apay-gradient text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span
                  className={`text-xs font-medium ${
                    isInsurance ? "text-secondary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
                {isInsurance && (
                  <span className="text-[9px] font-bold bg-success text-success-foreground px-2 py-0.5 rounded-full">
                    LIVE
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[
              { label: "Mobile Recharge", amount: "-₹299", time: "Today, 2:30 PM" },
              { label: "Wallet Top-up", amount: "+₹5,000", time: "Yesterday" },
              { label: "Electricity Bill", amount: "-₹1,240", time: "Feb 10" },
            ].map((tx) => (
              <div key={tx.label} className="apay-card p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.label}</p>
                  <p className="text-xs text-muted-foreground">{tx.time}</p>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    tx.amount.startsWith("+") ? "text-success" : "text-foreground"
                  }`}
                >
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
