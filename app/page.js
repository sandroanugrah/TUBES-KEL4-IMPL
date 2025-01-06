"use client";

import React from "react";
import Image from "next/image";
import { CardFooter, Typography, Button } from "@material-tailwind/react";
// Asset IMG
import gambarFotoProfil from "@/assets/img/kamar.jpg";
import gambarBackground from "@/assets/img/kosan.jpg";
import { FaWhatsapp } from "react-icons/fa";

// Component
import Memuat from "@/components/memuat";
// Hooks
import useTampilkanSemuaKamar from "@/hooks/useTampilkanSemuaKamar";

const Page = () => {
  const {
    totalKamar,
    daftarKamar,
    sedangMemuatTampilkanKamar,
    halaman,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
  } = useTampilkanSemuaKamar();

  const totalKamarTerisi = daftarKamar.filter(
    (kamar) => kamar.Status === "Terisi"
  ).length;
  const totalKamarTersedia = daftarKamar.filter(
    (kamar) => kamar.Status !== "Terisi"
  ).length;

  const getGreeting = () => {
    const now = new Date();
    const hours = new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    }).format(now);

    if (hours >= 5 && hours < 12) return "Halo, selamat pagi";
    if (hours >= 12 && hours < 15) return "Halo, selamat siang";
    if (hours >= 15 && hours < 18) return "Halo, selamat sore";
    return "Halo, selamat malam";
  };

  const waUrl = `https://wa.me/6285363972317?text=${encodeURIComponent(
    `${getGreeting()}, saya tertarik dengan informasi Alizar Kost anda, Bisa bantu saya mengenai informasi kosannya?`
  )}`;

  const totalHalaman = Math.ceil(totalKamar / 10);

  return (
    <div
      className="h-screen flex flex-col bg-[#2c2c2c] text-white relative"
      style={{
        backgroundImage: `url(${gambarBackground.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <header className="flex flex-col items-center p-4 border-b border-[#8e44ad] bg-black/50">
        <p className="text-[#f1c40f] text-4xl font-extrabold mb-6 tracking-wider">
          Alizar Kost
        </p>

        <div className="grid grid-cols-3 gap-6 w-full max-w-screen-lg">
          <div className="bg-[#34495e] p-4 rounded-xl flex items-center justify-center">
            Jumlah Kamar: {totalKamar}
          </div>
          <div className="bg-[#c0392b] p-4 rounded-xl flex items-center justify-center">
            Kamar Terisi: {totalKamarTerisi}
          </div>
          <div className="bg-[#58d68d] p-4 rounded-xl flex items-center justify-center">
            Kamar Tersedia: {totalKamarTersedia}
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 bg-black/50 backdrop-blur-lg">
        <section>
          <h2 className="text-xl font-bold mb-4 text-[#f1c40f]">
            Pilihan Kamar
          </h2>

          {sedangMemuatTampilkanKamar ? (
            <Memuat />
          ) : (
            <>
              <div className="grid grid-cols-5 gap-4 mb-8">
                {daftarKamar.map((kamar) => (
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
              <CardFooter className="flex items-center justify-between border-t ">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal text-white"
                >
                  Halaman {halaman} dari {totalHalaman}
                </Typography>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={ambilHalamanSebelumnya}
                    variant="outlined"
                    size="sm"
                    disabled={sedangMemuatTampilkanKamar || halaman === 1}
                    className="bg-[#3498db] border-[#3498db] text-white hover:bg-[#2980b9] hover:border-[#2980b9] focus:ring-2 focus:ring-[#2980b9] transition-colors"
                  >
                    Sebelumnya
                  </Button>
                  <Button
                    onClick={ambilHalamanSelanjutnya}
                    variant="outlined"
                    size="sm"
                    disabled={
                      sedangMemuatTampilkanKamar || halaman === totalHalaman
                    }
                    className="bg-[#3498db] border-[#3498db] text-white hover:bg-[#2980b9] hover:border-[#2980b9] focus:ring-2 focus:ring-[#2980b9] transition-colors"
                  >
                    Selanjutnya
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </section>

        <section className="bg-black/50 mt-8 rounded-xl p-4 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-[#f1c40f]">
            Informasi Kosan
          </h2>
          <div className="text-sm text-center">
            <p className="mb-2">
              <span className="font-semibold text-[#f1c40f]">Alamat:</span> Jl.
              Alizar No. 123, Jakarta Selatan
            </p>
            <p className="mb-2">
              <span className="font-semibold text-[#f1c40f]">Fasilitas:</span>{" "}
              Wifi, Air Conditioner, Listrik 24 Jam, Tempat Parkir, Dapur
              Bersama
            </p>
            <p className="mb-2">
              <span className="font-semibold text-[#f1c40f]">Harga:</span> Mulai
              dari Rp. 1.500.000/bulan
            </p>
            <p>
              <span className="font-semibold text-[#f1c40f]">Kebijakan:</span>{" "}
              Tidak diperbolehkan membawa hewan peliharaan, merokok hanya di
              area luar
            </p>
          </div>
        </section>
      </main>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-[#25D366] px-6 py-4 rounded-full shadow-lg flex items-center justify-center text-white text-lg font-medium gap-3"
      >
        <FaWhatsapp size={24} />
        Hubungi Kami untuk Informasi Selengkapnya
      </a>
    </div>
  );
};

export default Page;
