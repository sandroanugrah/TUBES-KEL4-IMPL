import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { database } from "@/lib/firebaseConfig";

const useTampilkanKamar = (batasHalaman = 5) => {
  const [sedangMemuatTampilkanKamar, setSedangMemuatTampilkanKamar] =
    useState(false);
  const [daftarKamar, setDaftarKamar] = useState([]);
  const [totalKamar, setTotalKamar] = useState(0);
  const [halaman, setHalaman] = useState(1);

  const ambilDaftarKamar = useCallback(async () => {
    const referensiKamar = collection(database, "kamar");
    const queryKamar = query(
      referensiKamar,
      orderBy("Tanggal_Pembuatan_Kamar", "asc")
    );

    try {
      setSedangMemuatTampilkanKamar(true);
      const snapshot = await getDocs(queryKamar);

      const semuaKamar = snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      }));

      setTotalKamar(semuaKamar.length);

      const startIndex = (halaman - 1) * batasHalaman;
      const endIndex = startIndex + batasHalaman;
      const kamarHalamanSaatIni = semuaKamar.slice(startIndex, endIndex);

      setDaftarKamar(kamarHalamanSaatIni);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil daftar kamar: " + error.message
      );
    } finally {
      setSedangMemuatTampilkanKamar(false);
    }
  }, [halaman, batasHalaman]);

  useEffect(() => {
    ambilDaftarKamar();
  }, [ambilDaftarKamar]);

  const ambilHalamanSebelumnya = () => {
    if (halaman > 1) {
      setHalaman(halaman - 1);
    }
  };

  const ambilHalamanSelanjutnya = () => {
    const totalHalaman = Math.ceil(totalKamar / batasHalaman);
    if (halaman < totalHalaman) {
      setHalaman(halaman + 1);
    }
  };

  return {
    totalKamar,
    daftarKamar,
    sedangMemuatTampilkanKamar,
    halaman,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
  };
};

export default useTampilkanKamar;
