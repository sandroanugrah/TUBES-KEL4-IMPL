import { useState } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useHapusKamar = () => {
  const [sedangMemuatHapusKamar, setSedangMemuatHapusKamar] = useState(false);

  const hapusKamar = async (id) => {
    try {
      setSedangMemuatHapusKamar(true);

      // Ambil data kamar berdasarkan ID
      const referensiKamar = doc(database, "kamar", id);
      const snapshot = await getDoc(referensiKamar);

      if (!snapshot.exists()) {
        throw new Error("Data kamar tidak ditemukan.");
      }

      const dataKamar = snapshot.data();

      if (dataKamar.Status === "Terisi") {
        toast.error("Kamar tidak dapat dihapus karena masih ada penghuninya");
        return;
      }

      await deleteDoc(referensiKamar);
      toast.success("Kamar berhasil dihapus!");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus kamar: " + error.message);
    } finally {
      setSedangMemuatHapusKamar(false);
    }
  };

  return {
    sedangMemuatHapusKamar,
    hapusKamar,
  };
};

export default useHapusKamar;
