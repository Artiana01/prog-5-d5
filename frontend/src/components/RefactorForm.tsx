import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagic } from '@fortawesome/free-solid-svg-icons';
import FileUploader from './FileUploader';
import { RefactorOptions, UploadedFile } from '../types/project';

interface RefactorFormProps {
  onRefactorComplete: () => void;
}

const RefactorForm: React.FC<RefactorFormProps> = ({ onRefactorComplete }) => {
  const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);
  const [options, setOptions] = useState<RefactorOptions>({
    level: 'Standard',
    mainLanguage: 'Détection automatique',
    addComments: true,
    optimizeVariableNames: true,
    detectDeadCode: true,
    restructureModules: false,
  });

  const handleFilesSelected = (files: File[]) => {
    const newUploadedFiles: UploadedFile[] = files.map(file => ({
      id: crypto.randomUUID(), // Simple unique ID for client-side list
      name: file.name,
      size: file.size,
      type: file.type,
      // rawFile: file, // You might want to store the raw file if needed for direct upload later
    }));
    setSelectedFiles(prevFiles => [...prevFiles, ...newUploadedFiles]);
    // In a real app, you might want to prevent duplicates or limit the number of files
  };

  const handleRemoveFile = (fileIdToRemove: string) => {
    setSelectedFiles(prevFiles => prevFiles.filter(file => file.id !== fileIdToRemove));
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setOptions(prevOptions => ({ ...prevOptions, [name]: checked }));
    } else {
      setOptions(prevOptions => ({ ...prevOptions, [name]: value }));
    }
  };

  const handleSubmitRefactor = () => {
    // Logic to submit files and options for refactoring
    // This would typically involve an API call
    console.log('Submitting for refactor:', { selectedFiles, options });
    // After submission, you might navigate to a results page or show a loading state
    // For now, this is just a console log.
    // Example: props.onShowResults(results);
    // Simulate successful refactor and switch to results view
    if (selectedFiles.length > 0) { // Only switch if files were selected
      onRefactorComplete();
    } else {
      alert("Veuillez sélectionner des fichiers à refactoriser.");
    }
  };

  return (
    <div id="refactor-section" className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-dark mb-6">Refactoriser votre code</h2>

          <FileUploader
            onFilesSelected={handleFilesSelected}
            selectedFiles={selectedFiles}
            onRemoveFile={handleRemoveFile}
          />

          <div className="bg-white shadow rounded-lg overflow-hidden mt-8 mb-8"> {/* Added mt-8 for spacing */}
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-dark">Options de refactorisation</h3>
              <p className="mt-1 text-sm text-gray-500">Personnalisez le processus de refactorisation</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">Niveau de refactorisation</label>
                  <select
                    id="level"
                    name="level"
                    value={options.level}
                    onChange={handleOptionChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  >
                    <option value="Basique">Basique (nettoyage simple)</option>
                    <option value="Standard">Standard (recommandé)</option>
                    <option value="Avancé">Avancé (restructuration complète)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="mainLanguage" className="block text-sm font-medium text-gray-700 mb-1">Langage principal</label>
                  <select
                    id="mainLanguage"
                    name="mainLanguage"
                    value={options.mainLanguage}
                    onChange={handleOptionChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  >
                    <option value="Détection automatique">Détection automatique</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="PHP">PHP</option>
                    <option value="C#">C#</option>
                  </select>
                </div>
              </div>

              <fieldset className="mt-6">
                <legend className="text-base font-medium text-gray-700">Actions spécifiques</legend>
                <div className="mt-4 space-y-4">
                  {[
                    { id: 'addComments', name: 'addComments', label: 'Ajouter des commentaires', description: 'Documente les fonctions et méthodes principales', checked: options.addComments },
                    { id: 'optimizeVariableNames', name: 'optimizeVariableNames', label: 'Optimiser les noms de variables', description: 'Rend les noms plus descriptifs et cohérents', checked: options.optimizeVariableNames },
                    { id: 'detectDeadCode', name: 'detectDeadCode', label: 'Détecter le code mort', description: 'Identifie et supprime le code inutilisé', checked: options.detectDeadCode },
                    { id: 'restructureModules', name: 'restructureModules', label: 'Restructurer en modules', description: 'Réorganise le code en modules/logiques séparés', checked: options.restructureModules },
                  ].map(action => (
                    <div key={action.id} className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id={action.id}
                          name={action.name}
                          type="checkbox"
                          checked={action.checked}
                          onChange={handleOptionChange}
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor={action.id} className="font-medium text-gray-700">{action.label}</label>
                        <p className="text-gray-500">{action.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleSubmitRefactor}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <FontAwesomeIcon icon={faMagic} className="mr-2 h-4 w-4" /> Lancer la refactorisation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefactorForm;
