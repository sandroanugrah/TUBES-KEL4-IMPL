import React from "react";
import { Typography } from "@material-tailwind/react";

function InfoProfil({ adminData }) {
  return (
    <div className="bg-gray-100 w-full h-full p-6 rounded-xl">
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Nama Lengkap: {adminData?.Nama_Lengkap || "Tidak Tersedia"}
          </Typography>
        </div>
        <div className="flex-1">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            No Handphone: {adminData?.No_Telepon || "Tidak Tersedia"}
          </Typography>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Nama Pengguna: {adminData?.Nama_Pengguna || "Tidak Tersedia"}
          </Typography>
        </div>
        <div className="flex-1">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Jenis Kelamin: {adminData?.Jenis_Kelamin || "Tidak Tersedia"}
          </Typography>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <Typography className="mb-1 font-[family-name:var(--font-geist-sans)] font-bold text-lg">
            Email: {adminData?.Email || "Tidak Tersedia"}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default InfoProfil;
