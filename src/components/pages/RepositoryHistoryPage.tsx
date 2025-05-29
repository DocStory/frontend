import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SideBar from '../common/SideBar';
import RepoHeader from '../layout/RepoHeader';
import RepositoryTile from '../layout/RepositoryTitle';
import CanvasRepoGraph from '../common/CanvasRepoGraph';
import TeamInviteModal from '../layout/TeamInviteModal';
import ModalSimple from '../layout/ModalSimple';
import Modal from '../layout/Modal';
import EditRepositoryModal from '../common/EditRepositoryModal';
import { getFilteredHistories, getHistoryRootFiles, getHistoryDetail, updateHistory, createHistory } from '../../api/history';
import { HistoryListResponse, HistoryFileResponse, HistoryDetailResponse } from '../../api/history/types';
import { UUID } from '../../api/common/types';
import AuthService from '../../api/auth';
import { createProposal, getProposalsByRepository, getProposalById } from '../../api/proposal';
import ModalPPList from '../layout/ModalPPList';
import { getRepositoryDetail, updateRepository, RepositoryDetail, UpdateRepositoryRequest } from '../../api/repository';
import { useUser } from '../../contexts/UserContext';
import { useToastContext } from '../../contexts/ToastContext';
import pencilIcon from '../../assets/pencilIcon.svg';

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f7faff;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TitleSection = styled.div`
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  padding: 24px 58px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 26px;
  color: #292929;
  margin: 0;
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: #f8f9fa;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e9ecef;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  img {
    width: 16px;
    height: 16px;
    opacity: 0.7;
  }
`;

const Subtitle = styled.p`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.62);
  margin: 0;
  letter-spacing: 0.94%;
`;

const GraphContainer = styled.div`
  flex: 1;
  width: calc(100vw - 280px); /* SideBar 너비(280px)를 제외한 전체 너비 */
  height: calc(100vh - 180px); /* 헤더와 타이틀 영역을 제외한 높이 */
  overflow: hidden;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: 'Pretendard';
  font-size: 18px;
  color: #666;
`;

