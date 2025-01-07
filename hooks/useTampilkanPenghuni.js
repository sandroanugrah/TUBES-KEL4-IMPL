import { useState, useEffect, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useTampilkanPenghuni = (batasHalaman = 5) => {
  const [sedangMemuatTampilkanPenghuni, setSedangMemuatTampilkanPenghuni] =
    useState(false);
  const [daftarPenghuni, setDaftarPenghuni] = useState([]);
  const [totalPenghuni, setTotalPenghuni] = useState(0);
  const [halaman, setHalaman] = useState(1);

  const ambilDaftarPenghuni = useCallback(async () => {
    const referensiPenghuni = collection(database, "penghuni");
    try {
      setSedangMemuatTampilkanPenghuni(true);
      const snapshot = await getDocs(referensiPenghuni);

      const semuaPenghuni = snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      }));

      setTotalPenghuni(semuaPenghuni.length);

      const startIndex = (halaman - 1) * batasHalaman;
      const endIndex = startIndex + batasHalaman;
      const penghuniHalamanSaatIni = semuaPenghuni.slice(startIndex, endIndex);

      setDaftarPenghuni(penghuniHalamanSaatIni);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil daftar penghuni: " + error.message
      );
    } finally {
      setSedangMemuatTampilkanPenghuni(false);
    }
  }, [halaman, batasHalaman]);

  useEffect(() => {
    ambilDaftarPenghuni();
  }, [ambilDaftarPenghuni]);

  const ambilHalamanSebelumnya = () => {
    if (halaman > 1) {
      setHalaman(halaman - 1);
    }
  };

  const ambilHalamanSelanjutnya = () => {
    const totalHalaman = Math.ceil(totalPenghuni / batasHalaman);
    if (halaman < totalHalaman) {
      setHalaman(halaman + 1);
    }
  };

  return {
    totalPenghuni,
    daftarPenghuni,
    sedangMemuatTampilkanPenghuni,
    halaman,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
  };
};

export default useTampilkanPenghuni;
