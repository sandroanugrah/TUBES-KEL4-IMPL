"use client";
import React, { useState } from "react";
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
import useTambahPenghuni from "@/hooks/useTambahPenghuni";

const ModalTambahPenghuni = ({ open, setOpen }) => {
  const {
    nama,
    jenisKelamin,
    kamar,
    noTelepon,
    alamat,
    setNama,
    setJenisKelamin,
    setKamar,
    setNoTelepon,
    setAlamat,
    tambahPenghuni,
    sedangMemuatTambahPenghuni,
  } = useTambahPenghuni();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    await tambahPenghuni();
    handleClose();
  };

  return (
    <Dialog open={open} handler={handleClose} className="max-w-md">
      <DialogHeader>Tambah Penghuni Baru</DialogHeader>
      <DialogBody>
        <div className="space-y-4">
          <div>
            <Input
              type="text"
              value={nama}
              label="Nama Penghuni"
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Masukkan nama penghuni"
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
            <Input
              type="text"
              value={kamar}
              label="Kamar"
              onChange={(e) => setKamar(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Masukkan nomor kamar"
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
            <Textarea
              value={alamat}
              label="Alamat"
              onChange={(e) => setAlamat(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            ></Textarea>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          onClick={handleSubmit}
          disabled={sedangMemuatTambahPenghuni}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {sedangMemuatTambahPenghuni ? "Memuat..." : "Tambah Penghuni"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalTambahPenghuni;
