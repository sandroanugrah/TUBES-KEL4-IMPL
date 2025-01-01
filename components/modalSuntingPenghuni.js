import React, { useEffect } from "react";
import {
  Dialog,
  Typography,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Input,
  Button,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";
// PENGAIT KAMI
import useSuntingPenghuni from "@/hooks/useSuntingPenghuni";

const ModalSuntingPenghuni = ({ terbuka, tertutup, penghuniYangTerpilih }) => {
  // Validasi untuk memastikan penghuniYangTerpilih berisi ID yang valid
  useEffect(() => {
    if (!penghuniYangTerpilih) {
      tertutup(false);
    }
  }, [penghuniYangTerpilih, tertutup]);

  const {
    nama,
    setNama,
    jenisKelamin,
    setJenisKelamin,
    noTelepon,
    setNoTelepon,
    alamat,
    setAlamat,
    suntingPenghuni,
    sedangMemuatSuntingPenghuni,
  } = useSuntingPenghuni(penghuniYangTerpilih);

  return (
    <Dialog
      open={terbuka}
      handler={tertutup}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="sm"
      className="bg-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-4"
    >
      <div className="absolute top-3 right-3">
        <IconButton
          variant="text"
          color="red"
          onClick={() => tertutup(false)}
          className="text-red-500 hover:bg-transparent"
        >
          <XMarkIcon className="h-6 w-6" />
        </IconButton>
      </div>

      <DialogHeader className="text-black">Sunting Penghuni</DialogHeader>
      <DialogBody divider>
        <form className="flex flex-col gap-4">
          <Typography className="-mb-2" variant="h6">
            Nama Penghuni
          </Typography>
          <Input
            label="Masukkan Nama Penghuni"
            size="lg"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />

          <Typography className="-mb-2" variant="h6">
            Jenis Kelamin
          </Typography>
          <Select
            label="Pilih Jenis Kelamin"
            size="lg"
            value={jenisKelamin}
            onChange={(value) => setJenisKelamin(value)}
          >
            <Option value="Pria">Pria</Option>
            <Option value="Wanita">Wanita</Option>
          </Select>
          <Typography className="-mb-2" variant="h6">
            Nomor Telepon
          </Typography>
          <Input
            type="text"
            label="Masukkan Nomor Telepon"
            size="lg"
            value={noTelepon}
            onChange={(e) => setNoTelepon(e.target.value)}
          />

          <Typography className="-mb-2" variant="h6">
            Alamat
          </Typography>
          <Textarea
            label="Masukkan Alamat Penghuni"
            size="lg"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
          />
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          onClick={async () => {
            await suntingPenghuni();
            tertutup(false);
          }}
          variant="gradient"
          color="black"
          disabled={sedangMemuatSuntingPenghuni}
          className={`${
            sedangMemuatSuntingPenghuni
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
          }`}
        >
          {sedangMemuatSuntingPenghuni ? <Memuat /> : "Sunting Penghuni"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalSuntingPenghuni;
