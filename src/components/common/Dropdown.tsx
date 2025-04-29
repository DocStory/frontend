import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

export type DropdownOption = {
  label: string;
  value: string;
};

interface DropdownProps {
  isOpen: boolean;
  options: DropdownOption[];
  position: { x: number; y: number };
  onSelect: (value: string) => void;
  onClose: () => void;
}

const DropdownContainer = styled.ul<{ x: number; y: number }>`
  position: fixed;
  z-index: 50;
  min-width: 150px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 16px 0px rgba(107, 110, 116, 0.08);
  border: 1px solid #e2e5eb;
  padding: 6px 0;
  font-family: 'Pretendard', sans-serif;
  overflow: hidden;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
`;

const DropdownItem = styled.li`
  padding: 10px 18px;
  font-size: 15px;
  color: #222;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.12s;
  outline: none;
  &:hover, &:focus {
    background: #f5f7fa;
    color: #3576e0;
  }
  &:active {
    background: #e6f0ff;
    color: #3576e0;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #e2e5eb;
  margin: 2px 0;
`;

export const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  options,
  position,
  onSelect,
  onClose,
}) => {
  const ref = useRef<HTMLUListElement>(null);
  const [coords, setCoords] = useState(position);

  // 위치 자동 조정 (뷰포트 밖 방지)
  useLayoutEffect(() => {
    if (!isOpen || !ref.current) return;
    const { innerWidth, innerHeight } = window;
    const rect = ref.current.getBoundingClientRect();
    let x = position.x;
    let y = position.y;
    if (x + rect.width > innerWidth) x = innerWidth - rect.width - 8;
    if (y + rect.height > innerHeight) y = innerHeight - rect.height - 8;
    x = Math.max(8, x);
    y = Math.max(8, y);
    setCoords({ x, y });
  }, [isOpen, position]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const dropdown = (
    <DropdownContainer
      ref={ref}
      x={coords.x}
      y={coords.y}
      role="menu"
      aria-label="히스토리 카드 드랍다운"
      tabIndex={-1}
    >
      {options.map((opt, idx) => (
        <React.Fragment key={opt.value}>
          <DropdownItem
            role="menuitem"
            tabIndex={0}
            aria-label={opt.label}
            onClick={() => onSelect(opt.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') onSelect(opt.value);
            }}
          >
            {opt.label}
          </DropdownItem>
          {idx < options.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </DropdownContainer>
  );

  return ReactDOM.createPortal(dropdown, document.body);
}; 