import { useNavigate } from "react-router-dom";
import bg from "../assets/insurance-bg.png";
import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import card3 from "../assets/card3.png";
import card4 from "../assets/card4.png";

const InsuranceSection = () => {
  const navigate = useNavigate();

  return (
    <div className="px-3 mt-4">
      <div
        className="rounded-2xl w-full shadow-md p-3"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "100% auto",     // prevent cropping
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",  
          minHeight: "150px",
        }}
      >
       {/* Cards placed inside background */}
        <div className="pt-10">
          <div className="grid grid-cols-4 gap-2">
            <img
              src={card1}
              alt="Insurance 1"
              className="w-[70px] h-auto rounded-lg"
            />

            <img
              src={card2}
              alt="Insurance 2"
              className="w-[70px] h-auto rounded-lg cursor-pointer"
              onClick={() => navigate("/insurance-types")}
            />

            <img
              src={card3}
              alt="Insurance 3"
              className="w-[70px] h-auto rounded-lg"
            />

            <img
              src={card4}
              alt="Insurance 4"
              className="w-[70px] h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceSection;