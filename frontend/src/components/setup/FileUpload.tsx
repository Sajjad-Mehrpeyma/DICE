import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
}

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  uploadedFiles: UploadedFile[];
  onRemoveFile: (id: string) => void;
}

const FileUpload = ({
  onFileUpload,
  uploadedFiles,
  onRemoveFile,
}: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
      if (file.size <= 10 * 1024 * 1024) {
        // 10MB limit
        onFileUpload(file);
      } else {
        console.warn(`File ${file.name} is too large. Maximum size is 10MB.`);
      }
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      if (file.size <= 10 * 1024 * 1024) {
        // 10MB limit
        onFileUpload(file);
      } else {
        console.warn(`File ${file.name} is too large. Maximum size is 10MB.`);
      }
    });
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('image')) return '🖼️';
    if (type.includes('csv')) return '📈';
    return '📁';
  };

  return (
    <div className="file-upload">
      <div
        className={`file-upload__zone ${isDragOver ? 'file-upload__zone--dragover' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label="Upload files by clicking or dragging and dropping"
      >
        <Upload className="file-upload__icon" />
        <p className="file-upload__text">
          Drag and drop files here, or click to select files
        </p>
        <p className="file-upload__hint">
          Supported formats: PDF, Excel, Word, CSV, Images (Max 10MB each)
        </p>
        <button
          type="button"
          className="btn btn--primary file-upload__button"
          onClick={e => {
            e.stopPropagation();
            handleClick();
          }}
        >
          Choose Files
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.xlsx,.xls,.docx,.doc,.csv,.png,.jpg,.jpeg,.gif"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="File input"
      />

      {uploadedFiles.length > 0 && (
        <div className="file-upload__files">
          <h3 className="file-upload__files-title">Uploaded Files</h3>
          {uploadedFiles.map(file => (
            <div key={file.id} className="file-upload__file">
              <div className="file-upload__file-icon">
                {getFileIcon(file.type)}
              </div>
              <div className="file-upload__file-info">
                <p className="file-upload__file-name">{file.name}</p>
                <p className="file-upload__file-size">{file.size}</p>
              </div>
              <button
                onClick={() => onRemoveFile(file.id)}
                className="btn btn--ghost file-upload__file-remove"
                aria-label={`Remove file: ${file.name}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
