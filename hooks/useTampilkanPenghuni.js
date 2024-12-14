import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useTampilkanPenghuni = () => {
  const [sedangMemuatTampilkanPenghuni, setSedangMemuatTampilkanPenghuni] =
    useState(false);
  const [daftarPenghuni, setDaftarPenghuni] = useState([]);
  const [totalPenghuni, setTotalPenghuni] = useState(0);

  const ambilDaftarPenghuni = async () => {
    const referensiPenghuni = collection(database, "penghuni");
    try {
      setSedangMemuatTampilkanPenghuni(true);
      const snapshot = await getDocs(referensiPenghuni);

      const penghuni = snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      }));

      setDaftarPenghuni(penghuni);
      setTotalPenghuni(penghuni.length);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil daftar penghuni: " + error.message
      );
    } finally {
      setSedangMemuatTampilkanPenghuni(false);
    }
  };

  useEffect(() => {
    ambilDaftarPenghuni();
  }, []);

  return {
    totalPenghuni,
    daftarPenghuni,
    sedangMemuatTampilkanPenghuni,
  };
};

export default useTampilkanPenghuni;
