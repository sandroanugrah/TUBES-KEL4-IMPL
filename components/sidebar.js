import React, { useState } from "react";
import {
  FaHome,
  FaRestroom,
  FaUserCircle,
  FaSignOutAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { IoBed } from "react-icons/io5";
import { RiAdminFill, RiSettings4Fill } from "react-icons/ri";
// Hooks
import useKeluarAkun from "@/hooks/useKeluarAkun";

function Sidebar({ pengarah }) {
  const [pengaturanTerbuka, setPengaturanTerbuka] = useState(false);
  const { keluar, memuat } = useKeluarAkun();

  const togglePengaturan = () => {
    setPengaturanTerbuka(!pengaturanTerbuka);
  };

  return (
    <div className="h-screen bg-gray-800 text-white w-64 flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">Alizar Kost</h1>
      <nav className="flex-1">
        <ul>
          <li
            className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded"
            onClick={() => pengarah.push("/admin/beranda")}
          >
            <FaHome className="text-xl" />
            Beranda
          </li>
          <li
            className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded"
            onClick={() => pengarah.push("/admin/dataAdmin")}
          >
            <RiAdminFill className="text-xl" />
            Data Admin
          </li>
          <li
            className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded"
            onClick={() => pengarah.push("/admin/dataKamar")}
          >
            <IoBed className="text-xl" />
            Data Kamar
          </li>
          <li
            className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded"
            onClick={() => pengarah.push("/admin/dataPenghuni")}
          >
            <FaRestroom className="text-xl" />
            Data Penghuni
          </li>
          <li
            className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded"
            onClick={() => pengarah.push("/admin/dataPembayaran")}
          >
            <FaMoneyBillWave className="text-xl" />
            Tagihan Penghuni
          </li>

          <li
            className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded"
            onClick={togglePengaturan}
          >
            <div className="flex items-center gap-3">
              <RiSettings4Fill className="text-xl" />
              Pengaturan
            </div>
            <span>{pengaturanTerbuka ? "▲" : "▼"}</span>
          </li>
          {pengaturanTerbuka && (
            <ul className="ml-6">
              <li
                className="flex items-center gap-3 mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded"
                onClick={() => pengarah.push("/admin/dataProfil")}
              >
                <FaUserCircle className="text-lg" />
                Profil
              </li>
              <li
                className="flex items-center gap-3 mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded"
                onClick={keluar}
              >
                <FaSignOutAlt className="text-lg" />
                {memuat ? "Keluar..." : "Keluar"}{" "}
              </li>
            </ul>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
