import { useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { database } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";

const useTambahPenghuni = () => {
  const [nama, setNama] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [kamar, setKamar] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [alamat, setAlamat] = useState("");
  const [sedangMemuatTambahPenghuni, setSedangMemuatTambahPenghuni] =
    useState(false);

  const tambahPenghuni = async () => {
    setSedangMemuatTambahPenghuni(true);
    try {
      const referensiKamar = doc(database, "kamar", kamar);
      const snapshot = await getDoc(referensiKamar);

      if (!snapshot.exists()) {
        toast.error(`Kamar dengan ID ${kamar} tidak ditemukan.`);
        setSedangMemuatTambahPenghuni(false);
        return;
      }

      const dataKamar = snapshot.data();
      const noPintu = dataKamar.No_Pintu;

      if (dataKamar.Status !== "Kosong") {
        toast.error(`Kamar ${noPintu} sudah terisi. Pilih kamar lain.`);
        setSedangMemuatTambahPenghuni(false);
        return;
      }

      const referensiPenghuni = doc(database, "penghuni", nama + "_" + kamar);
      await setDoc(referensiPenghuni, {
        Nama: nama,
        Jenis_Kelamin: jenisKelamin,
        No_Telepon: noTelepon,
        Alamat: alamat,
        Kamar_ID: kamar,
        No_Pintu: noPintu,
      });

      await setDoc(referensiKamar, { Status: "Terisi" }, { merge: true });

      toast.success(`Penghuni ${nama} berhasil ditambahkan.`);
    } catch (error) {
      toast.error("Terjadi kesalahan: " + error.message);
    } finally {
      setSedangMemuatTambahPenghuni(false);
    }
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
    sedangMemuatTambahPenghuni,
  };
};

export default useTambahPenghuni;
