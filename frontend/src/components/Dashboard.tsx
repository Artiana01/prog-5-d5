import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCode, faArrowUp, faBug, faChartLine, faClock } from '@fortawesome/free-solid-svg-icons';
import { faJs, faPython, faJava, faPhp } from '@fortawesome/free-brands-svg-icons'; // Corrected import for brand icons
import Chart from 'chart.js/auto'; // Using Chart.js v3+ auto import
import ProjectCard, { ProjectCardProps } from './ProjectCard'; // Import ProjectCard

const Dashboard = () => {
  const refactorChartRef = useRef<HTMLCanvasElement>(null);
  const languageChartRef = useRef<HTMLCanvasElement>(null);
  const refactorChartInstance = useRef<Chart | null>(null);
  const languageChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // Destroy existing charts before creating new ones
    if (refactorChartInstance.current) {
      refactorChartInstance.current.destroy();
    }
    if (languageChartInstance.current) {
      languageChartInstance.current.destroy();
    }

    // Refactor Chart
    if (refactorChartRef.current) {
      const refactorCtx = refactorChartRef.current.getContext('2d');
      if (refactorCtx) {
        refactorChartInstance.current = new Chart(refactorCtx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
              label: 'Projets refactorisés',
              data: [12, 19, 15, 22, 18, 24, 27],
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              borderColor: '#6366f1', // primary color
              borderWidth: 2,
              tension: 0.3,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }

    // Language Chart
    if (languageChartRef.current) {
      const languageCtx = languageChartRef.current.getContext('2d');
      if (languageCtx) {
        languageChartInstance.current = new Chart(languageCtx, {
          type: 'doughnut',
          data: {
            labels: ['JavaScript', 'Python', 'Java', 'PHP', 'C#'],
            datasets: [{
              data: [35, 25, 20, 15, 5],
              backgroundColor: [
                '#facc15', // yellow-400
                '#3b82f6', // blue-500
                '#ef4444', // red-500
                '#a855f7', // purple-500
                '#64748b'  // slate-500
              ],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right'
              }
            },
            cutout: '70%'
          }
        });
      }
    }

    // Cleanup function to destroy charts when component unmounts
    return () => {
        if (refactorChartInstance.current) {
            refactorChartInstance.current.destroy();
        }
        if (languageChartInstance.current) {
            languageChartInstance.current.destroy();
        }
    };
  }, []); // Empty dependency array means this effect runs once after initial render

  const recentProjectsData: ProjectCardProps[] = [
    { id: 1, name: 'Projet API JavaScript', langIcon: faJs, langColor: 'text-primary', time: 'il y a 2 heures', status: 'Terminé', statusColor: 'bg-green-100 text-green-800', iconBg: 'bg-primary-100' },
    { id: 2, name: 'Script Python', langIcon: faPython, langColor: 'text-blue-600', time: 'il y a 1 jour', status: 'Terminé', statusColor: 'bg-green-100 text-green-800', iconBg: 'bg-blue-100' },
    { id: 3, name: 'Application Java', langIcon: faJava, langColor: 'text-red-600', time: 'il y a 3 jours', status: 'Terminé', statusColor: 'bg-green-100 text-green-800', iconBg: 'bg-red-100' },
    { id: 4, name: 'Site Web PHP', langIcon: faPhp, langColor: 'text-yellow-600', time: 'il y a 1 semaine', status: 'Terminé', statusColor: 'bg-green-100 text-green-800', iconBg: 'bg-yellow-100' },
    { id: 5, name: 'Projet C#', langIcon: faFileCode, langColor: 'text-gray-600', time: 'il y a 2 semaines', status: 'Terminé', statusColor: 'bg-green-100 text-green-800', iconBg: 'bg-gray-100' }, // Using generic file-code for C#
  ];

  return (
    <div id="dashboard-section" className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-dark mb-6">Tableau de bord</h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {/* Card 1: Projets refactorisés */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                    <FontAwesomeIcon icon={faFileCode} className="text-primary text-xl" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Projets refactorisés</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">24</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <FontAwesomeIcon icon={faArrowUp} className="text-xs self-center" />
                          <span className="sr-only">Increased by</span>
                          12%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            {/* Card 2: Problèmes résolus */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                    <FontAwesomeIcon icon={faBug} className="text-secondary text-xl" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Problèmes résolus</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">142</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <FontAwesomeIcon icon={faArrowUp} className="text-xs self-center" />
                          <span className="sr-only">Increased by</span>
                          8%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            {/* Card 3: Complexité réduite */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <FontAwesomeIcon icon={faChartLine} className="text-green-600 text-xl" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Complexité réduite</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">32%</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <FontAwesomeIcon icon={faArrowUp} className="text-xs self-center" />
                          <span className="sr-only">Increased by</span>
                          5%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            {/* Card 4: Temps économisé */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <FontAwesomeIcon icon={faClock} className="text-blue-600 text-xl" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Temps économisé</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">42h</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <FontAwesomeIcon icon={faArrowUp} className="text-xs self-center" />
                          <span className="sr-only">Increased by</span>
                          18%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-dark mb-4">Évolution des refactorisations</h3>
              <div className="h-64">
                <canvas ref={refactorChartRef} id="refactorChart"></canvas>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-dark mb-4">Répartition par langage</h3>
              <div className="h-64">
                <canvas ref={languageChartRef} id="languageChart"></canvas>
              </div>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-dark">Projets récents</h3>
              <p className="mt-1 text-sm text-gray-500">Vos 5 derniers projets refactorisés</p>
            </div>
            <div className="bg-white overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {recentProjectsData.map((project) => (
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    name={project.name}
                    langIcon={project.langIcon}
                    langColor={project.langColor}
                    time={project.time}
                    status={project.status}
                    statusColor={project.statusColor}
                    iconBg={project.iconBg}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
