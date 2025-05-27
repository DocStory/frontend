import React, { useState } from 'react';
import RepositorySectionHeader from './RepositorySectionHeader';
import RepositorySectionCard from './RepositorySectionCard';
import NewRepositoryModal from './NewRepositoryModal';

const RepositorySection: React.FC = () => {
  const [isNewRepositoryModalOpen, setIsNewRepositoryModalOpen] = useState(false);

  const handleOpenNewRepositoryModal = () => {
    setIsNewRepositoryModalOpen(true);
  };

  const handleCloseNewRepositoryModal = () => {
    setIsNewRepositoryModalOpen(false);
  };

  const handleRepositorySubmit = (data: any) => {
    console.log('New repository data:', data);
    // 여기에 실제 저장소 생성 로직을 구현
    setIsNewRepositoryModalOpen(false);
  };

  return (
    <div>
      <RepositorySectionHeader onNewRepositoryClick={handleOpenNewRepositoryModal} />
      <RepositorySectionCard />
      <NewRepositoryModal 
        isOpen={isNewRepositoryModalOpen}
        onClose={handleCloseNewRepositoryModal}
        onSubmit={handleRepositorySubmit}
      />
    </div>
  );
};

export default RepositorySection; 