import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faCode, faChartLine, faTrashAlt, faComment } from '@fortawesome/free-solid-svg-icons';
import { faJs } from '@fortawesome/free-brands-svg-icons'; // Assuming JS icon for example
import CodeComparer from './CodeComparer'; // Will be implemented later
import { RefactorResultSummary, RefactorFileDetail } from '../types/project'; // Import types

// Sample Data (to be replaced with props or state from API)
const sampleSummary: RefactorResultSummary = {
  cyclomaticComplexityChange: '-32%',
  deadCodeRemovedLines: '142 lignes',
  commentsAdded: '28 commentaires',
};

const sampleFileDetails: RefactorFileDetail[] = [
  {
    fileName: 'api.js',
    language: 'JavaScript',
    type: 'Refactorisé',
    changesSummary: '12 améliorations',
    details: '3 variables renommées',
    status: 'Succès',
    iconClass: 'fab fa-js text-yellow-400', // Mapped to actual icon below
  },
  {
    fileName: 'utils.js',
    language: 'JavaScript',
    type: 'Optimisé',
    changesSummary: '8 améliorations',
    details: '2 fonctions simplifiées',
    status: 'Succès',
    iconClass: 'fab fa-js text-yellow-400',
  },
  {
    fileName: 'config.js',
    language: 'JavaScript',
    type: 'Partiel',
    changesSummary: '3 améliorations',
    details: '1 problème non résolu',
    status: 'Avertissement',
    iconClass: 'fab fa-js text-yellow-400',
  },
];

// Function to map status to Tailwind classes for the status dot
const getStatusDotClass = (status: 'Succès' | 'Avertissement' | 'Échec') => {
  switch (status) {
    case 'Succès':
      return 'bg-green-400';
    case 'Avertissement':
      return 'bg-yellow-400';
    case 'Échec':
      return 'bg-red-400';
    default:
      return 'bg-gray-400';
  }
};

// Function to map file type to Tailwind classes for the badge
const getTypeBadgeClass = (type: RefactorFileDetail['type']) => {
  switch (type) {
    case 'Refactorisé':
      return 'bg-green-100 text-green-800';
    case 'Optimisé':
      return 'bg-blue-100 text-blue-800';
    case 'Partiel':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};


const ResultsDisplay = () => {
  // In a real app, summary and fileDetails would come from props or context
  const summary = sampleSummary;
  const fileDetails = sampleFileDetails;

  return (
    <div id="results-section" className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-dark">Résultats de la refactorisation</h2>
            <div>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mr-2"
              >
                <FontAwesomeIcon icon={faDownload} className="mr-2 h-4 w-4" /> Télécharger le rapport
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <FontAwesomeIcon icon={faCode} className="mr-2 h-4 w-4" /> Télécharger le code
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-dark">Résumé des améliorations</h3>
              <p className="mt-1 text-sm text-gray-500">Statistiques sur les changements apportés à votre code</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {summary.cyclomaticComplexityChange && (
                  <div className="bg-blue-50 overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                          <FontAwesomeIcon icon={faChartLine} className="text-blue-600 text-xl" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Complexité cyclomatique</dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">{summary.cyclomaticComplexityChange}</div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {summary.deadCodeRemovedLines && (
                  <div className="bg-green-50 overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                          <FontAwesomeIcon icon={faTrashAlt} className="text-green-600 text-xl" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Code mort supprimé</dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">{summary.deadCodeRemovedLines}</div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {summary.commentsAdded && (
                  <div className="bg-purple-50 overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                          <FontAwesomeIcon icon={faComment} className="text-secondary text-xl" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Documentation ajoutée</dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">{summary.commentsAdded}</div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Details Table */}
              <div className="mt-8">
                <h4 className="text-lg font-medium text-dark mb-4">Détails des changements</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fichier</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Changements</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {fileDetails.map((file, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {/* Icon logic would be more complex for different file types */}
                                <FontAwesomeIcon icon={faJs} className="text-yellow-400 text-xl" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{file.fileName}</div>
                                <div className="text-sm text-gray-500">{file.language}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeBadgeClass(file.type)}`}>
                              {file.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{file.changesSummary}</div>
                            {file.details && <div className="text-sm text-gray-500">{file.details}</div>}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <div className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(file.status)} mr-2`}></div> {file.status}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Code Comparison Section */}
          <CodeComparer />
          {/* CodeComparer will take original and refactored code strings as props */}
          {/* For now, it's a placeholder. Actual data will be passed from the parent. */}

        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
