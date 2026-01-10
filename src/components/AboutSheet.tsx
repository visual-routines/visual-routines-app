import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

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
          <DrawerTitle className="text-xl">{t("about.title")}</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-8 space-y-4">
          <p className="text-muted-foreground">
            {t("about.description")}
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✓ {t("about.feature1")}</p>
            <p>✓ {t("about.feature2")}</p>
            <p>✓ {t("about.feature3")}</p>
            <p>✓ {t("about.feature4")}</p>
            <p>✓ {t("about.feature5")}</p>
          </div>
          <p className="text-xs text-muted-foreground/60 pt-4">
            {t("about.madeWith")}
          </p>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
