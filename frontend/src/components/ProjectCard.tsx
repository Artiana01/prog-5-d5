import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProjectCardProps } from '../types/project'; // Import from types

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  langIcon,
  langColor,
  time,
  status,
  statusColor,
  iconBg
}) => {
  return (
    <li className="px-6 py-4">
      <div className="flex items-center">
        <div className={`flex-shrink-0 h-10 w-10 rounded-full ${iconBg} flex items-center justify-center`}>
          <FontAwesomeIcon icon={langIcon} className={`${langColor} text-xl`} />
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-dark">{name}</div>
          <div className="text-sm text-gray-500">Refactorisé {time}</div>
        </div>
        <div className="ml-auto">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
            {status}
          </span>
        </div>
      </div>
    </li>
  );
};

export default ProjectCard;
