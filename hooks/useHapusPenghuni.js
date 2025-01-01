import { useState } from "react";
import { doc, deleteDoc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { database } from "@/lib/firebaseConfig";

const useHapusPenghuni = () => {
  const [sedangMemuatHapusPenghuni, setSedangMemuatHapusPenghuni] =
    useState(false);

  const hapusPenghuni = async (id, kamarId) => {
    if (!kamarId) {
      toast.error("ID kamar tidak ditemukan.");
      return;
    }

    try {
      setSedangMemuatHapusPenghuni(true);

      const referensiPenghuni = doc(database, "penghuni", id);
      await deleteDoc(referensiPenghuni);

      const referensiKamar = doc(database, "kamar", kamarId);
      const snapshotKamar = await getDoc(referensiKamar);

      if (snapshotKamar.exists()) {
        await setDoc(referensiKamar, { Status: "Kosong" }, { merge: true });
        toast.success(
          "Penghuni berhasil dihapus dan status kamar diubah menjadi Kosong!"
        );
      } else {
        toast.error("Kamar tidak ditemukan.");
      }
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
