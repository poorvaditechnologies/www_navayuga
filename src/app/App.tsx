import { MotionConfig } from 'motion/react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export function App() {
  return (
    // Respects the OS "reduce motion" setting for every animation in the app.
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  );
}
