import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useTampilkanAdmin = () => {
  const [sedangMemuatTampilkanAdmin, setSedangMemuatTampilkanAdmin] =
    useState(false);
  const [daftarAdmin, setDaftarAdmin] = useState([]);
  const [totalAdmin, setTotalAdmin] = useState(0);

  const ambilDaftarAdmin = async () => {
    const referensiAdmin = collection(database, "admin");
    try {
      setSedangMemuatTampilkanAdmin(true);
      const snapshot = await getDocs(referensiAdmin);

      const admins = snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      }));

      setDaftarAdmin(admins);
      setTotalAdmin(admins.length);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengambil daftar admin: " + error.message
      );
    } finally {
      setSedangMemuatTampilkanAdmin(false);
    }
  };

  useEffect(() => {
    ambilDaftarAdmin();
  }, []);

  return {
    totalAdmin,
    daftarAdmin,
    sedangMemuatTampilkanAdmin,
  };
};

export default useTampilkanAdmin;
