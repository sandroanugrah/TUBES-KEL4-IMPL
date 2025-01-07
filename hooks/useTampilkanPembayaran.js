import { useState, useEffect, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useTampilkanPembayaran = (batasHalaman = 5) => {
  const [sedangMemuatTampilkanPembayaran, setSedangMemuatTampilkanPembayaran] =
    useState(false);
  const [daftarPembayaran, setDaftarPembayaran] = useState([]);
  const [totalPembayaran, setTotalPembayaran] = useState(0);
  const [halaman, setHalaman] = useState(1);

  const ambilDaftarPembayaran = useCallback(async () => {
    const referensiPembayaran = collection(database, "pembayaran");
    try {
      setSedangMemuatTampilkanPembayaran(true);
      const snapshot = await getDocs(referensiPembayaran);

      const pembayaran = snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      }));

      const pembayaranBelumLunas = pembayaran.filter(
        (item) => item.Status_Pembayaran === "Belum Lunas"
      );
      const pembayaranLunas = pembayaran.filter(
        (item) => item.Status_Pembayaran === "Lunas"
      );

      const pembayaranUrut = [...pembayaranBelumLunas, ...pembayaranLunas];

      setTotalPembayaran(pembayaranUrut.length);

      const startIndex = (halaman - 1) * batasHalaman;
      const endIndex = startIndex + batasHalaman;
      const pembayaranHalamanSaatIni = pembayaranUrut.slice(
        startIndex,
        endIndex
      );

      setDaftarPembayaran(pembayaranHalamanSaatIni);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil daftar pembayaran: " + error.message
      );
    } finally {
      setSedangMemuatTampilkanPembayaran(false);
    }
  }, [halaman, batasHalaman]);

  useEffect(() => {
    ambilDaftarPembayaran();
  }, [ambilDaftarPembayaran]);

  const ambilHalamanSebelumnya = () => {
    if (halaman > 1) {
      setHalaman(halaman - 1);
    }
  };

  const ambilHalamanSelanjutnya = () => {
    const totalHalaman = Math.ceil(totalPembayaran / batasHalaman);
    if (halaman < totalHalaman) {
      setHalaman(halaman + 1);
    }
  };

  return {
    totalPembayaran,
    daftarPembayaran,
    sedangMemuatTampilkanPembayaran,
    halaman,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
  };
};

export default useTampilkanPembayaran;
