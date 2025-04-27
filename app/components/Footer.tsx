"use client";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white py-8 mt-20">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center space-y-2 text-center">
        <p className="text-lg font-semibold">Contact Information</p>
        <p>Govindpur: +91 7004909702</p>
        <p>Sakchi: +91 8210622969</p>
        <p>Telco: +91 8210622969</p>
        <p className="mt-2">Email: ashish.mishra0717@gmail.com</p>
        <p className="text-sm mt-2 text-gray-300">&copy; {new Date().getFullYear()} Dr. Jha Homeo Clinic. All rights reserved.</p>
      </div>
    </footer>
  );
}
