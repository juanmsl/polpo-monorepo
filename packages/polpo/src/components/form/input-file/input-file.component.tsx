import { useCallback, useEffect, useMemo, useState } from 'react';
import { IconType } from 'react-icons';
import { FaMagnifyingGlass, FaRegTrashCan } from 'react-icons/fa6';
import { IoIosWarning } from 'react-icons/io';
import { PiFilePdfFill, PiFilePngFill } from 'react-icons/pi';

import { formatBytes } from '../../../helpers';
import { FileTypeEnum, useInputHandlers } from '../../../hooks';
import { Grid } from '../../../layouts';
import { Typography } from '../../typography';
import { Controller } from '../controller';
import { ControllerGeneratorProps, UnControlledComponentProps } from '../form.types';

import './input-file.styles.css';

type InputFileProps = {
  label?: string;
  accept?: string;
  multiple?: boolean;
  limitSize?: number;
  errorTimeout?: number;
};

type InputFileValue = { [key: string]: File };

export const InputFile = ({
  name,
  value = {},
  setValue,
  onBlur,
  onFocus,
  className = '',
  style = {},
  autoFocus = false,
  readOnly = false,
  disabled = false,
  placeholder = 'Click to upload or drag and drop',
  autoComplete = 'off',
  accept,
  multiple = false,
  limitSize = 5000000,
  errorTimeout = 3000,
  label,
  /*
   * isDirty = false,
   * isTouched = false,
   * invalid = false,
   * error,
   */
}: UnControlledComponentProps<InputFileProps, InputFileValue>) => {
  const [error, setError] = useState<string | null>(null);
  const id = useMemo(() => crypto.randomUUID(), []);
  const { handlers } = useInputHandlers<HTMLInputElement>({
    onBlur,
    onFocus,
    onChange: e => {
      const { files } = e.target;

      if (files) saveFiles(files);
    },
  });

  useEffect(() => {
    let intervalId: ReturnType<typeof setTimeout> | null = null;

    if (error !== null) {
      intervalId = setTimeout(() => {
        setError(null);
      }, errorTimeout);
    }

    return () => {
      if (intervalId !== null) {
        clearTimeout(intervalId);
      }
    };
  }, [error, errorTimeout]);

  const saveFiles = (files: FileList) => {
    const finalFiles = multiple ? { ...value } : {};

    const filesToCheck = multiple ? files.length : 1;

    for (let i = 0; i < filesToCheck; i++) {
      const file = files.item(i);

      if (!file) {
        continue;
      }

      if (file.size < limitSize) {
        finalFiles[file.name] = file;
      } else {
        setError(`File '${file.name}' size is larger than ${formatBytes(limitSize)}`);
      }
    }

    setValue(finalFiles);
  };

  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      saveFiles(e.dataTransfer.files);
    }
  };

  const getIconType = useCallback((type: FileTypeEnum): IconType => {
    const iconTypes: Record<FileTypeEnum, IconType> = {
      [FileTypeEnum.PNG]: PiFilePngFill,
      [FileTypeEnum.PDF]: PiFilePdfFill,
    };

    return iconTypes[type] ?? IoIosWarning;
  }, []);

  const deleteFile = (file: File) => {
    const prevValue = { ...value };
    delete prevValue[file.name];
    setValue(prevValue);
  };

  const deleteAll = () => {
    setValue({});
  };

  const totalSize = useMemo(() => Object.values(value).reduce((prev, { size }) => prev + size, 0), [value]);

  const renderFileToCard = (file: File, key: number) => {
    const Icon = getIconType(file.type as FileTypeEnum);

    return (
      <section className='input-file-card' key={key}>
        <section className='file-card--image'>
          <Icon />
        </section>
        <Grid>
          <Typography variant='label' noPadding nowrap>
            {file.name}
          </Typography>
          <Typography noPadding variant='small'>
            {formatBytes(file.size)}
          </Typography>
        </Grid>
        <section className='file-card--delete' onClick={() => deleteFile(file)}>
          <FaRegTrashCan />
        </section>
      </section>
    );
  };

  return (
    <section className='input-file-container'>
      {Boolean(label) && (
        <Typography variant='label-form' htmlFor={id} noPadding>
          {label}
        </Typography>
      )}
      <section className='input-file--box' onDrop={handleDrop}>
        <section className='input-file--box--icon'>
          <FaMagnifyingGlass />
        </section>
        <Grid>
          <Typography variant='label-form' htmlFor={id} noPadding weight='bold'>
            {placeholder}
          </Typography>
          <Typography variant='small' noPadding>
            Max size ({formatBytes(limitSize)})
          </Typography>
        </Grid>
        <input
          id={id}
          type='file'
          name={name}
          value=''
          placeholder={placeholder}
          readOnly={readOnly}
          autoFocus={autoFocus}
          disabled={disabled}
          autoComplete={autoComplete}
          className={className}
          style={style}
          accept={accept}
          multiple={multiple}
          title=''
          {...handlers}
        />
      </section>
      {error !== null && (
        <Typography variant='small' noPadding className='error'>
          {error}
        </Typography>
      )}
      {Object.keys(value).length > 0 && (
        <>
          {multiple && (
            <span className='total-info'>
              <Typography variant='small' noPadding>
                {Object.keys(value).length} files - {formatBytes(totalSize)}
              </Typography>
              <span className='total-info--delete' onClick={deleteAll}>
                <FaRegTrashCan />
              </span>
            </span>
          )}
          <section className='input-file--files'>
            <section className='input-file--files--content'>{Object.values(value).map(renderFileToCard)}</section>
          </section>
        </>
      )}
    </section>
  );
};

const InputFileController = ({ rules, ...props }: ControllerGeneratorProps<InputFileProps, InputFileValue>) => {
  return <Controller Component={InputFile} defaultValue={{}} inputProps={props} rules={rules} />;
};

InputFile.Controller = InputFileController;
