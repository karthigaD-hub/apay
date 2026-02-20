import { useNavigate } from "react-router-dom";
import banner from "../assets/blue-banner.png";

const BottomNav = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center z-50">
      <div className="relative w-[390px]">

        <img src={banner} alt="Bottom Nav" className="w-full" />

        {/* Home */}
        <button
          className="absolute left-6 bottom-4 w-24 h-12"
          onClick={() => navigate("/")}
        />

        {/* Center Button */}
        <button
          className="absolute left-1/2 -translate-x-1/2 bottom-8 w-16 h-16 rounded-full"
          onClick={() => navigate("/pay")}
        />

        {/* Repayment */}
        <button
          className="absolute right-6 bottom-4 w-28 h-12"
          onClick={() => navigate("/repayment-history")}
        />

      </div>
    </div>
  );
};

export default BottomNav;
