"use client";

import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";

// PENGAIT KAMI
import useTambahPembayaran from "@/hooks/useTambahPembayaran";
import useTampilkanPenghuni from "@/hooks/useTampilkanPenghuni";

const ModalTambahPembayaran = ({ open, setOpen }) => {
  const {
    penghuni,
    setPenghuni,
    tambahPembayaran,
    sedangMemuatTambahPembayaran,
  } = useTambahPembayaran();

  const { daftarPenghuni, sedangMemuatTampilkanPenghuni } =
    useTampilkanPenghuni();

  const handleSubmit = async () => {
    await tambahPembayaran();
    setOpen(false);
  };

  return (
    <Dialog open={open} handler={() => setOpen(false)} className="max-w-md">
      <DialogHeader>Tambah Tagihan Baru</DialogHeader>
      <DialogBody>
        <div className="space-y-4">
          <div>
            <Select
              label="Pilih Nama Penghuni"
              value={penghuni}
              onChange={(value) => setPenghuni(value)}
              disabled={sedangMemuatTampilkanPenghuni}
            >
              {daftarPenghuni.length > 0 ? (
                daftarPenghuni.map((k) => (
                  <Option key={k.id} value={k.id}>
                    {k.Nama}
                  </Option>
                ))
              ) : (
                <Option disabled value="">
                  Tidak ada nama penghuni
                </Option>
              )}
            </Select>
            {sedangMemuatTampilkanPenghuni && (
              <p className="text-sm text-gray-500">Memuat daftar Tagihan...</p>
            )}
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          onClick={handleSubmit}
          disabled={sedangMemuatTambahPembayaran}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {sedangMemuatTambahPembayaran ? "Memuat..." : "Tambah Pembayaran"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalTambahPembayaran;
