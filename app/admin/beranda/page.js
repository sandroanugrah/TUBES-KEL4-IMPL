"use client";
import React from "react";
import { useRouter } from "next/navigation";
// Komponen
import Sidebar from "@/components/sidebar";
import Konten from "@/app/admin/beranda/components/konten";

const DataBeranda = () => {
  const pengarah = useRouter();

  return (
    <div className="flex">
      <Sidebar pengarah={pengarah} />
      <Konten />
    </div>
  );
};

export default DataBeranda;
