import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { database } from "@/lib/firebaseConfig";

export default function useSuntingKamar(idKamar) {
  const [noPintu, setNoPintu] = useState("");
  const [lantai, setLantai] = useState("");
  const [fasilitas, setFasilitas] = useState("");
  const [sedangMemuatSuntingKamar, setSedangMemuatSuntingKamar] =
    useState(false);

  const ambilDataKamar = async () => {
    try {
      const kamarRef = doc(database, "kamar", idKamar);
      const docSnap = await getDoc(kamarRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setNoPintu(data.No_Pintu || "");
        setLantai(data.Lantai || "");
        setFasilitas(data.Fasilitas || "");
      } else {
        toast.error("Data kamar tidak ditemukan!");
      }
    } catch (error) {
      toast.error("Gagal mengambil data kamar: " + error.message);
    }
  };

  const validasiFormulir = () =>
    !noPintu
      ? (toast.error("Masukkan nomor pintu"), false)
      : !lantai
      ? (toast.error("Masukkan lantai"), false)
      : !fasilitas
      ? (toast.error("Masukkan fasilitas"), false)
      : true;

  const suntingKamar = async () => {
    setSedangMemuatSuntingKamar(true);

    if (!validasiFormulir()) {
      setSedangMemuatSuntingKamar(false);
      return;
    }

    try {
      const kamarRef = doc(database, "kamar", idKamar);
      await updateDoc(kamarRef, {
        No_Pintu: noPintu,
        Lantai: lantai,
        Fasilitas: fasilitas,
      });

      toast.success("Data kamar berhasil disunting!");
    } catch (error) {
      toast.error("Gagal menyunting data kamar: " + error.message);
      console.error("Error menyunting data kamar:", error);
    } finally {
      setSedangMemuatSuntingKamar(false);
    }
  };

  useEffect(() => {
    if (idKamar) {
      ambilDataKamar();
    }
  }, [idKamar]);

  return {
    noPintu,
    lantai,
    fasilitas,
    setNoPintu,
    setLantai,
    setFasilitas,
    sedangMemuatSuntingKamar,
    suntingKamar,
  };
}
