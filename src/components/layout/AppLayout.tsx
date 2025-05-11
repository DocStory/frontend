import React from 'react';
import styled from 'styled-components';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../common/SideBar';
import MainHeader from './MainHeader';
import NotificationPanel from '../common/NotificationPanel';

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background: #f8f8f8;
  overflow: hidden;
`;

const SidebarArea = styled.div`
  flex-shrink: 0;
  overflow: hidden;
`;

const MainArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  width: 100%;
  overflow: hidden;
`;

const HeaderArea = styled.div`
  flex-shrink: 0;
`;

const ContentArea = styled.div`
  flex: 1;
  width: 100%;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 32px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f8f8f8;
  padding: 30px 60px 30px 60px;
`;

interface AppLayoutProps {
  userName?: string;
  hasNewNotification?: boolean;
  children?: React.ReactNode;
  activeMenu?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  userName = '홍길동',
  hasNewNotification = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeMenu = location.pathname.includes('repository') ? '저장소' : '홈';

  const [isPanelOpen, setPanelOpen] = React.useState(false);

  const handleMenuClick = (label: string) => {
    switch (label) {
      case '홈':
        navigate('/home');
        break;
      case '저장소':
        navigate('/repository');
        break;
      case '도움말':
        // 도움말 페이지로 이동
        break;
      case '설정':
        // 설정 페이지로 이동
        break;
    }
  };

  return (
    <Layout>
      <SidebarArea>
        <SideBar activeMenu={activeMenu} onMenuClick={handleMenuClick} userName={userName} />
      </SidebarArea>
      <MainArea>
        <HeaderArea>
          <MainHeader hasNewNotification={hasNewNotification} onNotificationClick={() => setPanelOpen(true)} />
        </HeaderArea>
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
          <ContentArea>
            <Outlet />
          </ContentArea>
          <NotificationPanel isOpen={isPanelOpen} onClose={() => setPanelOpen(false)} />
        </div>
      </MainArea>
    </Layout>
  );
};

export default AppLayout; 