import React from 'react';
import AppLayout from '../layout/AppLayout.tsx';
import RepositorySection from '../common/RepositorySection.tsx';

interface RepositoryPageProps {
  userName?: string;
}

const RepositoryPage: React.FC<RepositoryPageProps> = ({ userName = '홍길동' }) => {
  return (
    <AppLayout userName={userName} activeMenu="저장소" hasNewNotification={false}>
      <RepositorySection />
    </AppLayout>
  );
};

export default RepositoryPage;
