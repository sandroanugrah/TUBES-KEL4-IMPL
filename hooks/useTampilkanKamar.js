import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { database } from "@/lib/firebaseConfig";

const useTampilkanKamar = () => {
  const [sedangMemuatTampilkanKamar, setSedangMemuatTampilkanKamar] =
    useState(false);
  const [daftarKamar, setDaftarKamar] = useState([]);
  const [totalKamar, setTotalKamar] = useState(0);

  const ambilDaftarKamar = async () => {
    const referensiKamar = collection(database, "kamar");
    const queryKamar = query(
      referensiKamar,
      orderBy("Tanggal_Pembuatan_Kamar", "asc")
    );

    try {
      setSedangMemuatTampilkanKamar(true);
      const snapshot = await getDocs(queryKamar);

      const kamars = snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      }));

      setDaftarKamar(kamars);
      setTotalKamar(kamars.length);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil daftar kamar: " + error.message
      );
    } finally {
      setSedangMemuatTampilkanKamar(false);
    }
  };

  useEffect(() => {
    ambilDaftarKamar();
  }, []);

  return {
    totalKamar,
    daftarKamar,
    sedangMemuatTampilkanKamar,
  };
};

export default useTampilkanKamar;
