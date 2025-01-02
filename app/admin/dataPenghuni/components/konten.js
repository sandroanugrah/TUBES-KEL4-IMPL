import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  IconButton,
  Tooltip,
  Button,
} from "@material-tailwind/react";
// Components
import ModalTambahPenghuni from "@/components/modalTambahPenghuni";
import ModalKonfirmasiHapusPenghuni from "@/components/modalKonfirmasiHapusPenghuni";
import ModalSuntingPenghuni from "@/components/modalSuntingPenghuni";
// Pengait Hooks
import useTampilkanPenghuni from "@/hooks/useTampilkanPenghuni";
import useHapusPenghuni from "@/hooks/useHapusPenghuni";
import useSuntingPenghuni from "@/hooks/useSuntingPenghuni";

const judul_tabel = [
  "Nama Penghuni",
  "Jenis Kelamin",
  "Kamar Yang Dihuni",
  "No Telepon",
  "Alamat",
  "Aksi",
];

const KontenPenghuni = () => {
  const [openModalTambah, setOpenModalTambah] = useState(false);
  const [bukaModalHapusPenghuni, setBukaModalHapusPenghuni] = useState(false);
  const [bukaModalSuntingPenghuni, setBukaModalSuntingPenghuni] =
    useState(false);
  const [penghuniYangTerpilih, setPenghuniYangTerpilih] = useState(null);
  const { sedangMemuatHapusPenghuni, hapusPenghuni } = useHapusPenghuni();
  const { daftarPenghuni, sedangMemuatTampilkanPenghuni } =
    useTampilkanPenghuni();
  const { suntingPenghuni, sedangMemuatSuntingPenghuni } =
    useSuntingPenghuni(penghuniYangTerpilih);

  const tanganiHapus = (idPenghuni) => {
    setPenghuniYangTerpilih(idPenghuni);
    setBukaModalHapusPenghuni(true);
  };

  const hapus = async () => {
    if (penghuniYangTerpilih) {
      const penghuni = daftarPenghuni.find(
        (item) => item.id === penghuniYangTerpilih
      );
      if (penghuni && penghuni.Kamar_ID) {
        await hapusPenghuni(penghuniYangTerpilih, penghuni.Kamar_ID);
      }
      setBukaModalHapusPenghuni(false);
      setPenghuniYangTerpilih(null);
    }
  };

  const tanganiSunting = (penghuni) => {
    setPenghuniYangTerpilih(penghuni);
    setBukaModalSuntingPenghuni(true);
  };

  return (
    <>
      <Card className="h-full w-full overflow-auto shadow-lg rounded-md">
        <div className="p-4 border-b bg-blue-gray-50 flex justify-between items-center">
          <div>
            <Typography variant="h5" color="blue-gray" className="font-bold">
              Data Penghuni
            </Typography>
            <Typography color="gray" className="text-sm">
              Informasi lengkap data penghuni kamar
            </Typography>
          </div>
          <Button
            className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600"
            size="sm"
            onClick={() => setOpenModalTambah(true)}
          >
            <UserPlusIcon className="h-4 w-4" /> Tambah Penghuni
          </Button>
        </div>

        {sedangMemuatTampilkanPenghuni ? (
          <div className="p-4 text-center">
            <Typography color="gray">Memuat data penghuni...</Typography>
          </div>
        ) : (
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {judul_tabel.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-200 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {daftarPenghuni.map((penghuni, index) => (
                <tr
                  key={`${penghuni.id}-${index}`}
                  className="even:bg-blue-gray-50/50"
                >
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray">
                      {penghuni.Nama}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray">
                      {penghuni.Jenis_Kelamin}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray">
                      {penghuni.No_Pintu}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray">
                      {penghuni.No_Telepon}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray">
                      {penghuni.Alamat}
                    </Typography>
                  </td>
                  <td className="p-4 flex gap-2">
                    <Tooltip content="Edit">
                      <IconButton
                        variant="text"
                        color="blue"
                        onClick={() => tanganiSunting(penghuni.id)}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Hapus">
                      <IconButton
                        variant="text"
                        color="red"
                        onClick={() =>
                          tanganiHapus(penghuni.id, penghuni.Kamar_ID)
                        }
                      >
                        <FaTrashAlt className="h-5 w-5" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <ModalTambahPenghuni
        open={openModalTambah}
        setOpen={setOpenModalTambah}
      />
      <ModalSuntingPenghuni
        terbuka={bukaModalSuntingPenghuni}
        tertutup={setBukaModalSuntingPenghuni}
        penghuniYangTerpilih={penghuniYangTerpilih}
        suntingPenghuni={suntingPenghuni}
        sedangMemuatSuntingPenghuni={sedangMemuatSuntingPenghuni}
      />

      <ModalKonfirmasiHapusPenghuni
        terbuka={bukaModalHapusPenghuni}
        tertutup={setBukaModalHapusPenghuni}
        penghuniYangTerpilih={penghuniYangTerpilih}
        konfirmasiHapusPenghuni={hapus}
        sedangMemuatHapusPenghuni={sedangMemuatHapusPenghuni}
      />
    </>
  );
};

export default KontenPenghuni;
