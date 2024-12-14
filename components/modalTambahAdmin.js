"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import { Select, Option, Input } from "@material-tailwind/react";

// PENGAIT KAMI
import useTambahAdmin from "@/hooks/useTambahAdmin";

const ModalTambahAdmin = ({ open, setOpen }) => {
  const {
    email,
    noTelepon,
    alamat,
    password,
    namaLengkap,
    jenisKelamin,
    namaPengguna,
    setNamaLengkap,
    setNamaPengguna,
    setEmail,
    setNoTelepon,
    setAlamat,
    setJenisKelamin,
    setPassword,
    tambahAdmin,
    sedangMemuatTambahAdmin,
  } = useTambahAdmin();

  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async () => {
    await tambahAdmin();
    handleClose();
  };

  return (
    <Dialog open={open} handler={handleClose} className="max-w-md">
      <DialogHeader>Tambah Admin Baru</DialogHeader>
      <DialogBody>
        <div className="space-y-4">
          <div>
            <Input
              type="text"
              value={namaLengkap}
              label="Nama Lengkap"
              onChange={(e) => setNamaLengkap(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Masukkan nama lengkap"
            />
          </div>
          <div>
            <Input
              type="text"
              value={namaPengguna}
              label="Nama Pengguna"
              onChange={(e) => setNamaPengguna(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Masukkan nama pengguna"
            />
          </div>
          <div>
            <Input
              type="email"
              value={email}
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Masukkan email"
            />
          </div>
          <div>
            <Input
              type="text"
              value={noTelepon}
              label="No Telepon"
              onChange={(e) => setNoTelepon(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Masukkan no telepon"
            />
          </div>
          <div>
            <Select
              label="Pilih jenis kelamin"
              value={jenisKelamin}
              onChange={(e) => setJenisKelamin(e)}
            >
              <Option value="Pria">Pria</Option>
              <Option value="Wanita">Wanita</Option>
            </Select>
          </div>
          <div>
            <Textarea
              value={alamat}
              label="Alamat"
              onChange={(e) => setAlamat(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            ></Textarea>
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              label="Masukkan Kata Sandi"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Masukkan password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <FaEyeSlash className="w-5 h-5" />
              ) : (
                <FaEye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          onClick={handleSubmit}
          disabled={sedangMemuatTambahAdmin}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {sedangMemuatTambahAdmin ? "Memuat..." : "Tambah Admin"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalTambahAdmin;
