import { useState } from "react";
import {
  doc,
  deleteDoc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
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

      const referensiPembayaran = collection(database, "pembayaran");
      const q = query(referensiPembayaran, where("Penghuni_ID", "==", id));
      const snapshotPembayaran = await getDocs(q);

      snapshotPembayaran.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      const referensiKamar = doc(database, "kamar", kamarId);
      const snapshotKamar = await getDoc(referensiKamar);

      if (snapshotKamar.exists()) {
        await setDoc(referensiKamar, { Status: "Kosong" }, { merge: true });
        toast.success(
          "Penghuni berhasil dihapus, status kamar diubah menjadi Kosong, dan data pembayaran terkait telah dihapus!"
        );
      } else {
        toast.error("Kamar tidak ditemukan.");
      }
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat menghapus penghuni dan pembayaran terkait: " +
          error.message
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
