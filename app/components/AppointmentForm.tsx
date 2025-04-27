"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FormProps {
  onSubmit: (name: string, date: string, location: string) => void;
}

const AppointmentForm: React.FC<FormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("today");
  const [location, setLocation] = useState("Govindpur");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, date, location);
    setName("");
    setDate("today");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-8 mb-10 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-2">
        <label htmlFor="name" className="block text-lg font-bold text-gray-900">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 font-semibold text-gray-800"
          placeholder="Enter your name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="date" className="block text-lg font-bold text-gray-900">
          Select Date
        </label>
        <select
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 font-semibold text-gray-800"
        >
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="location" className="block text-lg font-bold text-gray-900">
          Select Location
        </label>
        <select
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 font-semibold text-gray-800"
        >
          <option value="Govindpur">Govindpur</option>
          <option value="Sakchi">Sakchi</option>
          <option value="Telco">Telco</option>
        </select>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full py-3 bg-green-600 text-white text-lg font-bold rounded-lg hover:bg-green-700 transition-all"
      >
        Book Appointment
      </motion.button>
    </motion.form>
  );
};

export default AppointmentForm;
