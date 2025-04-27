import { useState, useEffect } from "react";
import AppointmentForm from "../components/AppointmentForm";
import AppointmentList from "../components/AppointmentList";
import SuccessPopup from "../components/SuccessPopup";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

export default function Home() {
  const [appointments, setAppointments] = useState<Record<string, { name: string; date: string }[]>>({
    Govindpur: [],
    Sakchi: [],
    Telco: [],
  });
  const [showPopup, setShowPopup] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [dateSelected, setDateSelected] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("appointments");
    if (stored) setAppointments(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const handleSubmit = (name: string, date: string, location: string) => {
    setAppointments((prev) => ({
      ...prev,
      [location]: [...(prev[location] || []), { name, date }],
    }));
    setDateSelected(date);
    setShowPopup(true);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="mt-10">
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold text-center text-green-800 mb-6"
        >
          Book an Appointment - Dr Jha Homeo Clinic
        </motion.h1>
        <AppointmentForm onSubmit={handleSubmit} />
        <AppointmentList appointments={appointments} />
        {confetti && <Confetti />}
        <SuccessPopup show={showPopup} onClose={() => setShowPopup(false)} date={dateSelected} />
      </div>
      <Footer />
    </div>
  );
}
