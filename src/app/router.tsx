import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// Add new pages here. Each page lives in src/pages and is composed of sections.
export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: '/programs/:id',
        lazy: async () => ({
          Component: (await import('@/pages/ProgramDetailPage')).ProgramDetailPage,
        }),
      },
      {
        path: '/details',
        lazy: async () => ({
          Component: (await import('@/pages/AboutDetailsPage')).AboutDetailsPage,
        }),
      },
      {
        path: '/gallery',
        lazy: async () => ({ Component: (await import('@/pages/GalleryPage')).GalleryPage }),
      },
      {
        path: '/contact',
        lazy: async () => ({ Component: (await import('@/pages/ContactPage')).ContactPage }),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
