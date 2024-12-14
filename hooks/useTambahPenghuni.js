import { useState } from "react";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useTambahPenghuni = () => {
  const [nama, setNama] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [kamar, setKamar] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [alamat, setAlamat] = useState("");
  const [sedangMemuatTambahPenghuni, setSedangMemuatTambahPenghuni] =
    useState(false);

  const validasiFormulir = () => {
    let sesuai = true;
    let pesanKesalahan = "";

    !nama ? ((sesuai = false), (pesanKesalahan += "Nama harus diisi. ")) : null;
    !jenisKelamin
      ? ((sesuai = false), (pesanKesalahan += "Jenis kelamin harus dipilih. "))
      : null;
    !kamar
      ? ((sesuai = false), (pesanKesalahan += "Kamar harus diisi. "))
      : null;
    !noTelepon
      ? ((sesuai = false), (pesanKesalahan += "No Telepon harus diisi. "))
      : null;
    !alamat
      ? ((sesuai = false), (pesanKesalahan += "Alamat harus diisi. "))
      : null;

    if (!sesuai) {
      toast.error(pesanKesalahan.trim());
    }

    return sesuai;
  };

  const tambahPenghuni = async () => {
    if (!validasiFormulir()) return;

    setSedangMemuatTambahPenghuni(true);

    try {
      const referensiPenghuni = collection(database, "penghuni");
      const dataPenghuni = {
        Nama: nama,
        Jenis_Kelamin: jenisKelamin,
        Kamar: kamar,
        No_Telepon: noTelepon,
        Alamat: alamat,
        Tanggal_Pembuatan: serverTimestamp(),
      };

      await setDoc(doc(referensiPenghuni), dataPenghuni);
      toast.success("Penghuni berhasil ditambahkan!");
      aturUlangFormulir();
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat menambahkan penghuni: " + error.message
      );
    } finally {
      setSedangMemuatTambahPenghuni(false);
    }
  };

  const aturUlangFormulir = () => {
    setNama("");
    setJenisKelamin("");
    setKamar("");
    setNoTelepon("");
    setAlamat("");
  };

  return {
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
    aturUlangFormulir,
    sedangMemuatTambahPenghuni,
  };
};

export default useTambahPenghuni;
