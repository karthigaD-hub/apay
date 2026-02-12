import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, ChevronRight } from "lucide-react";

const providers = [
  {
    id: "indusind",
    name: "IndusInd Insurance",
    description:
      "Comprehensive motor insurance with flexible coverage options and instant policy issuance.",
    action: "internal" as const,
    path: "/indusind",
    badge: "Recommended",
    logo: "/logos/Indusind.png",
  },
  {
    id: "zurich",
    name: "Zurich Kotak",
    description:
      "General insurance solutions powered by Zurich Kotak partnership.",
    action: "external" as const,
    url: "https://insureswift.zurichkotak.com/FIG-GENERAL/#/figpartnerlandingpage?vTokenId=S7D4P1Q",
    badge: null,
    logo: "/logos/zurich.png",
  },
  {
    id: "tataaig",
    name: "TATA AIG",
    description:
      "Reliable insurance solutions from TATA Group with strong claim settlement ratio.",
    action: "external" as const,
    url: "https://taig.in/TAGINS/0d135ab",
    badge: "Popular",
    logo: "/logos/tataaig.png",
  },
  {
    id: "bajaj",
    name: "Bajaj Allianz",
    description:
      "Trusted insurance from one of India's leading providers.",
    action: "external" as const,
    url: "https://www.bajajallianz.com/",
    badge: null,
    logo: "/logos/bajaj.png",
  },
 
];

const InsuranceProviders = () => {
  const navigate = useNavigate();

  const handleProviderClick = (provider: (typeof providers)[0]) => {
    if (provider.action === "internal") {
      navigate(provider.path!);
    } else {
      window.open(provider.url!, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="apay-gradient text-primary-foreground px-4 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Insurance</h1>
        </div>
        <p className="text-primary-foreground/70 text-sm">
          Choose your insurance provider to get started
        </p>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto w-full">
        <div className="space-y-4">
          {providers.map((provider, index) => (
            <motion.button
              key={provider.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              onClick={() => handleProviderClick(provider)}
              className="w-full apay-card-hover p-5 flex items-center gap-4 text-left"
            >
              {/* Logo */}
              <div className="w-14 h-14 rounded-2xl bg-white shadow flex items-center justify-center flex-shrink-0 p-2">
                <img
                  src={provider.logo}
                  alt={provider.name}
                  className="object-contain w-full h-full"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-foreground">
                    {provider.name}
                  </h3>
                  {provider.badge && (
                    <span className="text-[9px] font-bold bg-success text-success-foreground px-2 py-0.5 rounded-full">
                      {provider.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {provider.description}
                </p>
              </div>

              <div className="flex-shrink-0 text-muted-foreground">
                {provider.action === "external" ? (
                  <ExternalLink className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default InsuranceProviders;
