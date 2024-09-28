'use client';

import { useTheme } from 'next-themes';
import cn from '@/utils/class-names';
import { Button } from '@/components/ui/button';
import SimpleBar from '@/components/ui/simplebar';
import { useColorPresetName } from '@/hooks/use-theme-color';

export default function SettingsDrawer() {
  const { theme } = useTheme();
  const { colorPresetName } = useColorPresetName();

  return (
    <>
      <SimpleBar className="h-[calc(100%-138px)]">
        <div className="px-5 py-6">
        </div>
      </SimpleBar>

      <a
        href="https://themeforest.net/item/isomorphic-react-redux-admin-dashboard/20262330?ref=redqteam"
        target="_blank"
        className="grid grid-cols-1 border-t border-gray-200 px-6 pt-4"
      >
        <Button
          size="lg"
          tag="span"
          color="primary"
          className={cn(
            'text-base font-semibold',
            theme === 'dark' &&
              colorPresetName === 'black' &&
              'dark:text-gray-0'
          )}
        >
          <span className="">Purchase for $24</span>
        </Button>
      </a>
    </>
  );
}
