import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Info } from "lucide-react";

interface AboutSheetProps {
  trigger?: React.ReactNode;
}

export function AboutSheet({ trigger }: AboutSheetProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        {trigger || (
          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
            <Info className="w-5 h-5" />
          </button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-xl">About Visual Routines</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-8 space-y-4">
          <p className="text-muted-foreground">
            Visual Routines helps kids build independence by turning daily tasks 
            into fun, visual checklists. Perfect for morning routines, bedtime 
            routines, and everything in between.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✓ Visual activity cards kids can understand</p>
            <p>✓ Daily auto-reset for recurring routines</p>
            <p>✓ Export routines as printable PDFs</p>
            <p>✓ Works offline on any device</p>
          </div>
          <p className="text-xs text-muted-foreground/60 pt-4">
            Made with ❤️ for parents and kids
          </p>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
