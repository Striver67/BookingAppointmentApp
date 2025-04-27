"use client"; // Important for client-side usage

import dynamic from "next/dynamic";

// Dynamically import Lottie with ssr: false
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import successAnimation from "@/tick.json"; // Correct import path
import { motion } from "framer-motion";

interface PopupProps {
  show: boolean;
  onClose: () => void;
  date: string;
}

const SuccessPopup: React.FC<PopupProps> = ({ show, onClose, date }) => {
  if (!show) return null; // Agar show false hai toh kuch render mat kar

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl p-8 shadow-lg flex flex-col items-center"
      >
        {/* Tick Animation */}
        <Lottie animationData={successAnimation} loop={false} style={{ height: 150, width: 150 }} />
        
        {/* Success Message */}
        <h2 className="text-2xl font-bold text-green-700 mt-4 text-center">
          Appointment Booked!
        </h2>
        <p className="mt-2 text-gray-600 text-center">
          Your appointment is booked for <span className="font-semibold">{date}</span>.
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          OK
        </button>
      </motion.div>
    </div>
  );
};

export default SuccessPopup;
