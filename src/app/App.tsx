import { MotionConfig } from 'motion/react';
import { RouterProvider } from 'react-router-dom';
import { ConsentProvider } from '@/consent';
import { LanguageProvider } from '@/i18n';
import { router } from './router';

export function App() {
  return (
    <LanguageProvider>
      <ConsentProvider>
        {/* Respects the OS "reduce motion" setting for every animation in the app. */}
        <MotionConfig reducedMotion="user">
          <RouterProvider router={router} />
        </MotionConfig>
      </ConsentProvider>
    </LanguageProvider>
  );
}
