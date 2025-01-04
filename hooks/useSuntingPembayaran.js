import { useState, useEffect } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { database } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";

export default function useSuntingPembayaran(idPembayaran) {
  const [sisaTagihan, setSisaTagihan] = useState(0);
  const [statusPembayaran, setStatusPembayaran] = useState("Belum Lunas");
  const [jumlahBayar, setJumlahBayar] = useState(0);
  const [sedangMemuatSuntingPembayaran, setSedangMemuatSuntingPembayaran] =
    useState(false);

  const ambilDataPembayaran = async () => {
    try {
      const pembayaranRef = doc(database, "pembayaran", idPembayaran);
      const docSnap = await getDoc(pembayaranRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setSisaTagihan(data.Sisa_Tagihan || 0);
        setStatusPembayaran(data.Status_Pembayaran || "Belum Lunas");
      } else {
        toast.error("Data pembayaran tidak ditemukan!");
      }
    } catch (error) {
      toast.error("Gagal mengambil data pembayaran: " + error.message);
    }
  };

  const validasiFormulir = () => {
    if (jumlahBayar <= 0) {
      toast.error("Masukkan jumlah bayar yang valid");
      return false;
    }
    return true;
  };

  const suntingPembayaran = async () => {
    setSedangMemuatSuntingPembayaran(true);

    if (!validasiFormulir()) {
      setSedangMemuatSuntingPembayaran(false);
      return;
    }

    try {
      let sisa = sisaTagihan - jumlahBayar;
      let status = "Belum Lunas";

      if (sisa <= 0) {
        sisa = 0;
        status = "Lunas";
      }

      const pembayaranRef = doc(database, "pembayaran", idPembayaran);
      await updateDoc(pembayaranRef, {
        Sisa_Tagihan: sisa,
        Status_Pembayaran: status,
      });

      toast.success("Pembayaran berhasil disunting!");
    } catch (error) {
      toast.error("Gagal menyunting pembayaran: " + error.message);
      console.error("Error menyunting pembayaran:", error);
    } finally {
      setSedangMemuatSuntingPembayaran(false);
    }
  };

  useEffect(() => {
    if (idPembayaran) {
      ambilDataPembayaran();
    }
  }, [idPembayaran]);

  return {
    sisaTagihan,
    statusPembayaran,
    jumlahBayar,
    setJumlahBayar,
    sedangMemuatSuntingPembayaran,
    suntingPembayaran,
  };
}
