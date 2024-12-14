import { useState } from "react";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database, auth } from "@/lib/firebaseConfig";

const useTambahKamar = () => {
  const [noPintu, setNoPintu] = useState("");
  const [lantai, setLantai] = useState("");
  const [status, setStatus] = useState("");
  const [fasilitas, setFasilitas] = useState("");
  const [sedangMemuatTambahKamar, setSedangMemuatTambahKamar] = useState(false);

  const validasiFormulir = () => {
    let sesuai = true;
    let pesanKesalahan = "";

    !noPintu
      ? ((sesuai = false), (pesanKesalahan += "No Pintu harus diisi. "))
      : null;
    !lantai
      ? ((sesuai = false), (pesanKesalahan += "Lantai harus diisi. "))
      : null;
    !status
      ? ((sesuai = false), (pesanKesalahan += "Status harus dipilih. "))
      : null;
    !fasilitas
      ? ((sesuai = false), (pesanKesalahan += "Fasilitas harus diisi. "))
      : null;

    if (!sesuai) {
      toast.error(pesanKesalahan.trim());
    }

    return sesuai;
  };

  const tambahKamar = async () => {
    if (!validasiFormulir()) return;

    setSedangMemuatTambahKamar(true);

    try {
      const referensiKamar = collection(database, "kamar");
      const dataKamar = {
        No_Pintu: noPintu,
        Lantai: lantai,
        Status: status,
        Fasilitas: fasilitas,
        Tanggal_Pembuatan_Kamar: serverTimestamp(),
      };

      await setDoc(doc(referensiKamar), dataKamar);
      toast.success("Kamar berhasil ditambahkan!");
      aturUlangFormulir();
    } catch (error) {
      toast.error("Terjadi kesalahan saat menambahkan kamar: " + error.message);
    } finally {
      setSedangMemuatTambahKamar(false);
    }
  };

  const aturUlangFormulir = () => {
    setNoPintu("");
    setLantai("");
    setStatus("");
    setFasilitas("");
  };

  return {
    noPintu,
    lantai,
    status,
    fasilitas,
    setNoPintu,
    setLantai,
    setStatus,
    setFasilitas,
    tambahKamar,
    aturUlangFormulir,
    sedangMemuatTambahKamar,
  };
};

export default useTambahKamar;
