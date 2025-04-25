import React from 'react';
import styled from 'styled-components';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface NavigationMenuProps {
  items?: {
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
  }[];
}

const MenuItemContainer = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: ${props => props.isActive ? '#F6F7FB' : 'transparent'};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #F6F7FB;
  }
`;

const MenuIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuLabel = styled.span<{ isActive?: boolean }>`
  font-family: 'Pretendard';
  font-weight: ${props => props.isActive ? '800' : '500'};
  font-size: 16px;
  color: #61677F;
`;

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <MenuItemContainer isActive={isActive} onClick={onClick}>
      <MenuIcon>{icon}</MenuIcon>
      <MenuLabel isActive={isActive}>{label}</MenuLabel>
    </MenuItemContainer>
  );
};

const NavigationMenu: React.FC<NavigationMenuProps> = ({ 
  items = [
    { icon: <div>🏠</div>, label: '홈', isActive: true },
    { icon: <div>📁</div>, label: '저장소' },
    { icon: <div>⚙️</div>, label: '설정' },
    { icon: <div>❓</div>, label: '도움말' },
  ]
}) => {
  return (
    <div>
      {items.map((item, index) => (
        <MenuItem
          key={index}
          icon={item.icon}
          label={item.label}
          isActive={item.isActive}
        />
      ))}
    </div>
  );
};

export default NavigationMenu; 