"use client";

import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Select,
  Option,
  Input,
} from "@material-tailwind/react";

// PENGAIT KAMI
import useTambahPenghuni from "@/hooks/useTambahPenghuni";
import useTampilkanKamar from "@/hooks/useTampilkanKamar";

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

  const { daftarKamar, sedangMemuatTampilkanKamar } = useTampilkanKamar();

  const kamarKosong = daftarKamar.filter((k) => k.Status === "Kosong");

  const handleSubmit = async () => {
    await tambahPenghuni();
    setOpen(false);
  };

  return (
    <Dialog open={open} handler={() => setOpen(false)} className="max-w-md">
      <DialogHeader>Tambah Penghuni Baru</DialogHeader>
      <DialogBody>
        <div className="space-y-4">
          <div>
            <Input
              type="text"
              value={nama}
              label="Nama Penghuni"
              onChange={(e) => setNama(e.target.value)}
              className="w-full"
              placeholder="Masukkan nama penghuni"
            />
          </div>
          <div>
            <Select
              label="Pilih jenis kelamin"
              value={jenisKelamin}
              onChange={(value) => setJenisKelamin(value)}
            >
              <Option value="Pria">Pria</Option>
              <Option value="Wanita">Wanita</Option>
            </Select>
          </div>
          <div>
            <Select
              label="Pilih kamar"
              value={kamar}
              onChange={(value) => setKamar(value)}
              disabled={sedangMemuatTampilkanKamar}
            >
              {kamarKosong.length > 0 ? (
                kamarKosong.map((k) => (
                  <Option key={k.id} value={k.id}>
                    {k.No_Pintu}
                  </Option>
                ))
              ) : (
                <Option disabled value="">
                  Tidak ada kamar kosong
                </Option>
              )}
            </Select>
            {sedangMemuatTampilkanKamar && (
              <p className="text-sm text-gray-500">Memuat daftar kamar...</p>
            )}
          </div>

          <div>
            <Input
              type="text"
              value={noTelepon}
              label="No Telepon"
              onChange={(e) => setNoTelepon(e.target.value)}
              className="w-full"
              placeholder="Masukkan no telepon"
            />
          </div>
          <div>
            <Textarea
              value={alamat}
              label="Alamat"
              onChange={(e) => setAlamat(e.target.value)}
              className="w-full"
              placeholder="Masukkan alamat lengkap"
            />
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
