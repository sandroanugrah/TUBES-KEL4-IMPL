import React from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

function Konten() {
  return (
    <div className="w-full p-6 h-screen bg-cover bg-center bg-no-repeat bg-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-[#1e2a3d] text-white p-4 rounded-lg shadow-md">
          <h5 className="text-xl font-bold">Total Admin</h5>
          <h6 className="text-lg mt-2">5 Orang</h6>
        </div>

        <div className="bg-[#2a3c5e] text-white p-4 rounded-lg shadow-md">
          <h5 className="text-xl font-bold">Total Penghuni</h5>
          <h6 className="text-lg mt-2">15 Orang</h6>
        </div>

        <div className="bg-[#264653] text-white p-4 rounded-lg shadow-md">
          <h5 className="text-xl font-bold">Total Kamar</h5>
          <h6 className="text-lg mt-2">45 Kamar</h6>
        </div>

        {/* Card below */}
        <div className="bg-[#e76f51] text-white p-4 rounded-lg shadow-md">
          <h5 className="text-xl font-bold">Kamar Berisi</h5>
          <h6 className="text-lg mt-2">30 Kamar</h6>
        </div>

        <div className="bg-[#f4a261] text-white p-4 rounded-lg shadow-md">
          <h5 className="text-xl font-bold">Kamar Kosong</h5>
          <h6 className="text-lg mt-2">15 Kamar</h6>
        </div>
      </div>
    </div>
  );
}

export default Konten;
