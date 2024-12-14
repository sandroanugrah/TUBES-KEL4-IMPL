import { useState } from "react";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
// PERPUSTAKAAN KAMI
import { database, auth } from "@/lib/firebaseConfig";

const useTambahAdmin = () => {
  const [namaLengkap, setNamaLengkap] = useState("");
  const [namaPengguna, setNamaPengguna] = useState("");
  const [email, setEmail] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [alamat, setAlamat] = useState("");
  const [password, setPassword] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [sedangMemuatTambahAdmin, setSedangMemuatTambahAdmin] = useState(false);

  const validasiFormulir = () => {
    let sesuai = true;
    let pesanKesalahan = "";

    !namaLengkap
      ? ((sesuai = false), (pesanKesalahan += "Nama Lengkap harus diisi. "))
      : null;
    !namaPengguna
      ? ((sesuai = false), (pesanKesalahan += "Nama Pengguna harus diisi. "))
      : null;
    !email
      ? ((sesuai = false), (pesanKesalahan += "Email harus diisi. "))
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? ((sesuai = false), (pesanKesalahan += "Format email tidak sesuai. "))
      : null;
    !password
      ? ((sesuai = false), (pesanKesalahan += "Password harus diisi. "))
      : null;
    if (!jenisKelamin) {
      sesuai = false;
      pesanKesalahan += "Jenis Kelamin harus dipilih. ";
    }

    if (!sesuai) {
      toast.error(pesanKesalahan.trim());
    }

    return sesuai;
  };

  const tambahAdmin = async () => {
    if (!validasiFormulir()) return;

    setSedangMemuatTambahAdmin(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const referensiAdmin = collection(database, "admin");
      const dataAdmin = {
        Nama_Lengkap: namaLengkap,
        Nama_Pengguna: namaPengguna,
        Email: email,
        No_Telepon: noTelepon,
        Alamat: alamat,
        Kata_Sandi: password,
        Jenis_Kelamin: jenisKelamin,
        Tanggal_Pembuatan_Akun: serverTimestamp(),
      };

      await setDoc(doc(referensiAdmin, user.uid), dataAdmin);
      toast.success("Admin berhasil ditambahkan!");
      aturUlangFormulir();
    } catch (error) {
      toast.error("Terjadi kesalahan saat menambahkan admin: " + error.message);
    } finally {
      setSedangMemuatTambahAdmin(false);
    }
  };

  const aturUlangFormulir = () => {
    setNamaLengkap("");
    setNamaPengguna("");
    setEmail("");
    setNoTelepon("");
    setAlamat("");
    setPassword("");
    setJenisKelamin("");
  };

  return {
    email,
    noTelepon,
    alamat,
    password,
    namaLengkap,
    jenisKelamin,
    setNamaLengkap,
    namaPengguna,
    setNamaPengguna,
    setEmail,
    setNoTelepon,
    setAlamat,
    setPassword,
    setJenisKelamin,
    tambahAdmin,
    aturUlangFormulir,
    sedangMemuatTambahAdmin,
  };
};

export default useTambahAdmin;
