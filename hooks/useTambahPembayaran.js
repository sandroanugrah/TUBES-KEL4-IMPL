import { useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { database } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";

const useTambahPembayaran = () => {
  const [penghuni, setPenghuni] = useState("");
  const [sedangMemuatTambahPembayaran, setSedangMemuatTambahPembayaran] =
    useState(false);

  const tambahPembayaran = async () => {
    setSedangMemuatTambahPembayaran(true);
    try {
      const referensiPenghuni = doc(database, "penghuni", penghuni);
      const snapshot = await getDoc(referensiPenghuni);

      if (!snapshot.exists()) {
        toast.error(`Penghuni dengan ID ${penghuni} tidak ditemukan.`);
        setSedangMemuatTambahPembayaran(false);
        return;
      }

      const dataPenghuni = snapshot.data();
      const noPintu = dataPenghuni.No_Pintu;
      const nama = dataPenghuni.Nama;

      const referensiPembayaran = doc(
        database,
        "pembayaran",
        nama + "_" + penghuni
      );
      await setDoc(referensiPembayaran, {
        Total_Tagihan: 3500000,
        Status_Pembayaran: "Belum Lunas",
        Penghuni_ID: penghuni,
        Nama: nama,
        No_Pintu: noPintu,
      });

      toast.success(`Tagihan ${nama} berhasil ditambahkan.`);
    } catch (error) {
      toast.error("Terjadi kesalahan: " + error.message);
    } finally {
      setSedangMemuatTambahPembayaran(false);
    }
  };

  return {
    penghuni,
    setPenghuni,
    tambahPembayaran,
    sedangMemuatTambahPembayaran,
  };
};

export default useTambahPembayaran;
