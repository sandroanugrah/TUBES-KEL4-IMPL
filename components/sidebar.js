import React, { useState } from "react";
import { FaHome, FaRestroom, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { IoBed } from "react-icons/io5";
import { RiAdminFill, RiSettings4Fill } from "react-icons/ri";

function Sidebar({ pengarah }) {
  const [pengaturanTerbuka, setPengaturanTerbuka] = useState(false);

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
            onClick={() => pengarah.push("/beranda")}
          >
            <FaHome className="text-xl" />
            Beranda
          </li>
          <li
            className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded"
            onClick={() => pengarah.push("/dataAdmin")}
          >
            <RiAdminFill className="text-xl" />
            Data Admin
          </li>
          <li
            className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded"
            onClick={() => pengarah.push("/dataKamar")}
          >
            <IoBed className="text-xl" />
            Data Kamar
          </li>
          <li
            className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded"
            onClick={() => pengarah.push("/dataPenghuni")}
          >
            <FaRestroom className="text-xl" />
            Data Penghuni
          </li>

          {/* Pengaturan */}
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
                onClick={() => pengarah.push("/profil")}
              >
                <FaUserCircle className="text-lg" />
                Profil
              </li>
              <li
                className="flex items-center gap-3 mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded"
                onClick={() => pengarah.push("/keluar")}
              >
                <FaSignOutAlt className="text-lg" />
                Keluar
              </li>
            </ul>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
