import React from 'react';
import AppLayout from '../layout/AppLayout.tsx';
import NewRepositorySection from '../common/NewRepositorySection.tsx';

interface NewRepositoryPageProps {
  userName?: string;
}

const NewRepositoryPage: React.FC<NewRepositoryPageProps> = ({ userName = '홍길동' }) => {
  return (
    <AppLayout userName={userName} activeMenu="저장소" hasNewNotification={false}>
      <NewRepositorySection />
    </AppLayout>
  );
};

export default NewRepositoryPage; 