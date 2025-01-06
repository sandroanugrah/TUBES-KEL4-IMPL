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
  CardFooter,
} from "@material-tailwind/react";

// Komponen
import ModalTambahKamar from "@/components/modalTambahKamar";
import Memuat from "@/components/memuat";
import ModalKonfirmasiHapusKamar from "@/components/modalKonfimasiHapusKamar";
import ModalSuntingKamar from "@/components/modalSuntingKamar";

// Pengait Hooks
import useTampilkanKamar from "@/hooks/useTampilkanKamar";
import useHapusKamar from "@/hooks/useHapusKamar";
import useSuntingKamar from "@/hooks/useSuntingKamar";

const judul_tabel = ["No", "No Pintu", "Lantai", "Status", "Fasilitas", "Aksi"];

const KontenKamar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [bukaModalSuntingKamar, setBukaModalSuntingKamar] = useState(false);
  const [bukaModalHapusKamar, setBukaModalHapusKamar] = useState(false);
  const [kamarYangTerpilih, setKamarYangTerpilih] = useState(null);

  const {
    totalKamar,
    daftarKamar,
    sedangMemuatTampilkanKamar,
    halaman,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
  } = useTampilkanKamar();

  const { sedangMemuatHapusKamar, hapusKamar } = useHapusKamar();
  const { suntingKamar, sedangMemuatSuntingKamar } =
    useSuntingKamar(kamarYangTerpilih);

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

  const tanganiSunting = (kamar) => {
    setKamarYangTerpilih(kamar);
    setBukaModalSuntingKamar(true);
  };

  return (
    <Card className="h-full w-full">
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

      <CardBody className="px-0">
        {sedangMemuatTampilkanKamar ? (
          <Memuat />
        ) : (
          <>
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
                  daftarKamar.map((kamar, index) => {
                    const nomorUrut =
                      index + 1 + (halaman - 1) * daftarKamar.length;

                    return (
                      <tr key={kamar.id}>
                        <td className="p-4 border-b border-blue-gray-50">
                          {nomorUrut}
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
                            <IconButton
                              variant="text"
                              onClick={() => tanganiSunting(kamar.id)}
                            >
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
                    );
                  })
                )}
              </tbody>
            </table>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                Halaman {halaman} dari {Math.ceil(totalKamar / 5)}
              </Typography>
              <div className="flex items-center gap-2">
                <Button
                  onClick={ambilHalamanSebelumnya}
                  variant="outlined"
                  size="sm"
                  disabled={sedangMemuatTampilkanKamar || halaman === 1}
                >
                  Sebelumnya
                </Button>
                <Button
                  onClick={ambilHalamanSelanjutnya}
                  variant="outlined"
                  size="sm"
                  disabled={
                    sedangMemuatTampilkanKamar ||
                    halaman === Math.ceil(totalKamar / 5)
                  }
                >
                  Selanjutnya
                </Button>
              </div>
            </CardFooter>
          </>
        )}
      </CardBody>

      <ModalTambahKamar open={modalOpen} setOpen={setModalOpen} />

      <ModalSuntingKamar
        terbuka={bukaModalSuntingKamar}
        tertutup={setBukaModalSuntingKamar}
        kamarYangTerpilih={kamarYangTerpilih}
        suntingKamar={suntingKamar}
        sedangMemuatSuntingKamar={sedangMemuatSuntingKamar}
      />

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
