import React, { useState } from "react";
import { FaTrashAlt, FaMoneyBillWave } from "react-icons/fa";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  IconButton,
  Tooltip,
  Button,
  CardFooter,
} from "@material-tailwind/react";
// Pengait Hooks
import useTampilkanPembayaran from "@/hooks/useTampilkanPembayaran";
// Component
import ModalSuntingPembayaran from "@/components/modalSuntingPembayaran";

const judul_tabel = [
  "No",
  "Nama Penghuni",
  "Kamar Yang Dihuni",
  "Sisa Tagihan",
  "Total Tagihan",
  "Status Pembayaran",
  "Aksi",
];

const KontenPembayaran = () => {
  const {
    totalPembayaran,
    daftarPembayaran,
    sedangMemuatTampilkanPembayaran,
    halaman,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
  } = useTampilkanPembayaran();
  const [bukaModalSuntingPembayaran, setBukaModalSuntingPembayaran] =
    useState(false);
  const [pembayaranYangTerpilih, setPembayaranYangTerpilih] = useState(null);
  const tanganiSunting = (pembayaran) => {
    setPembayaranYangTerpilih(pembayaran);
    setBukaModalSuntingPembayaran(true);
  };
  return (
    <>
      <Card className="h-full w-full overflow-auto shadow-lg rounded-md">
        <div className="p-4 border-b bg-blue-gray-50 flex justify-between items-center">
          <div>
            <Typography variant="h5" color="blue-gray" className="font-bold">
              Data Pembayaran
            </Typography>
            <Typography color="gray" className="text-sm">
              Informasi lengkap pembayaran penghuni kamar
            </Typography>
          </div>
        </div>

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
            {sedangMemuatTampilkanPembayaran ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  Memuat data pembayaran...
                </td>
              </tr>
            ) : daftarPembayaran.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-4 text-center text-red-500 font-bold"
                >
                  Tidak ada data pembayaran
                </td>
              </tr>
            ) : (
              daftarPembayaran.map((pembayaran, index) => (
                <tr
                  key={`${pembayaran.id}-${index}`}
                  className="even:bg-blue-gray-50/50"
                >
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray">
                      {index + 1}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray">
                      {pembayaran.Nama}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray">
                      {pembayaran.No_Pintu}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(pembayaran.Sisa_Tagihan)}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(pembayaran.Total_Tagihan)}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color={
                        pembayaran.Status_Pembayaran === "Lunas"
                          ? "green"
                          : "red"
                      }
                      className="font-semibold"
                    >
                      {pembayaran.Status_Pembayaran}
                    </Typography>
                  </td>
                  <td className="p-4 flex gap-2">
                    <Tooltip content="Edit">
                      <IconButton
                        variant="text"
                        color="blue"
                        onClick={() => tanganiSunting(pembayaran.id)}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Halaman {halaman} dari {Math.ceil(totalPembayaran / 5)}
          </Typography>
          <div className="flex items-center gap-2">
            <Button
              onClick={ambilHalamanSebelumnya}
              variant="outlined"
              size="sm"
              disabled={sedangMemuatTampilkanPembayaran || halaman === 1}
            >
              Sebelumnya
            </Button>
            <Button
              onClick={ambilHalamanSelanjutnya}
              variant="outlined"
              size="sm"
              disabled={
                sedangMemuatTampilkanPembayaran ||
                halaman === Math.ceil(totalPembayaran / 5)
              }
            >
              Selanjutnya
            </Button>
          </div>
        </CardFooter>

        <ModalSuntingPembayaran
          terbuka={bukaModalSuntingPembayaran}
          tertutup={setBukaModalSuntingPembayaran}
          pembayaranYangTerpilih={pembayaranYangTerpilih}
        />
      </Card>
    </>
  );
};

export default KontenPembayaran;
