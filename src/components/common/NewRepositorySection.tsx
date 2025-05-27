import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { FiPlus, FiX, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import avatar from '../../assets/avatar.svg';
import { createRepository, CreateRepositoryRequest } from '../../api/repository';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 100px;
  width: 100%;
`;

const SectionWrapper = styled.div`
  width: 100%;
  margin: 24px auto 0 auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.08);
  padding: 40px 50px 32px 50px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 1240px) {
    padding: 48px 32px 32px 32px;
  }
  @media (max-width: 768px) {
    padding: 20px 16px;
    gap: 20px;
  }
`;

const PageTitle = styled.h1`
  font-family: 'Pretendard';
  font-weight: 800;
  font-size: 32px;
  color: #1e1e1e;
  margin: 0 0 24px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const FormColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Label = styled.label`
  font-family: 'Pretendard';
  font-size: 16px;
  color: #292929;
  font-weight: 600;
  margin-bottom: 4px;
`;

const Required = styled.span`
  color: #ff5a5a;
  font-size: 16px;
  font-weight: 700;
`;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 14px 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  background: #fafafa;
  font-family: 'Pretendard';
`;

const TextArea = styled.textarea`
  width: 100%;
  font-size: 16px;
  padding: 14px 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  background: #fafafa;
  font-family: 'Pretendard';
  resize: none;
  min-height: 100px;
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  background: #f6f7fb;
  border: 1.5px solid #f0f1f6;
  border-radius: 7px;
  font-size: 14px;
  color: #7c7c7c;
  cursor: pointer;
  font-family: 'Pretendard';
`;

const TeamDropdownWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const TeamToggleButton = styled.button<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 14px 16px;
  background: #fff;
  border: 1.5px solid #e7e7e7;
  border-radius: 8px;
  font-size: 14px;
  color: #7c7c7c;
  cursor: pointer;
  font-family: 'Pretendard';

  svg {
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
    transition: transform 0.2s ease;
  }
`;

const DropdownList = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background: #fff;
  border: 1.5px solid #e7e7e7;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TeamOption = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  color: ${props => props.isSelected ? '#2563EB' : '#4a4a4a'};
  background: ${props => props.isSelected ? '#F0F7FF' : '#fff'};

  &:hover {
    background: #f6f7fb;
  }

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .name-email {
    display: flex;
    align-items: center;
  }

  .email {
    font-size: 12px;
    color: #7c7c7c;
    margin-left: 8px;
  }
`;

const SelectedTeamList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const SelectedTeamItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 14px 16px;
  background: #f0f7ff;
  border-radius: 6px;
  font-size: 14px;
  color: #2563EB;

  button {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    padding: 0;
    color: #2563EB;
    cursor: pointer;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;

    button {
      width: 100%;
    }
  }
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f6f7fb;
  border-radius: 6px;
  font-size: 14px;
  color: #4a4a4a;
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #ff5a5a;
  }
`;

const NewRepositorySection: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 임시 팀원 데이터
  const teamOptions = [
    '김철수',
    '이영희',
    '박지성',
    '손흥민',
    '김민재',
    '이강인'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTeamDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const toggleTeam = (team: string) => {
    setSelectedTeams(prev => 
      prev.includes(team)
        ? prev.filter(t => t !== team)
        : [...prev, team]
    );
  };

  const removeTeam = (team: string) => {
    setSelectedTeams(prev => prev.filter(t => t !== team));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const repositoryData: CreateRepositoryRequest = {
        name: title.trim(),
        description: description.trim()
      };

      const response = await createRepository(repositoryData);

      if (response.code === 100) {
        alert(`프로젝트 "${response.data.name}"가 성공적으로 생성되었습니다!`);
        navigate('/repository');
      } else {
        alert(`프로젝트 생성 실패: ${response.message}`);
      }
    } catch (error) {
      console.error('Repository creation error:', error);
      alert('프로젝트 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <SectionWrapper>
        <PageTitle>프로젝트 생성</PageTitle>
        <Form onSubmit={handleSubmit}>
          <FormRow>
            <FormColumn>
              <FieldGroup>
                <LabelRow>
                  <Label htmlFor="repo-name">제목</Label>
                  <Required>*</Required>
                </LabelRow>
                <Input 
                  id="repo-name" 
                  placeholder="제목을 입력해주세요." 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required 
                />
              </FieldGroup>

              <FieldGroup>
                <Label htmlFor="repo-desc">설명</Label>
                <TextArea 
                  id="repo-desc" 
                  placeholder="설명을 입력해주세요."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FieldGroup>
            </FormColumn>

            <FormColumn>
              <FieldGroup>
                <LabelRow>
                  <Label htmlFor="repo-file">첨부파일</Label>
                  <Required>*</Required>
                </LabelRow>
                <FileLabel htmlFor="repo-file">
                  <FiPlus /> 파일 첨부하기
                </FileLabel>
                <FileInput 
                  id="repo-file" 
                  type="file" 
                  multiple 
                  onChange={handleFileChange}
                />
                <FileList>
                  {selectedFiles.map((file, index) => (
                    <FileItem key={index}>
                      {file.name}
                      <DeleteButton onClick={() => removeFile(index)}>
                        <FiX />
                      </DeleteButton>
                    </FileItem>
                  ))}
                </FileList>
              </FieldGroup>

              <FieldGroup>
                <Label htmlFor="repo-team">팀원 추가</Label>
                <TeamDropdownWrapper ref={dropdownRef}>
                  <TeamToggleButton 
                    type="button"
                    isOpen={isTeamDropdownOpen}
                    onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
                  >
                    팀원 선택하기
                    <FiChevronDown />
                  </TeamToggleButton>
                  <DropdownList isOpen={isTeamDropdownOpen}>
                    {teamOptions.map(team => (
                      <TeamOption
                        key={team}
                        isSelected={selectedTeams.includes(team)}
                        onClick={() => toggleTeam(team)}
                      >
                        <img src={avatar} alt="avatar" />
                        <div className="name-email">
                          <div>{team}</div>
                          <div className="email">{team.toLowerCase().replace(/ /g, '')}@example.com</div>
                        </div>
                      </TeamOption>
                    ))}
                  </DropdownList>
                  <SelectedTeamList>
                    {selectedTeams.map(team => (
                      <SelectedTeamItem key={team}>
                        {team}
                        <button type="button" onClick={() => removeTeam(team)}>
                          <FiX size={14} />
                        </button>
                      </SelectedTeamItem>
                    ))}
                  </SelectedTeamList>
                </TeamDropdownWrapper>
              </FieldGroup>
            </FormColumn>
          </FormRow>

          <ButtonRow>
            <Button 
              variant="secondary" 
              size="medium" 
              onClick={() => navigate('/repository')}
              disabled={isLoading}
            >
              취소하기
            </Button>
            <Button 
              variant="primary" 
              size="medium" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? '생성 중...' : '생성하기'}
            </Button>
          </ButtonRow>
        </Form>
      </SectionWrapper>
    </PageContainer>
  );
};

export default NewRepositorySection;
