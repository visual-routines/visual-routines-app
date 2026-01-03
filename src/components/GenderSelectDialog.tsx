import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type GenderOption = "boy" | "girl" | "neutral";

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
  const handleSelect = (gender: GenderOption) => {
    onSelect(gender);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[340px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Choose Icon Style</DialogTitle>
          <DialogDescription className="text-center">
            Select which version of activity icons to use in the PDF
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-3 py-4">
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-blue-50 hover:border-blue-300"
            onClick={() => handleSelect("boy")}
          >
            <span className="text-3xl">👦</span>
            <span className="font-medium">Boy</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-pink-50 hover:border-pink-300"
            onClick={() => handleSelect("girl")}
          >
            <span className="text-3xl">👧</span>
            <span className="font-medium">Girl</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-gray-50 hover:border-gray-300"
            onClick={() => handleSelect("neutral")}
          >
            <span className="text-3xl">🧒</span>
            <span className="font-medium">Neutral</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
