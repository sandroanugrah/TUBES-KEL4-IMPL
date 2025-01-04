import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useTampilkanPembayaran = () => {
  const [sedangMemuatTampilkanPembayaran, setSedangMemuatTampilkanPembayaran] =
    useState(false);
  const [daftarPembayaran, setDaftarPembayaran] = useState([]);
  const [totalPembayaran, setTotalPembayaran] = useState(0);

  const ambilDaftarPembayaran = async () => {
    const referensiPembayaran = collection(database, "pembayaran");
    try {
      setSedangMemuatTampilkanPembayaran(true);
      const snapshot = await getDocs(referensiPembayaran);

      const pembayaran = snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      }));

      setDaftarPembayaran(pembayaran);
      setTotalPembayaran(pembayaran.length);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil daftar pembayaran: " + error.message
      );
    } finally {
      setSedangMemuatTampilkanPembayaran(false);
    }
  };

  useEffect(() => {
    ambilDaftarPembayaran();
  }, []);

  return {
    totalPembayaran,
    daftarPembayaran,
    sedangMemuatTampilkanPembayaran,
  };
};

export default useTampilkanPembayaran;
