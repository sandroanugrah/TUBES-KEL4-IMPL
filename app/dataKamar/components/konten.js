import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { BsDoorClosedFill } from "react-icons/bs";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

// Komponen
import ModalTambahKamar from "@/components/modalTambahKamar";
import Memuat from "@/components/memuat";
import ModalKonfirmasiHapusKamar from "@/components/modalKonfimasiKamar";

// Pengait Hooks
import useTampilkanKamar from "@/hooks/useTampilkanKamar";
import useHapusKamar from "@/hooks/useHapusKamar";

const judul_tabel = ["No", "No Pintu", "Lantai", "Status", "Fasilitas", "Aksi"];

const KontenKamar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [bukaModalHapusKamar, setBukaModalHapusKamar] = useState(false);
  const [kamarYangTerpilih, setKamarYangTerpilih] = useState(null);
  const { daftarKamar, sedangMemuatTampilkanKamar } = useTampilkanKamar();
  const { sedangMemuatHapusKamar, hapusKamar } = useHapusKamar();

  const tanganiHapus = (idKamar) => {
    setKamarYangTerpilih(idKamar);
    setBukaModalHapusKamar(true);
  };

  const hapus = async () => {
    if (kamarYangTerpilih) {
      await hapusKamar(kamarYangTerpilih);
      setBukaModalHapusKamar(false);
      setKamarYangTerpilih(null);
    }
  };

  return (
    <Card className="h-full w-full">
      {/* Header */}
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Data Kamar
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Informasi Kamar
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={() => setModalOpen(true)}
            >
              <BsDoorClosedFill strokeWidth={2} className="h-4 w-4" /> Tambah
              Kamar
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Body */}
      <CardBody className="px-0">
        {sedangMemuatTampilkanKamar ? (
          <Memuat />
        ) : (
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {judul_tabel.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!daftarKamar || daftarKamar.length === 0 ? (
                // Jika data kosong, tampilkan pesan di dalam tabel
                <tr>
                  <td
                    colSpan={judul_tabel.length}
                    className="text-center text-gray-500 p-4"
                  >
                    <Typography variant="h6" color="red">
                      Data Kamar Tidak Ada
                    </Typography>
                  </td>
                </tr>
              ) : (
                // Jika ada data, tampilkan data kamar
                daftarKamar.map((kamar, index) => (
                  <tr key={kamar.id}>
                    <td className="p-4 border-b border-blue-gray-50">
                      {index + 1}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      {kamar.No_Pintu}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      {kamar.Lantai}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={kamar.Status}
                        color={kamar.Status === "Terisi" ? "red" : "green"}
                        className="w-fit text-xs leading-tight truncate"
                      />
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      {kamar.Fasilitas}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Tooltip content="Edit Kamar">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Delete Kamar">
                        <IconButton
                          variant="text"
                          onClick={() => tanganiHapus(kamar.id)}
                        >
                          <FaTrashAlt className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </CardBody>

      <ModalTambahKamar open={modalOpen} setOpen={setModalOpen} />

      <ModalKonfirmasiHapusKamar
        terbuka={bukaModalHapusKamar}
        tertutup={setBukaModalHapusKamar}
        kamarYangTerpilih={kamarYangTerpilih}
        konfirmasiHapusKamar={hapus}
        sedangMemuatHapusKamar={sedangMemuatHapusKamar}
      />
    </Card>
  );
};

export default KontenKamar;
