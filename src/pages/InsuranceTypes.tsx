import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeartbeat, FaCar, FaPlane, FaShieldAlt } from "react-icons/fa";

const InsuranceTypes = () => {
  const navigate = useNavigate();

  const insuranceTypes = [
    { name: "Health Insurance", active: false, icon: <FaHeartbeat className="w-6 h-6 mr-3" /> },
    { name: "Cybersecurity Insurance", active: false, icon: <FaShieldAlt className="w-6 h-6 mr-3" /> },
    { name: "Motor Insurance", active: true, icon: <FaCar className="w-6 h-6 mr-3" /> },
    { name: "Travel Insurance", active: false, icon: <FaPlane className="w-6 h-6 mr-3" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-900 text-white px-6 pt-12 pb-8 rounded-b-3xl text-center">
        <h1 className="text-2xl font-bold mb-2">Select Insurance Type</h1>
        <p className="text-white/80 text-sm">
          Choose the type of insurance you want
        </p>
      </header>

      {/* Insurance Type Buttons */}
      <main className="flex-1 px-4 py-8 max-w-md mx-auto w-full space-y-4">
        {insuranceTypes.map((item, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            onClick={() => item.active && navigate("/insurance")}
            className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl shadow-md text-lg font-medium transition-all
              ${
                item.active
                  ? "bg-blue-900 text-white hover:bg-blue-900"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
          >
            <div className="flex items-center">
              {item.icon}
              <span>{item.name}</span>
            </div>
            {item.active && (
              <span className="text-[10px] font-bold bg-green-500 px-2 py-0.5 rounded-full">
                LIVE
              </span>
            )}
          </motion.button>
        ))}
      </main>
    </div>
  );
};

export default InsuranceTypes;
