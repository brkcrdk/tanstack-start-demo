import { cx } from 'class-variance-authority';
import { ClassNameValue, twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(cx(inputs));
}
