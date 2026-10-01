import type { AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'outline';

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: Variant;
}

export function Button({ children, variant = 'primary', className = '', ...rest }: ButtonProps) {
  return (
    <a className={`${styles.button} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