const RepositoryHistoryPage: React.FC = () => {
  const { repositoryId } = useParams<{ repositoryId: string }>();
  const navigate = useNavigate();
  const { userInfo } = useUser();
  const toast = useToastContext();
  
  // Repository Detail State
  const [repositoryDetail, setRepositoryDetail] = useState<RepositoryDetail | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // History States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [isProposalListModalOpen, setIsProposalListModalOpen] = useState(false);
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(null);
  const [selectedProposalDetail, setSelectedProposalDetail] = useState<any | null>(null);
  const [isProposalDetailModalOpen, setIsProposalDetailModalOpen] = useState(false);
  const [proposalList, setProposalList] = useState<any[]>([]);
  const [proposalListLoading, setProposalListLoading] = useState(false);
  const [selectedHistoryDetail, setSelectedHistoryDetail] = useState<HistoryDetailResponse | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ userId: string; nickname: string; email: string; profileImage?: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [createTitle, setCreateTitle] = useState('');
  const [createContent, setCreateContent] = useState('');
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalContent, setProposalContent] = useState('');
  const [selectedHistoryForProposal, setSelectedHistoryForProposal] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [parentFileId, setParentFileId] = useState<string | null>(null);
  const [histories, setHistories] = useState<HistoryListResponse[][]>([]);
  const [rootFiles, setRootFiles] = useState<HistoryFileResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 상대적인 시간 표시 함수
  const getRelativeTime = useCallback((dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return '방금 전';
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    if (diffInDays < 7) return `${diffInDays}일 전`;
    return date.toLocaleDateString();
  }, []);

  // API 데이터를 그래프 노드 형태로 변환 (useMemo로 최적화)
  const graphNodes = useMemo(() => {
    if (!histories.length || !repositoryId) return [];
    
    const nodes: any[] = [];

    // 모든 히스토리를 하나의 배열로 평탄화
    const allHistories: HistoryListResponse[] = [];
    histories.forEach(historyGroup => {
      allHistories.push(...historyGroup);
    });

    // fileId를 키로 하는 맵 생성
    const fileIdToHistoryMap = new Map<string, HistoryListResponse>();
    allHistories.forEach(history => {
      fileIdToHistoryMap.set(history.fileId, history);
    });

    // 각 히스토리의 깊이 계산 (루트부터의 거리)
    const calculateDepth = (history: HistoryListResponse, visited = new Set<string>()): number => {
      if (visited.has(history.fileId)) return 0; // 순환 참조 방지
      visited.add(history.fileId);
      
      if (!history.parentFileId) return 0; // 루트 노드
      
      const parentHistory = fileIdToHistoryMap.get(history.parentFileId);
      if (!parentHistory) return 0;
      
      return 1 + calculateDepth(parentHistory, visited);
    };

    // 루트 노드들 찾기
    const rootHistories = allHistories.filter(history => !history.parentFileId);
    
    // 각 루트의 하위 트리 구성
    const getRootForHistory = (history: HistoryListResponse): HistoryListResponse => {
      if (!history.parentFileId) return history;
      const parentHistory = fileIdToHistoryMap.get(history.parentFileId);
      if (!parentHistory) return history;
      return getRootForHistory(parentHistory);
    };

    // 루트별로 히스토리 그룹화
    const rootGroups = new Map<string, HistoryListResponse[]>();
    allHistories.forEach(history => {
      const root = getRootForHistory(history);
      if (!rootGroups.has(root.fileId)) {
        rootGroups.set(root.fileId, []);
      }
      rootGroups.get(root.fileId)!.push(history);
    });

    // 각 루트 그룹별로 노드 배치
    let rootIndex = 0;
    const rootSpacing = 400; // 루트 간 간격 (600 -> 400으로 축소)
    const baseX = 200; // 시작 X 위치

    rootGroups.forEach((groupHistories, rootFileId) => {
      // 현재 루트 그룹의 X 시작 위치
      const rootBaseX = baseX + (rootIndex * rootSpacing);
      
      // 깊이별로 노드 개수 계산 (현재 그룹 내에서만)
      const depthCounts: { [depth: number]: number } = {};
      const depthCounters: { [depth: number]: number } = {};
      
      groupHistories.forEach(history => {
        const depth = calculateDepth(history);
        depthCounts[depth] = (depthCounts[depth] || 0) + 1;
      });

      // 깊이별 카운터 초기화
      Object.keys(depthCounts).forEach(depth => {
        depthCounters[parseInt(depth)] = 0;
      });

      // 현재 그룹의 히스토리들 배치
      groupHistories.forEach(history => {
        const depth = calculateDepth(history);
        const currentDepthCount = depthCounts[depth];
        const currentPosition = depthCounters[depth];
        
        // 깊이별로 노드들을 중앙 정렬하면서 충분한 간격 확보
        const nodeWidth = 350; // 노드 예상 너비 + 여유 공간
        const totalWidth = currentDepthCount * nodeWidth;
        const startX = rootBaseX - (totalWidth / 2) + (rootSpacing / 2);
        
        nodes.push({
          id: history.id,
          userName: history.createdBy?.nickname || 'Unknown User',
          title: history.title,
          description: history.content,
          timeAgo: history.createdAt ? getRelativeTime(history.createdAt) : 'Unknown',
          isMain: history.historyStatus === 'MAIN' || (history.historyStatus as any) === 'NORMAL',
          fileLevel: history.fileLevel,
          historyId: history.id,
          onDetailClick: () => handleHistoryDetailClick(history.id),
          onEditClick: () => handleHistoryEditClick(history.id),
          onCreateClick: () => handleHistoryCreateClick(history.id),
          onProposalClick: () => handleProposalCreateClick(history.id),
          currentUserId: currentUser?.userId,
          historyCreatorId: history.createdBy?.providerId,
          createdBy: history.createdBy,
          x: startX + (currentPosition * nodeWidth),
          y: 80 + (depth * 220),
        });
        
        depthCounters[depth]++;
      });

      rootIndex++;
    });

    return nodes;
  }, [histories, getRelativeTime, currentUser, repositoryId]);

  // parentFileId 기반 엣지 생성 (useMemo로 최적화)
  const graphEdges = useMemo(() => {
    if (!histories.length) return [];
    
    const edges: any[] = [];
    
    // 모든 히스토리를 하나의 배열로 평탄화
    const allHistories: HistoryListResponse[] = [];
    histories.forEach(historyGroup => {
      allHistories.push(...historyGroup);
    });
    
    // fileId를 키로 하는 맵 생성 (빠른 검색을 위해)
    const fileIdToHistoryMap = new Map<string, HistoryListResponse>();
    allHistories.forEach(history => {
      fileIdToHistoryMap.set(history.fileId, history);
    });
    
    // 각 히스토리에 대해 부모-자식 관계 확인
    allHistories.forEach(history => {
      if (history.parentFileId) {
        // 부모 파일 ID에 해당하는 히스토리 찾기
        const parentHistory = fileIdToHistoryMap.get(history.parentFileId);
        if (parentHistory) {
          // 부모 히스토리에서 현재 히스토리로 엣지 생성
          edges.push({
            source: parentHistory.id,
            target: history.id,
          });
        }
      }
    });

    return edges;
  }, [histories]);

  // 히스토리 상세 조회 함수
  const handleHistoryDetailClick = useCallback(async (historyId: string) => {
    if (!repositoryId) return;
    
    try {
      setDetailLoading(true);
      const response = await getHistoryDetail(repositoryId, historyId);
      
      if (response.code === 100 && response.data) {
        setSelectedHistoryDetail(response.data);
        setIsDetailModalOpen(true);
      }
    } catch (err) {
      console.error('Failed to fetch history detail:', err);
    } finally {
      setDetailLoading(false);
    }
  }, [repositoryId]);

  // 히스토리 편집 모드로 모달 열기
  const handleHistoryEditClick = useCallback(async (historyId: string) => {
    if (!repositoryId) return;
    
    try {
      setDetailLoading(true);
      const response = await getHistoryDetail(repositoryId, historyId);
      
      if (response.code === 100 && response.data) {
        setSelectedHistoryDetail(response.data);
        setEditedTitle(response.data.title);
        setEditedContent(response.data.content);
        setIsEditing(true);
        setIsDetailModalOpen(true);
      }
    } catch (err) {
      console.error('Failed to fetch history detail:', err);
    } finally {
      setDetailLoading(false);
    }
  }, [repositoryId]);

  // 히스토리 생성 모달 열기
  const handleHistoryCreateClick = useCallback((historyId?: string) => {
    // 선택된 히스토리를 찾아서 해당 히스토리의 fileId를 parentFileId로 사용
    let targetParentFileId: string | null = null;
    
    if (historyId) {
      // histories 배열에서 해당 히스토리를 찾기
      for (const historyGroup of histories) {
        const foundHistory = historyGroup.find(h => h.id === historyId);
        if (foundHistory) {
          targetParentFileId = foundHistory.fileId;
          break;
        }
      }
    }
    
    setParentFileId(targetParentFileId);
    setCreateTitle('');
    setCreateContent('');
    setSelectedFiles([]);
    setIsCreateModalOpen(true);
  }, [histories]);

  // Proposal 생성 모달 열기
  const handleProposalCreateClick = useCallback((historyId: string) => {
    setSelectedHistoryForProposal(historyId);
    setProposalTitle('');
    setProposalContent('');
    setIsProposalModalOpen(true);
  }, []);

  // Proposal 목록 모달 열기
  const handleProposalListOpen = useCallback(async () => {
    if (!repositoryId) return;
    
    setIsProposalListModalOpen(true);
    setProposalListLoading(true);
    try {
      const response = await getProposalsByRepository(repositoryId, 'ALL');
      if (response.code === 100 && response.data) {
        // API status -> frontend status 매핑 함수
        const mapStatus = (apiStatus: string): 'progress' | 'merge' | 'close' => {
          switch (apiStatus.toLowerCase()) {
            case 'open':
              return 'progress';
            case 'merge':
              return 'merge';
            case 'close':
              return 'close';
            default:
              return 'progress';
          }
        };
        // API 응답을 ModalPPList의 PPItem 형식으로 변환
        const formattedProposals = response.data.map(proposal => ({
          id: proposal.proposalId,
          Name: proposal.title,
          content: proposal.description,
          status: mapStatus(proposal.status)
        }));
        setProposalList(formattedProposals);
      }
    } catch (err) {
      console.error('Failed to fetch proposals:', err);
    } finally {
      setProposalListLoading(false);
    }
  }, [repositoryId]);

  // 메뉴 클릭 핸들러
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

  // 레포지토리 상세 정보 조회
  const fetchRepositoryDetail = async () => {
    if (!repositoryId) {
      setError('레포지토리 ID가 없습니다.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const detail = await getRepositoryDetail(repositoryId);
      setRepositoryDetail(detail);

      // 히스토리 데이터 가져오기
      const historiesResponse = await getFilteredHistories(repositoryId, undefined, 'all');
      if (historiesResponse.code === 100 && historiesResponse.data) {
        setHistories(historiesResponse.data);
      }

      // 루트 파일 데이터 가져오기
      const rootFilesResponse = await getHistoryRootFiles(repositoryId);
      if (rootFilesResponse.code === 100 && rootFilesResponse.data) {
        setRootFiles(rootFilesResponse.data);
      }
    } catch (err) {
      console.error('데이터 조회 실패:', err);
      setError('데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 레포지토리 수정 핸들러
  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (name: string, description: string) => {
    if (!repositoryId || !repositoryDetail) return;

    try {
      setIsUpdating(true);
      
      const updateData: UpdateRepositoryRequest = {
        name,
        description,
      };

      const response = await updateRepository(repositoryId, updateData);
      
      if (response.code === 100) {
        setRepositoryDetail(prev => prev ? {
          ...prev,
          name: response.data.name,
          description: response.data.description,
        } : null);
        
        setIsEditModalOpen(false);
        toast.success('레포지토리가 성공적으로 수정되었습니다.');
      } else {
        toast.error(`수정 실패: ${response.message}`);
      }
    } catch (error) {
      console.error('레포지토리 수정 실패:', error);
      toast.error('레포지토리 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsUpdating(false);
    }
  };

  // 현재 사용자가 어드민(레포지토리 소유자)인지 확인
  const isAdmin = repositoryDetail && userInfo
    ? repositoryDetail.owner.email === userInfo.email
    : false;

  // Proposal 상세 모달 열기
  const handleProposalDetailOpen = useCallback(async (proposalId: string) => {
    if (!proposalId) return;
    setSelectedProposalId(proposalId);
    setIsProposalDetailModalOpen(true);
    try {
      const response = await getProposalById(proposalId);
      if (response.code === 100 && response.data) {
        setSelectedProposalDetail(response.data);
      } else {
        setSelectedProposalDetail(null);
      }
    } catch (err) {
      setSelectedProposalDetail(null);
    }
  }, []);

  // 현재 사용자 정보 설정
  useEffect(() => {
    if (userInfo) {
      setCurrentUser({
        userId: userInfo.providerId,
        nickname: userInfo.nickname || 'Unknown User',
        email: userInfo.email || '',
        profileImage: userInfo.profileImage
      });
    }
  }, [userInfo]);

  useEffect(() => {
    fetchRepositoryDetail();
  }, [repositoryId]);

  if (loading) {
    return (
      <PageContainer>
        <SideBar activeMenu="저장소" onMenuClick={handleMenuClick} />
        <LoadingContainer>
          레포지토리 정보를 불러오는 중...
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (error || !repositoryDetail) {
    return (
      <PageContainer>
        <SideBar activeMenu="저장소" onMenuClick={handleMenuClick} />
        <MainContent>
          <RepoHeader hasNewNotification={true} />
          <TitleSection>
            <TitleContainer>
              <Title>오류 발생</Title>
            </TitleContainer>
            <Subtitle>{error || '레포지토리 정보를 찾을 수 없습니다.'}</Subtitle>
          </TitleSection>
        </MainContent>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SideBar activeMenu="저장소" onMenuClick={handleMenuClick} />
      <MainContent>
        <RepoHeader
          hasNewNotification={true}
          onTeamIconClick={() => setIsModalOpen(true)}
          onRepoIconClick={handleProposalListOpen}
        />
        <TitleSection>
          <TitleContainer>
            <Title>{repositoryDetail.name}</Title>
            {isAdmin && (
              <EditButton 
                onClick={handleEditClick}
                aria-label="레포지토리 수정"
                title="레포지토리 수정"
              >
                <img src={pencilIcon} alt="수정" />
              </EditButton>
            )}
          </TitleContainer>
          <Subtitle>{repositoryDetail.description || '설명이 없습니다.'}</Subtitle>
        </TitleSection>
        <GraphContainer>
          <CanvasRepoGraph 
            nodes={graphNodes} 
            edges={graphEdges} 
          />
        </GraphContainer>
      </MainContent>

      {repositoryId && (
        <>
      <TeamInviteModal
        repositoryId={repositoryId}
        isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onInvite={() => {}}
          />

          <EditRepositoryModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleEditSubmit}
            initialName={repositoryDetail.name}
            initialDescription={repositoryDetail.description || ''}
            loading={isUpdating}
      />

      {isDetailModalOpen && selectedHistoryDetail && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <ModalSimple
            headerTitle={selectedHistoryDetail.createdBy.nickname}
            headerTime={selectedHistoryDetail.createAt ? new Date(selectedHistoryDetail.createAt).toLocaleDateString() : ''}
            modalTitle="히스토리 상세 정보"
            contentTitle={isEditing ? editedTitle : selectedHistoryDetail.title}
            content={isEditing ? editedContent : selectedHistoryDetail.content}
            items={selectedHistoryDetail.files.map(file => ({
              Name: file.name,
              date: file.fileType,
              iconType: 'diff' as const
            }))}
                onClose={() => {
                  setIsDetailModalOpen(false);
                  setSelectedHistoryDetail(null);
                  setIsEditing(false);
                  setEditedTitle('');
                  setEditedContent('');
                }}
            isEditing={isEditing}
                canEdit={isAdmin}
                onEditStart={() => {
                  setIsEditing(true);
                  setEditedTitle(selectedHistoryDetail.title);
                  setEditedContent(selectedHistoryDetail.content);
                }}
                onEditCancel={() => {
                  setIsEditing(false);
                  setEditedTitle('');
                  setEditedContent('');
                }}
                onEditSave={async () => {
                  if (!selectedHistoryDetail) return;

                  try {
                    const updateData = {
                      title: editedTitle,
                      content: editedContent
                    };

                    const response = await updateHistory(repositoryId, selectedHistoryDetail.Id, updateData);
                    
                    if (response.code === 100) {
                      // 성공적으로 업데이트된 경우 상세 정보 다시 가져오기
                      const updatedDetailResponse = await getHistoryDetail(repositoryId, selectedHistoryDetail.Id);
                      if (updatedDetailResponse.code === 100 && updatedDetailResponse.data) {
                        setSelectedHistoryDetail(updatedDetailResponse.data);
                      }
                      setIsEditing(false);
                      setEditedTitle('');
                      setEditedContent('');
                      
                      // 히스토리 목록도 다시 가져오기
                      const historiesResponse = await getFilteredHistories(repositoryId, undefined, 'all');
                      if (historiesResponse.code === 100 && historiesResponse.data) {
                        setHistories(historiesResponse.data);
                      }
                    }
                  } catch (err) {
                    console.error('Failed to update history:', err);
                  }
                }}
            onTitleChange={setEditedTitle}
            onContentChange={setEditedContent}
          />
        </div>
      )}

      {isCreateModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <ModalSimple
            headerTitle={currentUser?.nickname || 'Unknown User'}
            headerTime={new Date().toLocaleDateString()}
            modalTitle="히스토리 생성"
            contentTitle={createTitle}
            content={createContent}
            items={selectedFiles.map(file => ({
              Name: file.name,
              date: new Date().toLocaleDateString(),
              iconType: 'upload' as const
            }))}
                onClose={() => {
                  setIsCreateModalOpen(false);
                  setParentFileId(null);
                  setCreateTitle('');
                  setCreateContent('');
                  setSelectedFiles([]);
                }}
            isEditing={true}
            canEdit={true}
            onEditStart={() => {}}
                onEditCancel={() => {
                  setIsCreateModalOpen(false);
                  setParentFileId(null);
                  setCreateTitle('');
                  setCreateContent('');
                  setSelectedFiles([]);
                }}
                onEditSave={async () => {
                  if (!createTitle.trim()) {
                    return;
                  }

                  if (selectedFiles.length === 0) {
                    return;
                  }

                  try {
                    const formData = new FormData();
                    
                    // JSON 데이터를 historyCreateRequest 파트로 추가
                    const historyCreateRequest = {
                      title: createTitle,
                      ...(createContent.trim() && { content: createContent }),
                      ...(parentFileId && { parentFileId: parentFileId })
                    };
                    
                    // JSON 파트를 올바른 Content-Type으로 추가
                    const historyCreateRequestJson = JSON.stringify(historyCreateRequest);
                    formData.append('historyCreateRequest', historyCreateRequestJson);

                    // 파일 추가
                    formData.append('file', selectedFiles[0]);

                    const response = await createHistory(repositoryId, formData);
                    
                    if (response.code === 100) {
                      // 성공적으로 생성된 경우 모달 닫기
                      setIsCreateModalOpen(false);
                      setParentFileId(null);
                      setCreateTitle('');
                      setCreateContent('');
                      setSelectedFiles([]);
                      
                      // 히스토리 목록 다시 가져오기
                      const historiesResponse = await getFilteredHistories(repositoryId, undefined, 'all');
                      if (historiesResponse.code === 100 && historiesResponse.data) {
                        setHistories(historiesResponse.data);
                      }
                    }
                  } catch (err) {
                    console.error('Failed to create history:', err);
                  }
                }}
            onTitleChange={setCreateTitle}
            onContentChange={setCreateContent}
                onFileSelect={(files: FileList | null) => {
                  if (files && files.length > 0) {
                    // 첫 번째 파일만 선택
                    setSelectedFiles([files[0]]);
                  }
                }}
                onFileRemove={(index: number) => {
                  setSelectedFiles([]);
                }}
            isCreating={true}
          />
        </div>
      )}

      {isProposalModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <ModalSimple
            headerTitle={currentUser?.nickname || 'Unknown User'}
            headerTime={new Date().toLocaleDateString()}
            modalTitle="Proposal 생성"
            contentTitle={proposalTitle}
            content={proposalContent}
            items={[]}
                onClose={() => {
                  setIsProposalModalOpen(false);
                  setSelectedHistoryForProposal(null);
                  setProposalTitle('');
                  setProposalContent('');
                }}
            isEditing={true}
            canEdit={true}
                onEditStart={() => {
                  setIsEditing(true);
                  setProposalTitle('');
                  setProposalContent('');
                }}
                onEditCancel={() => {
                  setIsEditing(false);
                  setProposalTitle('');
                  setProposalContent('');
                }}
                onEditSave={async () => {
                  if (!proposalTitle.trim()) {
                    return;
                  }

                  if (!selectedHistoryForProposal) {
                    return;
                  }

                  try {
                    const proposalData = {
                      historyId: selectedHistoryForProposal,
                      title: proposalTitle,
                      ...(proposalContent.trim() && { description: proposalContent })
                    };

                    const response = await createProposal(proposalData);
                    
                    if (response.code === 100) {
                      // 성공적으로 생성된 경우 모달 닫기
                      setIsProposalModalOpen(false);
                      setSelectedHistoryForProposal(null);
                      setProposalTitle('');
                      setProposalContent('');
                    }
                  } catch (err) {
                    console.error('Failed to create proposal:', err);
                  }
                }}
            onTitleChange={setProposalTitle}
            onContentChange={setProposalContent}
            isCreating={false}
            isProposal={true}
          />
        </div>
      )}

      {isProposalListModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <ModalPPList 
            items={proposalList}
                onClose={() => {
                  setIsProposalListModalOpen(false);
                }}
                onProposalClick={(proposalId) => {
                  handleProposalDetailOpen(proposalId);
                }}
          />
        </div>
      )}

      {isProposalDetailModalOpen && selectedProposalDetail && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <Modal
            headerTitle={selectedProposalDetail.title}
            headerTime={''}
            modalTitle="Proposal 상세"
            contentTitle={selectedProposalDetail.title}
            content={selectedProposalDetail.description}
            items={[]}
            comments={[]}
                onReject={() => {
                  setIsProposalDetailModalOpen(false);
                  setSelectedProposalId(null);
                  setSelectedProposalDetail(null);
                }}
                onAccept={() => {
                  setIsProposalDetailModalOpen(false);
                  setSelectedProposalId(null);
                  setSelectedProposalDetail(null);
                }}
                onClose={() => {
                  setIsProposalDetailModalOpen(false);
                  setSelectedProposalId(null);
                  setSelectedProposalDetail(null);
                }}
          />
        </div>
          )}
        </>
      )}
    </PageContainer>
  );
};

export default RepositoryHistoryPage; 