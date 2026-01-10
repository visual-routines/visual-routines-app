import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type GenderOption = "boy" | "girl";

interface GenderSelectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (gender: GenderOption) => void;
}

export function GenderSelectDialog({
  open,
  onOpenChange,
  onSelect,
}: GenderSelectDialogProps) {
  const { t } = useTranslation();

  const handleSelect = (gender: GenderOption) => {
    onSelect(gender);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[340px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">{t("gender.title")}</DialogTitle>
          <DialogDescription className="text-center">
            {t("gender.description")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-6 hover:bg-blue-50 hover:border-blue-300"
            onClick={() => handleSelect("boy")}
          >
            <span className="text-4xl">👦</span>
            <span className="font-medium">{t("gender.boy")}</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-6 hover:bg-pink-50 hover:border-pink-300"
            onClick={() => handleSelect("girl")}
          >
            <span className="text-4xl">👧</span>
            <span className="font-medium">{t("gender.girl")}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
