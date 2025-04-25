import styled from 'styled-components';
import { FaHome, FaFolderOpen, FaQuestionCircle, FaCog } from 'react-icons/fa';

const SidebarContainer = styled.div`
  width: 300px;
  height: 100vh;
  background-color: #FFFFFF;
  border-right: 2px solid #F0F0F0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
    font-family: 'Inter', sans-serif;
`;

const TopSection = styled.div`
  padding: 20px;
`;

const Logo = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: #6C9EFF;
  margin-bottom: 40px;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 8px;
  
  &:hover {
    background-color: #F6F7FB;
  }
`;

const MenuIcon = styled.div`
  margin-right: 8px;
  font-size: 18px;
  color: #A6ACB8;
`;

const MenuLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #61677F;
`;

const Badge = styled.span`
  margin-left: auto;
  background-color: #6C9EFF;
  color: #EDF9FF;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 80px;
`;

const BottomSection = styled.div`
  border-top: 1px solid #E2E8F0;
  padding: 16px 20px;
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #A8A8A8;
`;

const UserRole = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #E5E5E5;
`;

export function SideBar() {
  return (
    <SidebarContainer>
      <TopSection>
        <Logo>DocStory</Logo>

        <MenuList>
          <MenuItem>
            <MenuIcon><FaHome /></MenuIcon>
            <MenuLabel>Home</MenuLabel>
            <Badge>04</Badge>
          </MenuItem>

          <MenuItem>
            <MenuIcon><FaFolderOpen /></MenuIcon>
            <MenuLabel>Repository</MenuLabel>
          </MenuItem>

          <MenuItem>
            <MenuIcon><FaQuestionCircle /></MenuIcon>
            <MenuLabel>Get Help</MenuLabel>
          </MenuItem>

          <MenuItem>
            <MenuIcon><FaCog /></MenuIcon>
            <MenuLabel>Settings</MenuLabel>
          </MenuItem>
        </MenuList>
      </TopSection>

      <BottomSection>
        <Avatar src="https://placehold.co/40x40" alt="User Avatar" />
        <UserInfo>
          <UserName>Kanguk</UserName>
          <UserRole>Premium Member</UserRole>
        </UserInfo>
      </BottomSection>
    </SidebarContainer>
  );
}
