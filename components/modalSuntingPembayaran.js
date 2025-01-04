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
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";
// PENGAIT KAMI
import useSuntingPembayaran from "@/hooks/useSuntingPembayaran";

const ModalSuntingPembayaran = ({
  terbuka,
  tertutup,
  pembayaranYangTerpilih,
}) => {
  useEffect(() => {
    if (!pembayaranYangTerpilih) {
      tertutup(false);
    }
  }, [pembayaranYangTerpilih, tertutup]);

  const {
    sisaTagihan,
    statusPembayaran,
    jumlahBayar,
    setJumlahBayar,
    sedangMemuatSuntingPembayaran,
    suntingPembayaran,
  } = useSuntingPembayaran(pembayaranYangTerpilih);

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

      <DialogHeader className="text-black">Sunting Pembayaran</DialogHeader>
      <DialogBody divider>
        <form className="flex flex-col gap-6">
          <Typography className="-mb-2" variant="h6">
            Sisa Tagihan:{" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 2,
            }).format(sisaTagihan)}
          </Typography>
          <Input
            label="Masukkan Jumlah Pembayaran"
            size="lg"
            value={jumlahBayar}
            onChange={(e) => setJumlahBayar(e.target.value)}
            type="number"
          />
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          onClick={async () => {
            await suntingPembayaran();
            tertutup(false);
          }}
          variant="gradient"
          color="black"
          disabled={sedangMemuatSuntingPembayaran}
          className={`${
            sedangMemuatSuntingPembayaran
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
          }`}
        >
          {sedangMemuatSuntingPembayaran ? <Memuat /> : "Sunting Pembayaran"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalSuntingPembayaran;
