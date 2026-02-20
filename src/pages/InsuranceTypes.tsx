import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, HelpCircle } from "lucide-react";

import healthImg from "../assets/health.png";
import bikeImg from "../assets/bike.png";
import cyberImg from "../assets/cyber.png";
import fireImg from "../assets/fire.png";
import futureFirstLogo from "../assets/futurefirst.png";
import companyDetailsImg from "../assets/companyDetails.png";

const InsuranceTypes = () => {
  const navigate = useNavigate();

  const categories = [
    { img: healthImg, route: null },
    { img: bikeImg, route: "/insurance" },
    { img: cyberImg, route: null },
    { img: fireImg, route: null },
  ];

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

          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 pt-10 pb-2">
            <ArrowLeft
              className="w-6 h-6 cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <HelpCircle className="w-5 h-5" />
          </div>

          {/* Title */}
          <div className="text-center mt-2 mb-6">
            <h2 className="text-blue-600 font-semibold text-lg">
              Select an Insurance Category
            </h2>
            <p className="text-xs text-gray-700">Choose category</p>
          </div>

          {/* Category Cards */}
          <div className="flex-1 px-5 space-y-5">
            {categories.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => item.route && navigate(item.route)}
                className={`rounded-2xl shadow-lg overflow-hidden
                  ${item.route ? "cursor-pointer active:scale-95" : ""}
                `}
              >
                <img
                  src={item.img}
                  alt="category"
                  className="w-full h-[85px] object-contain"
                />
              </motion.div>
            ))}
          </div>

          {/* Footer */}
<div className="flex flex-col items-center pb-6 mt-6 px-6 text-center">

  {/* Powered by */}
  <p className="text-[11px] text-gray-700 mb-1">
    Powered by
  </p>

  {/* FutureFirst Logo */}
  <img
    src={futureFirstLogo}
    alt="FutureFirst"
    className="w-[170px] object-contain mb-2"
  />

  {/* Company Details Text */}
  <p className="text-[11px] text-gray-800 leading-tight">
    FutureFirst Insurance Broking Pvt. Ltd.
  </p>
  <p className="text-[10px] text-gray-700 leading-tight">
    Registration No. 548, IRDA Direct Broker (Life & General)
  </p>
  <p className="text-[10px] text-gray-700 leading-tight">
    Valid till 26/01/2028, CIN - U66000WB2008PTC124515
  </p>

  {/* Terms */}
  <p className="text-[10px] text-blue-600 underline mt-1 cursor-pointer">
    Terms & Conditions
  </p>

</div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceTypes;