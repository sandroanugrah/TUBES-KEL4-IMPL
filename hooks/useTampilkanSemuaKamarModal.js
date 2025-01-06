import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { database } from "@/lib/firebaseConfig";

const useTampilkanKamarModal = () => {
  const [sedangMemuatTampilkanKamar, setSedangMemuatTampilkanKamar] =
    useState(false);
  const [daftarKamar, setDaftarKamar] = useState([]);
  const [totalKamar, setTotalKamar] = useState(0);
  const [totalKamarTerisi, setTotalKamarTerisi] = useState(0);
  const [totalKamarTersedia, setTotalKamarTersedia] = useState(0);

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

      // Hitung jumlah kamar terisi dan tersedia
      const terisi = semuaKamar.filter((kamar) => kamar.Status === "Terisi");
      const tersedia = semuaKamar.filter((kamar) => kamar.Status !== "Terisi");

      setTotalKamarTerisi(terisi.length);
      setTotalKamarTersedia(tersedia.length);

      // Tampilkan semua kamar
      setDaftarKamar(semuaKamar);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil daftar kamar: " + error.message
      );
    } finally {
      setSedangMemuatTampilkanKamar(false);
    }
  }, []);

  useEffect(() => {
    ambilDaftarKamar();
  }, [ambilDaftarKamar]);

  return {
    totalKamar,
    totalKamarTerisi,
    totalKamarTersedia,
    daftarKamar,
    sedangMemuatTampilkanKamar,
  };
};

export default useTampilkanKamarModal;
