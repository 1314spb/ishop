import React, { useState } from 'react';
import FileUploaderCSS from '@/styles/fileUploader.module.css';

interface UploadProgressProps {
  uploading: boolean;
  fileName: string;
  fileSize: string;
  progress: number;
}

const UploadProgress: React.FC<UploadProgressProps> = ({ uploading, fileName, fileSize, progress }) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className={FileUploaderCSS.wrapper}>
      <div className={FileUploaderCSS.upload_area}>
        <input type="file" onChange={handleFileChange} className={FileUploaderCSS.uploader}/>
        {/* <img src={UploadingLOGO.src} alt="UploadingLOGO" /> */}
        <p>Browse Image File to Upload</p>
      </div>
      <section className="progress_area">
        <li className='row'>
          {/* <img src={FileLOGO.src} alt="FileLOGO" /> */}
          <div className="content">
            <div className="details">
              <span className="name">{fileName} · {uploading ? 'Uploading' : 'Uploaded'}</span>
              {uploading && <span className="percent">{progress}%</span>}
            </div>
            {uploading && (
              <div className="progress_bar">
                <div className='progress' style={{ width: `${progress}%` }}></div>
              </div>
            )}
          </div>
        </li>
      </section>
      {!uploading && (
        <section className='uploaded_area'>
          <li className='row'>
            <div className="content">
              {/* <img src={FileLOGO.src} alt="FileLOGO" /> */}
              <div className="details">
                <span className="name">{fileName} · Uploaded</span>
                <span className="size">{fileSize}</span>
              </div>
            </div>
            {/* <img src={CheckedLOGO.src} alt="CheckedLOGO" /> */}
          </li>
        </section>
      )}
    </div>
  );
};

export default UploadProgress;