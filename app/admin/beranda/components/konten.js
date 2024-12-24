import React from "react";
import { Roboto } from "next/font/google";

// Hooks
import useTampilkanAdmin from "@/hooks/useTampilkanAdmin";
import useTampilkanPenghuni from "@/hooks/useTampilkanPenghuni";
import useTampilkanKamar from "@/hooks/useTampilkanKamar";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

function Konten() {
  const { totalAdmin, sedangMemuatTampilkanAdmin } = useTampilkanAdmin();
  const { totalPenghuni, sedangMemuatTampilkanPenghuni } =
    useTampilkanPenghuni();
  const { totalKamar, sedangMemuatTampilkanKamar } = useTampilkanKamar();

  return (
    <div className="w-full p-6 h-screen bg-cover bg-center bg-no-repeat bg-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-[#1e2a3d] text-white p-4 rounded-lg shadow-md">
          <h5 className="text-xl font-bold">Total Admin</h5>
          <h6 className="text-lg mt-2">
            {sedangMemuatTampilkanAdmin ? "Memuat..." : `${totalAdmin} Orang`}
          </h6>
        </div>

        <div className="bg-[#2a3c5e] text-white p-4 rounded-lg shadow-md">
          <h5 className="text-xl font-bold">Total Penghuni</h5>
          {sedangMemuatTampilkanPenghuni
            ? "Memuat..."
            : `${totalPenghuni} Orang`}
          <h6 className="text-lg mt-2"></h6>
        </div>

        <div className="bg-[#264653] text-white p-4 rounded-lg shadow-md">
          <h5 className="text-xl font-bold">Total Kamar</h5>
          <h6 className="text-lg mt-2">
            {sedangMemuatTampilkanKamar ? "Memuat..." : `${totalKamar} Kamar`}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Konten;
