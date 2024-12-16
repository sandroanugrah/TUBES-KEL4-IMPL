"use client";
import Image from "next/image";
import { Button, Card, Typography, Input } from "@material-tailwind/react";
import {
  AtSymbolIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/solid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import gambarLogin from "@/assets/img/logoKosan.jpg";
import gambarBackground from "@/assets/img/kosan.jpg";

export default function Masuk() {
  const [lihatKataSandi, setLihatKataSandi] = useState(false);
  const [tampilkanCardLupaKataSandi, setTampilkanCardLupaKataSandi] =
    useState(false);

  return (
    <div
      className="h-screen flex justify-center items-center relative bg-cover bg-center"
      style={{ backgroundImage: `url(${gambarBackground.src})` }}
    >
      {/* Overlay Blur */}
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
            {tampilkanCardLupaKataSandi ? "Lupa Kata Sandi" : "Masuk"}
          </Typography>
          <Typography className="font-body text-gray-600">
            {tampilkanCardLupaKataSandi
              ? "Masukkan email Anda untuk reset kata sandi."
              : "Masukkan email dan kata sandi untuk melanjutkan akses."}
          </Typography>
        </div>

        <div className="px-8 mt-6">
          <div className="relative mb-6">
            <Input
              label="Email"
              type="email"
              className="focus:border-[#0F67B1]"
            />
            <AtSymbolIcon className="absolute right-3 top-2 h-6 w-6 text-gray-600" />
          </div>

          {!tampilkanCardLupaKataSandi && (
            <div className="relative">
              <Input
                label="Kata Sandi"
                type={lihatKataSandi ? "text" : "password"}
                className="focus:border-[#0F67B1]"
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
          )}
        </div>

        <div className="px-8 mt-6">
          <Button className="w-full bg-gray-700 text-white hover:scale-95 transition-all duration-200">
            {tampilkanCardLupaKataSandi ? "Kirim Tautan Reset" : "Masuk"}
          </Button>
        </div>

        <div className="text-center my-6">
          {!tampilkanCardLupaKataSandi && (
            <Typography
              className="text-gray-700 text-sm hover:underline cursor-pointer"
              onClick={() => setTampilkanCardLupaKataSandi(true)}
            >
              Lupa Sandi?
            </Typography>
          )}
        </div>

        {tampilkanCardLupaKataSandi && (
          <div className="flex justify-center mb-6">
            <ArrowLeftCircleIcon
              className="h-12 w-12 text-gray-700 cursor-pointer hover:scale-110 transition duration-200"
              onClick={() => setTampilkanCardLupaKataSandi(false)}
            />
          </div>
        )}
      </Card>
    </div>
  );
}
