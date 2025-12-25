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
           Executive functions are cognitive processes that help us plan, 
           focus attention, remember instructions, and manage multiple tasks 
           successfully. For children, especially those with autism or ADHD, 
           these skills can be challenging. Visual routines—such as step-by-step 
           picture schedules or illustrated checklists—support executive
           functioning by providing clear, predictable guidance. They reduce 
           cognitive load, help with task initiation and completion, and promote 
           independence by making abstract concepts like time, order, 
           and priorities more concrete and accessible.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✓ Visual activity cards kids can understand</p>
            <p>✓ Explore templates to get started</p>
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
