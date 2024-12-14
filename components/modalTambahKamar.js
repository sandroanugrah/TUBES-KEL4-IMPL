import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

// PENGAIT KAMI
import useTambahKamar from "@/hooks/useTambahKamar";
import { Select, Option, Input } from "@material-tailwind/react";

const ModalTambahKamar = ({ open, setOpen }) => {
  const {
    noPintu,
    lantai,
    status,
    fasilitas,
    setNoPintu,
    setLantai,
    setStatus,
    setFasilitas,
    tambahKamar,
    sedangMemuatTambahKamar,
  } = useTambahKamar();

  const handleSubmit = async () => {
    await tambahKamar();
    setOpen(false);
  };

  return (
    <Dialog open={open} handler={() => setOpen(false)}>
      <DialogHeader>Tambah Kamar Baru</DialogHeader>
      <DialogBody>
        <div className="space-y-4">
          <div>
            <Input
              type="text"
              value={noPintu}
              label="No Pintu"
              onChange={(e) => setNoPintu(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Masukkan no pintu"
            />
          </div>
          <div>
            <Input
              type="text"
              value={lantai}
              label="Lantai"
              onChange={(e) => setLantai(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Masukkan lantai"
            />
          </div>
          <div>
            <Select
              label="Pilih status kamar"
              value={status}
              onChange={(e) => setStatus(e)}
            >
              <Option value="Kosong">Kosong</Option>
              <Option value="Terisi">Terisi</Option>
            </Select>
          </div>
          <div>
            <Input
              type="text"
              value={fasilitas}
              label="Fasilitas"
              onChange={(e) => setFasilitas(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Masukkan fasilitas"
            />
          </div>
        </div>
      </DialogBody>

      <DialogFooter>
        <Button
          onClick={handleSubmit}
          disabled={sedangMemuatTambahKamar}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {sedangMemuatTambahKamar ? "Memuat..." : "Tambah Kamar"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalTambahKamar;
