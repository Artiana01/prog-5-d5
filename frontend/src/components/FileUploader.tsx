import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faFileCode, faTimes } from '@fortawesome/free-solid-svg-icons';
import { UploadedFile } from '../types/project'; // Assuming types are defined
import { formatFileSize } from '../utils/format'; // Utility function

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  selectedFiles: UploadedFile[]; // Files already selected, managed by parent
  onRemoveFile: (fileIdToRemove: string) => void; // Callback to remove a file
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesSelected, selectedFiles, onRemoveFile }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Optionally, you can add more visual feedback here
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
    }
  }, [onFilesSelected]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
      e.target.value = ''; // Reset file input
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-dark">Soumettre votre code</h3>
        <p className="mt-1 text-sm text-gray-500">Téléversez vos fichiers ou archives pour analyse et refactorisation</p>
      </div>
      <div className="p-6">
        <div
          id="dropzone"
          className={`file-dropzone flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg cursor-pointer
            ${isDragging ? 'border-primary ring-2 ring-primary-200 bg-primary-50' : 'border-gray-300 hover:border-gray-400'}
          `}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload-input')?.click()} // Trigger hidden file input
        >
          <FontAwesomeIcon icon={faCloudUploadAlt} className="text-4xl text-primary mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-2">Glissez-déposez vos fichiers ici</p>
          <p className="text-sm text-gray-500 mb-4">ou</p>
          <label
            htmlFor="file-upload-input" // Changed to match input id
            className="cursor-pointer bg-primary hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
          >
            <span>Parcourir les fichiers</span>
          </label>
          <input
            id="file-upload-input" // Ensure this ID is unique if component is used multiple times, or pass ID as prop
            name="file-upload"
            type="file"
            className="sr-only"
            multiple
            onChange={handleFileInputChange}
          />
          <p className="text-xs text-gray-500 mt-3">Formats supportés: .js, .py, .java, .php, .cs, .zip, .rar</p>
        </div>

        {selectedFiles.length > 0 && (
          <div id="file-list" className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Fichiers sélectionnés:</h4>
            <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
              {selectedFiles.map((file) => (
                <li key={file.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <FontAwesomeIcon icon={faFileCode} className="flex-shrink-0 h-5 w-5 text-gray-400" />
                    <span className="ml-2 flex-1 w-0 truncate">{file.name}</span>
                    <span className="ml-2 flex-shrink-0 text-gray-500">{formatFileSize(file.size)}</span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button
                      onClick={() => onRemoveFile(file.id)}
                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      aria-label={`Remove ${file.name}`}
                    >
                      <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
