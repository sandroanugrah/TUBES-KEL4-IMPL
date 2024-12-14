import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { database } from "@/lib/firebaseConfig";

const useHapusPenghuni = () => {
  const [sedangMemuatHapusPenghuni, setSedangMemuatHapusPenghuni] =
    useState(false);

  const hapusPenghuni = async (id) => {
    try {
      setSedangMemuatHapusPenghuni(true);
      const referensiPenghuni = doc(database, "penghuni", id);
      await deleteDoc(referensiPenghuni);
      toast.success("Penghuni berhasil dihapus!");
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat menghapus penghuni: " + error.message
      );
    } finally {
      setSedangMemuatHapusPenghuni(false);
    }
  };

  return {
    sedangMemuatHapusPenghuni,
    hapusPenghuni,
  };
};

export default useHapusPenghuni;
