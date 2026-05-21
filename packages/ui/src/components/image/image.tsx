import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

type ImageProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {};

export const Image = ({ alt = '', loading = 'eager', ...props }: ImageProps) => {
  return <img loading={loading} alt={alt} {...props} width='100%' />;
};
