"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Komponen
import Konten from "@/app/dataAdmin/components/konten";
import Sidebar from "@/components/sidebar";

const Admin = () => {
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

export default Admin;
