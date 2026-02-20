import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, HelpCircle } from "lucide-react";
import futureFirstLogo from "../assets/futurefirst.png";
import "./InsuranceProvider.css";

const providers = [
  {
    id: "indusind",
    name: "IndusInd Insurance",
    logo: "/logos/Indusind.png",
    width: 117,
    height: 43,
    action: "internal" as const,
    path: "/indusind",
  },
  {
    id: "zurich",
    name: "Zurich Kotak",
    logo: "/logos/zurich.png",
    width: 119,
    height: 41,
    action: "external" as const,
    url: "https://insureswift.zurichkotak.com/FIG-GENERAL/#/figpartnerlandingpage?vTokenId=S7D4P1Q",
  },
  {
    id: "tataaig",
    name: "TATA AIG",
    logo: "/logos/tataaig.png",
    width: 70,
    height: 70,
    action: "external" as const,
    url: "https://taig.in/TAGINS/0d135ab",
  },
  {
    id: "bajaj",
    name: "Bajaj Allianz",
    logo: "/logos/bajaj.png",
    width: 104,
    height: 63,
    action: "external" as const,
    url: "https://www.bajajallianz.com/",
  },
];

const InsuranceProviders = () => {
  const navigate = useNavigate();

  const handleClick = (provider: (typeof providers)[0]) => {
    if (provider.action === "internal") {
      navigate(provider.path!);
    } else {
      window.open(provider.url!, "_blank");
    }
  };

  return (
        <div className="min-h-screen bg-black flex justify-center">
      {/* Mobile Frame */}
      <div className="w-[390px] min-h-screen relative overflow-hidden">

        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#bfc7e6] via-[#e6c3cc] to-[#f0b0a8]" />

        {/* Top Curve */}
        <div className="absolute -top-10 -left-10 w-48 h-48 border-t-[6px] border-l-[6px] border-blue-500 rounded-full opacity-80" />

        {/* Bottom Curve */}
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-[#7b7de6] rounded-tl-full opacity-60" />

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
    
          {/* HEADER */}
          <div className="header">
            <div className="header-icons">
              <div className="icon-btn" onClick={() => navigate(-1)}>
                <ArrowLeft size={18} />
              </div>
              <div className="icon-btn">
                <HelpCircle size={18} />
              </div>
            </div>

            <div className="title">Select Insurer</div>
            <div className="subtitle">Choose your insurer</div>
          </div>

          {/* CARD LIST */}
          <div className="card-list">
            {providers.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="card"
                onClick={() => handleClick(provider)}
              >
                <div className="logo-area">
                  <img
                    src={provider.logo}
                    alt={provider.name}
                    style={{
                      width: provider.width,
                      height: provider.height,
                    }}
                  />
                </div>

                <div className="divider" />

                <div className="provider-name">
                  {provider.name}
                </div>
              </motion.div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="footer">
            <div className="note">
              Note: Prices are exclusive of GST
            </div>

            <div className="powered">Powered by</div>

            <img
              src={futureFirstLogo}
              alt="FutureFirst"
              className="future-logo"
            />

            <div className="company-details">
              <strong>FutureFirst Insurance Broking Pvt. Ltd.</strong><br />
              Registration No. 548, IRDAI Direct Broker (Life & General)<br />
              Valid till 26/01/2028, CIN - U66000WB2008PTC124515
            </div>

            <div className="terms">Terms & Conditions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceProviders;