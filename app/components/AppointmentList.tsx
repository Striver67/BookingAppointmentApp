"use client";

import { useEffect } from "react";

interface AppointmentListProps {
  appointments: Record<string, { name: string; date: string }[]>; // Adjust the type if needed
}

function AppointmentList({ appointments }: AppointmentListProps) {
  useEffect(() => {
    const updateAppointmentsForNewDay = () => {
      const now = new Date();
      const currentDate = now.toISOString().split("T")[0]; // YYYY-MM-DD format
      const storedAppointments = localStorage.getItem("appointments");

      // Initialize localStorage data if not available
      if (!storedAppointments) {
        const emptyData = { date: currentDate, Govindpur: [], Sakchi: [], Telco: [] };
        localStorage.setItem("appointments", JSON.stringify(emptyData));
        return;
      }

      const appointmentsData = JSON.parse(storedAppointments);

      // Check if the stored data needs to be updated
      if (appointmentsData.date !== currentDate) {
        // Update appointments for each location
        Object.keys(appointmentsData).forEach((location) => {
          if (location === "date") return; // Skip the date key

          // Ensure locationAppointments is an array
          const locationAppointments = Array.isArray(appointmentsData[location])
            ? appointmentsData[location]
            : [];

          // Get tomorrow's appointments
          const tomorrowAppointments = locationAppointments.filter(
            (a) => a.date === "tomorrow"
          );

          // Set today's appointments to tomorrow's appointments (shifted)
          appointmentsData[location] = tomorrowAppointments.map((a) => ({
            ...a,
            date: "today", // Change date to "today"
          }));
        });

        // Update the date and save back to localStorage
        appointmentsData.date = currentDate;
        localStorage.setItem("appointments", JSON.stringify(appointmentsData));
      }
    };

    // Run the update immediately on mount
    updateAppointmentsForNewDay();

    // Check time every minute to trigger update at midnight
    const checkMidnight = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Trigger update at approximately 00:00
      if (hours === 0 && minutes === 0) {
        updateAppointmentsForNewDay();
      }
    };

    // Set interval to check time every minute
    const intervalId = setInterval(checkMidnight, 60 * 1000); // Every 60 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="space-y-12">
      {["Govindpur", "Sakchi", "Telco"].map((location) => (
        <div key={location}>
          <h2 className="text-3xl font-bold text-green-700 mb-6">{location} Bookings</h2>

          {/* Today's Appointments */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Today</h3>
            {appointments[location]?.filter((a) => a.date === "today").length > 0 ? (
              <ul className="space-y-4">
                {appointments[location]
                  .filter((a) => a.date === "today")
                  .map((appointment, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                    >
                      <div className="text-gray-900 font-medium">
                        {index + 1}. {appointment.name}
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic">No bookings for today.</p>
            )}
          </div>

          {/* Tomorrow's Appointments */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Tomorrow</h3>
            {appointments[location]?.filter((a) => a.date === "tomorrow").length > 0 ? (
              <ul className="space-y-4">
                {appointments[location]
                  .filter((a) => a.date === "tomorrow")
                  .map((appointment, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                    >
                      <div className="text-gray-900 font-medium">
                        {index + 1}. {appointment.name}
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic">No bookings for tomorrow.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AppointmentList;
