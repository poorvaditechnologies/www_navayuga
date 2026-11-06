import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, MessageCircle, SendHorizontal, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { logo } from '@/assets/images';
import { useLanguage } from '@/i18n';
import { EASE_OUT } from '@/lib/motion';
import { getReply, type ChatAction, type ChatMessage } from '@/services/chat';
import styles from './ChatWidget.module.css';

function ActionChip({ action, onNavigate }: { action: ChatAction; onNavigate: () => void }) {
  const content = (
    <>
      {action.label} <ArrowUpRight size={14} />
    </>
  );
  if (action.external) {
    const isWeb = action.href.startsWith('http');
    return (
      <a
        href={action.href}
        className={styles.chip}
        {...(isWeb ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link to={action.href} className={styles.chip} onClick={onNavigate}>
      {content}
    </Link>
  );
}

export function ChatWidget() {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
  }, [messages, pending]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const ask = async (question: string) => {
    const text = question.trim();
    if (!text || pending) return;
    const history: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(history);
    setInput('');
    setPending(true);
    try {
      const reply = await getReply(history, lang, t);
      setMessages((prev) => [...prev, reply]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: t.chat.error }]);
    } finally {
      setPending(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.panel}
            role="dialog"
            aria-label={t.chat.title}
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            <header className={styles.header}>
              <img src={logo} alt="" className={styles.avatar} width={40} height={40} />
              <div className={styles.headerText}>
                <strong>{t.chat.title}</strong>
                <span>
                  <i className={styles.online} /> {t.chat.status}
                </span>
              </div>
              <button
                type="button"
                className={styles.iconButton}
                onClick={() => setOpen(false)}
                aria-label={t.chat.close}
              >
                <X size={20} />
              </button>
            </header>

            <div ref={listRef} className={styles.messages} aria-live="polite" data-lenis-prevent>
              <div className={`${styles.bubble} ${styles.assistant}`}>{t.chat.greeting}</div>

              {messages.length === 0 && (
                <div className={styles.suggestions} aria-label={t.chat.suggestionsLabel}>
                  {t.chat.suggestions.map((s, i) => (
                    <motion.button
                      key={s}
                      type="button"
                      className={styles.suggestion}
                      onClick={() => ask(s)}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.06 }}
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              )}

              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  className={`${styles.row} ${m.role === 'user' ? styles.rowUser : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                >
                  <div className={`${styles.bubble} ${styles[m.role]}`}>{m.content}</div>
                  {m.actions && m.actions.length > 0 && (
                    <div className={styles.chips}>
                      {m.actions.map((a) => (
                        <ActionChip key={a.href} action={a} onNavigate={() => setOpen(false)} />
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              <AnimatePresence>
                {pending && (
                  <motion.div
                    className={`${styles.bubble} ${styles.assistant} ${styles.typing}`}
                    aria-label={t.chat.typing}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <span />
                    <span />
                    <span />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <form className={styles.composer} onSubmit={onSubmit}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.chat.placeholder}
                aria-label={t.chat.placeholder}
                maxLength={500}
              />
              <button
                type="submit"
                className={styles.send}
                disabled={!input.trim() || pending}
                aria-label={t.chat.send}
              >
                <SendHorizontal size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className={`${styles.fab} ${open ? styles.fabOpen : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t.chat.close : t.chat.open}
        aria-expanded={open}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            className={styles.fabIcon}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X size={24} /> : <MessageCircle size={26} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  );
}
