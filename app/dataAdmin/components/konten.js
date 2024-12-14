import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
} from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/outline";
// Komponen
import Memuat from "@/components/memuat";
import ModalTambahAdmin from "@/components/modalTambahAdmin";
import ModalKonfirmasiHapusAdmin from "@/components/modalKonfirmasiHapusAdmin";
// Pengait Hooks
import useTampilkanAdmin from "@/hooks/useTampilkanAdmin";
import useHapusAdmin from "@/hooks/useHapusAdmin";

function KontenAdmin() {
  const [openModalTambah, setOpenModalTambah] = useState(false);
  const [bukaModalHapusAdmin, setBukaModalHapusAdmin] = useState(false);
  const [adminYangTerpilih, setAdminYangTerpilih] = useState(null);
  const { daftarAdmin, sedangMemuatTampilkanAdmin } = useTampilkanAdmin();
  const { sedangMemuatHapusAdmin, hapusAdmin } = useHapusAdmin();

  const toggleModalTambah = () => setOpenModalTambah(!openModalTambah);

  const konfirmasiHapus = (idAdmin) => {
    setAdminYangTerpilih(idAdmin);
    setBukaModalHapusAdmin(true);
  };

  const hapus = async () => {
    if (adminYangTerpilih) {
      await hapusAdmin(adminYangTerpilih);
      setBukaModalHapusAdmin(false);
      setAdminYangTerpilih(null);
    }
  };

  return (
    <Card className="h-full w-full">
      {/* Header */}
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Daftar Admin
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Informasi lengkap tentang semua admin terdaftar
            </Typography>
          </div>
          <Button
            className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600"
            size="sm"
            onClick={toggleModalTambah}
          >
            <UserPlusIcon className="h-4 w-4" /> Tambah Admin
          </Button>
        </div>
      </CardHeader>

      {/* Body */}
      <CardBody className="px-0">
        {sedangMemuatTampilkanAdmin ? (
          <Memuat />
        ) : (
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  No
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  Nama Lengkap
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  Nama Pengguna
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  Email
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  No Telepon
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  Jenis Kelamin
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  Alamat
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {daftarAdmin.length === 0 ? (
                // Jika data kosong, tampilkan pesan di dalam tabel
                <tr>
                  <td colSpan={8} className="text-center text-gray-500 p-4">
                    <Typography variant="h6" color="red">
                      Data Admin Tidak Ada
                    </Typography>
                  </td>
                </tr>
              ) : (
                // Jika data tersedia, render baris data admin
                daftarAdmin.map((admin, index) => (
                  <tr key={admin.id}>
                    <td className="p-4 border-b border-blue-gray-50">
                      {index + 1}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      {admin.Nama_Lengkap}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      {admin.Nama_Pengguna}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      {admin.Email}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      {admin.No_Telepon}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      {admin.Jenis_Kelamin}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      {admin.Alamat}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex items-center gap-3">
                        <Button variant="outlined" size="sm" color="blue">
                          <FaEdit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outlined"
                          size="sm"
                          color="red"
                          onClick={() => konfirmasiHapus(admin.id)}
                        >
                          <FaTrashAlt className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </CardBody>

      <ModalTambahAdmin open={openModalTambah} setOpen={setOpenModalTambah} />

      <ModalKonfirmasiHapusAdmin
        terbuka={bukaModalHapusAdmin}
        tertutup={setBukaModalHapusAdmin}
        adminYangTerpilih={adminYangTerpilih}
        konfirmasiHapusAdmin={hapus}
        sedangMemuatHapusAdmin={sedangMemuatHapusAdmin}
      />
    </Card>
  );
}

export default KontenAdmin;
