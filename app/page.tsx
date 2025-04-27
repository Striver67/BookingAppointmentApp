"use client";

import { useState, useEffect } from "react";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";
import SuccessPopup from "./components/SuccessPopup";
import Footer from "./components/Footer";
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
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-green-50 to-green-100">
      <div className="pt-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-center text-green-800 mb-10"
        >
          Dr. Jha Homeo Clinic
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto px-4"
        >
          <AppointmentForm onSubmit={handleSubmit} />
          <AppointmentList appointments={appointments} />
        </motion.div>

        {confetti && <Confetti />}
        <SuccessPopup show={showPopup} onClose={() => setShowPopup(false)} date={dateSelected} />
      </div>

      <Footer />
    </div>
  );
}
