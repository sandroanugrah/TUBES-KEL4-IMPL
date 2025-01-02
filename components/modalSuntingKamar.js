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
  Textarea,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";
// PENGAIT KAMI
import useSuntingKamar from "@/hooks/useSuntingKamar";

const ModalSuntingKamar = ({ terbuka, tertutup, kamarYangTerpilih }) => {
  useEffect(() => {
    if (!kamarYangTerpilih) {
      tertutup(false);
    }
  }, [kamarYangTerpilih, tertutup]);

  const {
    noPintu,
    setNoPintu,
    lantai,
    setLantai,
    fasilitas,
    setFasilitas,
    suntingKamar,
    sedangMemuatSuntingKamar,
  } = useSuntingKamar(kamarYangTerpilih);

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

      <DialogHeader className="text-black">Sunting Kamar</DialogHeader>
      <DialogBody divider>
        <form className="flex flex-col gap-4">
          <Typography className="-mb-2" variant="h6">
            Nomor Pintu
          </Typography>
          <Input
            label="Masukkan Nomor Pintu"
            size="lg"
            value={noPintu}
            onChange={(e) => setNoPintu(e.target.value)}
          />

          <Typography className="-mb-2" variant="h6">
            Lantai
          </Typography>
          <Input
            type="text"
            label="Masukkan Lantai"
            size="lg"
            value={lantai}
            onChange={(e) => setLantai(e.target.value)}
          />

          <Typography className="-mb-2" variant="h6">
            Fasilitas
          </Typography>
          <Textarea
            label="Masukkan Fasilitas Kamar"
            size="lg"
            value={fasilitas}
            onChange={(e) => setFasilitas(e.target.value)}
          />
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          onClick={async () => {
            await suntingKamar();
            tertutup(false);
          }}
          variant="gradient"
          color="black"
          disabled={sedangMemuatSuntingKamar}
          className={`${
            sedangMemuatSuntingKamar
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
          }`}
        >
          {sedangMemuatSuntingKamar ? <Memuat /> : "Sunting Kamar"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalSuntingKamar;
