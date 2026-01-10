import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentIndex = LANGUAGES.findIndex(lang => lang.code === i18n.language);
    const nextIndex = (currentIndex + 1) % LANGUAGES.length;
    i18n.changeLanguage(LANGUAGES[nextIndex].code);
  };

  const currentLang = LANGUAGES.find(lang => lang.code === i18n.language) || LANGUAGES[0];

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "flex items-center gap-1.5 px-2 py-1.5 rounded-lg",
        "text-muted-foreground hover:text-foreground hover:bg-muted",
        "transition-colors"
      )}
      title="Change language"
    >
      <Globe className="w-4 h-4" />
      <span className="text-xs font-semibold">{currentLang.label}</span>
    </button>
  );
}
