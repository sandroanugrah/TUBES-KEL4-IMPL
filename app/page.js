"use client";

import React from "react";
import Image from "next/image";
// Asset IMG
import gambarFotoProfil from "@/assets/img/kamar.jpg";
import gambarBackground from "@/assets/img/kosan.jpg";

// Component
import Memuat from "@/components/memuat";
// Hooks
import useTampilkanKamar from "@/hooks/useTampilkanKamar";

const Page = () => {
  const { daftarKamar, sedangMemuatTampilkanKamar } = useTampilkanKamar();

  return (
    <div
      className="h-screen flex bg-[#2c2c2c] text-white"
      style={{
        backgroundImage: `url(${gambarBackground.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex-1 flex flex-col backdrop-blur-lg">
        <header className="flex justify-between items-center p-4 border-b border-[#8e44ad] bg-black/50">
          <p className="mx-auto text-[#f1c40f] text-xl font-bold">
            Alizar Kost
          </p>
        </header>
        <main className="p-4 flex flex-col gap-5 bg-black/50">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#34495e] p-4 rounded-xl flex items-center justify-center">
              Jumlah Kamar: {daftarKamar.length}
            </div>
            <div className="bg-[#c0392b] p-4 rounded-xl flex items-center justify-center">
              Kamar Terisi:{" "}
              {daftarKamar.filter((kamar) => kamar.Status === "Terisi").length}
            </div>
            <div className="bg-[#58d68d] p-4 rounded-xl flex items-center justify-center">
              Kamar Tersedia:{" "}
              {daftarKamar.filter((kamar) => kamar.Status !== "Terisi").length}
            </div>
          </div>
          <section>
            <h2 className="text-xl font-bold mb-4 text-[#f1c40f]">
              Pilihan Kamar
            </h2>
            {sedangMemuatTampilkanKamar ? (
              <Memuat />
            ) : (
              <div className="grid grid-cols-5 gap-4">
                {daftarKamar.map((kamar, i) => (
                  <div
                    key={kamar.id}
                    className={`p-4 rounded-lg flex flex-col items-center gap-4 ${
                      kamar.terisi
                        ? "bg-[#c0392b] hover:bg-[#e74c3c]"
                        : "bg-[#34495e] hover:bg-[#58d68d]"
                    } transition-colors`}
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={gambarFotoProfil}
                        alt={`Foto kamar ${kamar.Lantai}`}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-1 text-sm">
                      <p>
                        <span className="font-semibold text-[#f1c40f]">
                          Fasilitas:
                        </span>{" "}
                        {kamar.Fasilitas || "Tidak tersedia"}
                      </p>
                      <p>
                        <span className="font-semibold text-[#f1c40f]">
                          Lantai:
                        </span>{" "}
                        {kamar.Lantai}
                      </p>
                      <p>
                        <span className="font-semibold text-[#f1c40f]">
                          No Pintu:
                        </span>{" "}
                        {kamar.No_Pintu}
                      </p>
                      <p>
                        <span className="font-semibold text-[#f1c40f]">
                          Status:
                        </span>{" "}
                        <span
                          className={`${
                            kamar.Status === "Terisi"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {kamar.Status}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Page;
