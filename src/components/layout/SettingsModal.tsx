import React from 'react';
import styled from 'styled-components';
import closeIcon from '../../assets/closeIcon.svg';
import SettingsList from '../common/SettingsList.tsx';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 100%;
  max-width: 400px;
  height: 650px;
  border-radius: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 40px 40px 24px;
  border-bottom: 1px solid #f2f2f2;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;

  img {
    width: 24px;
    height: 24px;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px 40px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #ccc;
  }
`;

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const settingsItems = [
    {
      title: '알림 설정',
      value: '켜짐',
      options: ['켜짐', '꺼짐'],
    },
    {
      title: '테마 설정',
      value: '라이트',
      options: ['라이트', '다크'],
    },
    {
      title: '언어',
      value: '한국어',
      options: ['한국어', 'English', '日本語', '中文'],
    },
  ];

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>설정</Title>
          <CloseButton onClick={onClose}>
            <img src={closeIcon} alt='close' />
          </CloseButton>
        </Header>
        <ContentWrapper>
          <SettingsList items={settingsItems} />
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SettingsModal;
