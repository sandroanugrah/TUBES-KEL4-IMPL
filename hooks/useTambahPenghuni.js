import { useState } from "react";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
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

  const validasiFormulir = async () => {
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
      return false;
    }

    try {
      const referensiKamar = doc(database, "kamar", kamar);
      const snapshot = await getDoc(referensiKamar);

      if (!snapshot.exists()) {
        toast.error("Kamar tidak ditemukan.");
        return false;
      }

      const dataKamar = snapshot.data();
      if (dataKamar.Status !== "Tersedia") {
        toast.error("Kamar sudah terisi. Pilih kamar lain.");
        return false;
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat memvalidasi kamar: " + error.message);
      return false;
    }

    return true;
  };

  const tambahPenghuni = async () => {
    const validasi = await validasiFormulir();
    if (!validasi) return;

    setSedangMemuatTambahPenghuni(true);

    try {
      // Tambahkan data penghuni ke koleksi "penghuni"
      const referensiPenghuni = collection(database, "penghuni");
      const dataPenghuni = {
        Nama: nama,
        Jenis_Kelamin: jenisKelamin,
        ID_Kamar: kamar, // Relasi ke ID kamar
        No_Telepon: noTelepon,
        Alamat: alamat,
        Tanggal_Pembuatan: serverTimestamp(),
      };
      await setDoc(doc(referensiPenghuni), dataPenghuni);

      // Perbarui status kamar menjadi "Terisi"
      const referensiKamar = doc(database, "kamar", kamar);
      await updateDoc(referensiKamar, {
        Status: "Terisi",
      });

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
