"use client";
import Image from "next/image";
import { Button, Card, Typography, Input } from "@material-tailwind/react";
import { AtSymbolIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
// Asset IMG
import gambarLogin from "@/assets/img/logoKosan.jpg";
import gambarBackground from "@/assets/img/kosan.jpg";
// Komponen
import Memuat from "@/components/memuat";
import useMasukDenganEmailKataSandi from "@/hooks/useMasukDenganEmailKataSandi";

export default function Masuk() {
  const [lihatKataSandi, setLihatKataSandi] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { masukDenganEmail, sedangMemuat } = useMasukDenganEmailKataSandi();

  const tanganiMasuk = async (e) => {
    e.preventDefault();
    await masukDenganEmail(email, password);
  };

  return (
    <div
      className="h-screen flex justify-center items-center relative bg-cover bg-center"
      style={{ backgroundImage: `url(${gambarBackground.src})` }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>

      <ToastContainer />
      <Card className="z-10 w-full max-w-lg bg-white rounded-l-none shadow-lg relative">
        <div className="flex justify-center mt-10">
          <Image
            src={gambarLogin}
            alt="Logo Masuk"
            className="w-28 h-28 bg-gray-600 rounded-full p-2"
            width={100}
            height={100}
          />
        </div>

        <div className="mt-4 text-center">
          <Typography variant="h3" className="font-mono">
            Masuk
          </Typography>
          <Typography className="font-body text-gray-600">
            Masukkan email dan kata sandi untuk melanjutkan akses.
          </Typography>
        </div>

        <form onSubmit={tanganiMasuk} className="px-8 mt-6">
          <div className="relative mb-6">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:border-[#0F67B1]"
              required
            />
            <AtSymbolIcon className="absolute right-3 top-2 h-6 w-6 text-gray-600" />
          </div>

          <div className="relative mb-6">
            <Input
              label="Kata Sandi"
              type={lihatKataSandi ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:border-[#0F67B1]"
              required
            />
            {lihatKataSandi ? (
              <EyeSlashIcon
                className="absolute right-3 top-2 h-6 w-6 text-gray-700 cursor-pointer"
                onClick={() => setLihatKataSandi(false)}
              />
            ) : (
              <EyeIcon
                className="absolute right-3 top-2 h-6 w-6 text-gray-700 cursor-pointer"
                onClick={() => setLihatKataSandi(true)}
              />
            )}
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="w-full mb-14 bg-gray-700 text-white hover:scale-95 transition-all duration-200"
              disabled={sedangMemuat}
            >
              {sedangMemuat ? <Memuat /> : "Masuk"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
