import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

type ImageProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {};

/** Full-width `<img>` with `alt` and `loading` defaults. Accepts every native `<img>` attribute. */
export const Image = ({ alt = '', loading = 'eager', ...props }: ImageProps) => {
  return <img loading={loading} alt={alt} {...props} width='100%' />;
};
