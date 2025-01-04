"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Komponen
import Sidebar from "@/components/sidebar";
import Konten from "@/app/admin/dataPembayaran/components/konten";

const DataPembayaran = () => {
  const pengarah = useRouter();

  return (
    <div className="flex">
      <ToastContainer />
      <Sidebar pengarah={pengarah} />
      <div className="w-full">
        <Konten />
      </div>
    </div>
  );
};

export default DataPembayaran;
