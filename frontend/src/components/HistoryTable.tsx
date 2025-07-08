import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJs, faPython, faJava, faPhp } from '@fortawesome/free-brands-svg-icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Project } from '../types/project'; // Assuming Project type is defined

// Sample Data (to be replaced with props or state from API)
const sampleHistoryData: Project[] = [
  { id: '1', name: 'E-commerce API', language: 'JavaScript', lastRefactored: '15 juin 2023 - 14:32', status: 'Terminé', improvement: '+42%', fileCount: 12, icon: faJs, iconColor: 'text-yellow-400' },
  { id: '2', name: 'Data Analysis', language: 'Python', lastRefactored: '10 juin 2023 - 09:15', status: 'Terminé', improvement: '+38%', fileCount: 8, icon: faPython, iconColor: 'text-blue-500' },
  { id: '3', name: 'Inventory App', language: 'Java', lastRefactored: '2 juin 2023 - 16:48', status: 'Terminé', improvement: '+29%', fileCount: 23, icon: faJava, iconColor: 'text-red-500' },
  { id: '4', name: 'CMS Backend', language: 'PHP', lastRefactored: '28 mai 2023 - 11:20', status: 'Partiel', improvement: '+18%', fileCount: 17, icon: faPhp, iconColor: 'text-purple-500' },
  // Add more items to test pagination if desired
  { id: '5', name: 'Utility Scripts', language: 'Python', lastRefactored: '25 mai 2023 - 10:00', status: 'Terminé', improvement: '+55%', fileCount: 5, icon: faPython, iconColor: 'text-blue-500' },
  { id: '6', name: 'Frontend UI Kit', language: 'JavaScript', lastRefactored: '20 mai 2023 - 18:30', status: 'Terminé', improvement: '+33%', fileCount: 30, icon: faJs, iconColor: 'text-yellow-400' },
];

// Helper to get status badge class
const getStatusBadgeClass = (status: Project['status']) => {
  switch (status) {
    case 'Terminé': return 'bg-green-100 text-green-800';
    case 'Partiel': return 'bg-yellow-100 text-yellow-800';
    case 'En cours': return 'bg-blue-100 text-blue-800';
    case 'Échoué': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Helper for improvement bar color
const getImprovementBarClass = (status: Project['status']) => {
    switch (status) {
      case 'Terminé': return 'bg-green-600'; // Or specific shades like 500, 400
      case 'Partiel': return 'bg-yellow-400';
      default: return 'bg-gray-400';
    }
  };


const ITEMS_PER_PAGE = 4;

const HistoryTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // In a real app, historyData would come from props or a global state / API call
  const historyData = sampleHistoryData;

  const totalPages = Math.ceil(historyData.length / ITEMS_PER_PAGE);
  const paginatedData = historyData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, historyData.length);


  return (
    <div id="history-section" className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-dark mb-6">Historique des refactorisations</h2>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-dark">Vos projets précédents</h3>
              <p className="mt-1 text-sm text-gray-500">Liste complète de vos refactorisations passées</p>
            </div>
            <div className="bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom du projet</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Langage</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amélioration</th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedData.map((project) => (
                      <tr key={project.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {project.icon && <FontAwesomeIcon icon={project.icon} className={`${project.iconColor} text-xl`} />}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{project.name}</div>
                              <div className="text-sm text-gray-500">{project.fileCount} fichiers</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{project.language}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {project.lastRefactored.split(' - ').map((part, index) => (
                            <div key={index} className={`text-sm ${index === 0 ? 'text-gray-900' : 'text-gray-500'}`}>{part}</div>
                          ))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(project.status)}`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{project.improvement}</div>
                          {project.improvement && (
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div className={`${getImprovementBarClass(project.status)} h-1.5 rounded-full`} style={{ width: project.improvement.replace('%', '').replace('+', '') + '%' }}></div>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-primary hover:text-primary-700 mr-3">Voir</a>
                          <a href="#" className="text-gray-600 hover:text-gray-900">Télécharger</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Pagination Controls */}
            <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Précédent
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Suivant
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Affichage de <span className="font-medium">{startItem}</span> à <span className="font-medium">{endItem}</span> sur <span className="font-medium">{historyData.length}</span> résultats
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <span className="sr-only">Précédent</span>
                      <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        aria-current={pageNumber === currentPage ? 'page' : undefined}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                          ${pageNumber === currentPage
                            ? 'z-10 bg-primary-50 border-primary text-primary-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <span className="sr-only">Suivant</span>
                      <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;
