import React from 'react';
import styled from 'styled-components';
import closeIcon from '../../assets/closeIcon.svg';
import SettingsList from '../common/SettingsList.tsx';
import ModalHeader from '../common/ModalHeader';

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
        <ModalHeader title="설정" onClose={onClose} />
        <ContentWrapper>
          <SettingsList items={settingsItems} />
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SettingsModal;
