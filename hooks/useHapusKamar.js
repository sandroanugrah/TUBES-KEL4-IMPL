import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database } from "@/lib/firebaseConfig";

const useHapusKamar = () => {
  const [sedangMemuatHapusKamar, setSedangMemuatHapusKamar] = useState(false);

  const hapusKamar = async (id) => {
    try {
      setSedangMemuatHapusKamar(true);
      const referensiKamar = doc(database, "kamar", id);
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
