import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { database } from "@/lib/firebaseConfig";

export default function useSuntingPenghuni(idPenghuni) {
  const [nama, setNama] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [alamat, setAlamat] = useState("");
  const [sedangMemuatSuntingPenghuni, setSedangMemuatSuntingPenghuni] =
    useState(false);

  const ambilDataPenghuni = async () => {
    try {
      const penghuniRef = doc(database, "penghuni", idPenghuni);
      const docSnap = await getDoc(penghuniRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setNama(data.Nama || "");
        setJenisKelamin(data.Jenis_Kelamin || "");
        setNoTelepon(data.No_Telepon || "");
        setAlamat(data.Alamat || "");
      } else {
        toast.error("Data penghuni tidak ditemukan!");
      }
    } catch (error) {
      toast.error("Gagal mengambil data penghuni: " + error.message);
    }
  };

  const validasiFormulir = () =>
    !nama
      ? (toast.error("Masukkan nama penghuni"), false)
      : !jenisKelamin
      ? (toast.error("Pilih jenis kelamin"), false)
      : !noTelepon
      ? (toast.error("Masukkan nomor telepon"), false)
      : !alamat
      ? (toast.error("Masukkan alamat"), false)
      : true;

  const suntingPenghuni = async () => {
    setSedangMemuatSuntingPenghuni(true);

    if (!validasiFormulir()) {
      setSedangMemuatSuntingPenghuni(false);
      return;
    }

    try {
      const penghuniRef = doc(database, "penghuni", idPenghuni);
      await updateDoc(penghuniRef, {
        Nama: nama,
        Jenis_Kelamin: jenisKelamin,
        No_Telepon: noTelepon,
        Alamat: alamat,
      });

      toast.success("Data penghuni berhasil disunting!");
    } catch (error) {
      toast.error("Gagal menyunting data penghuni: " + error.message);
      console.error("Error menyunting data penghuni:", error);
    } finally {
      setSedangMemuatSuntingPenghuni(false);
    }
  };

  useEffect(() => {
    if (idPenghuni) {
      ambilDataPenghuni();
    }
  }, [idPenghuni]);

  return {
    nama,
    jenisKelamin,
    noTelepon,
    alamat,
    setNama,
    setJenisKelamin,
    setNoTelepon,
    setAlamat,
    sedangMemuatSuntingPenghuni,
    suntingPenghuni,
  };
}
