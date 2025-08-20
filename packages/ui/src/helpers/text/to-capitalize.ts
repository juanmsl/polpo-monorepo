export type ToCapitalizeOptions = Partial<{
  separator: string;
  join: string;
  variant: 'first-word' | 'each-word';
}>;

export const toCapitalize = (text: string, options: ToCapitalizeOptions = {}) => {
  const { separator = ' ', variant = 'each-word', join = separator } = options;

  if (variant === 'first-word') {
    return text[0].toUpperCase() + text.slice(1);
  }

  const words = text.split(separator);

  return words.map(word => word[0].toUpperCase() + word.slice(1)).join(join);
};
