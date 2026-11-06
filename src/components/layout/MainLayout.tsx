import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLocation, useOutlet } from 'react-router-dom';
import { BackToTop, ScrollProgress } from '@/components/animations';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { jumpToTop, scrollToTarget, startSmoothScroll } from '@/lib/smoothScroll';
import { CookieBanner } from './CookieBanner';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

function FrozenOutlet() {
  const outlet = useOutlet();
  const [frozen] = useState(outlet);
  return frozen;
}

export function MainLayout() {
  const { pathname, hash } = useLocation();

  useEffect(() => startSmoothScroll(), []);

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (!el) return;
    const id = window.setTimeout(() => scrollToTarget(el), 350);
    return () => window.clearTimeout(id);
  }, [pathname, hash]);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => {
          if (!window.location.hash) jumpToTop();
        }}
      >
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <FrozenOutlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <BackToTop />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
