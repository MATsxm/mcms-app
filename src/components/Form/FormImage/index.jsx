import { Icon } from '@iconify/react';
import React, { lazy, useState } from 'react';
import ComponentImage from '../../ComponentImage';
import styles from './index.module.scss';

const ModalDAMComponent = lazy(() => import('components/ModalDamComponent'));

const FormImage = ({ field, hiddenDelete = false }) => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(field.value);
  const onSelect = (data) => {
    setFile(data[0]);
    field.changed(data);
    setShow(false);
  };
  return (
    <>
      <ModalDAMComponent show={show} onHide={() => setShow(false)} onSelect={onSelect} />
      <div className={`position-relative p-7px mb-24`}>
        {file && !hiddenDelete && (
          <div className={`position-absolute top-0 start-100 text-end cursor-pointer`}>
            <div className="bg-danger p-sm" onClick={() => setFile(null)}>
              <Icon className="text-white" width={24} height={24} icon="ion:trash-outline" />
            </div>
          </div>
        )}
        <div className="d-flex align-items-center justify-content-center cursor-auto">
          <input
            readOnly
            className={`${styles['border']} position-absolute start-0 top-0 bottom-0 end-0 cursor-auto`}
          />
          {file ? (
            <div
              key={field.value}
              onClick={() => setShow(true)}
              className={`${styles['limit-image']} text-center cursor-pointer zindex-1`}
            >
              <ComponentImage src={file.download_url} alt={file?.name ?? 'Image'} />
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center p-40 zindex-1">
              <p className="mb-3">Select file to upload</p>
              <p
                onClick={() => setShow(true)}
                className="btn bg-white text-secondary border rounded-1 py-11 px-3 mb-0"
              >
                Select File
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="mb-0">Maximum upload size: 10.00 MB</p>
    </>
  );
};

export default FormImage;
