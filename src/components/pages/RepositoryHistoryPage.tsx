import React, { useState, useEffect, useMemo, useCallback } from "react";
import styled from 'styled-components';
import SideBar from '../common/SideBar';
import RepoHeader from '../layout/RepoHeader';
import RepositoryTile from '../layout/RepositoryTitle';
import PhysicsRepoGraph from '../common/PhysicsRepoGraph';
import TeamInviteModal from '../layout/TeamInviteModal';
import ModalSimple from '../layout/ModalSimple';
import Modal from '../layout/Modal';
import { getFilteredHistories, getHistoryRootFiles, getHistoryDetail, updateHistory, createHistory } from '../../api/history';
import { HistoryListResponse, HistoryFileResponse, HistoryDetailResponse } from '../../api/history/types';
import { UUID } from '../../api/common/types';
import AuthService from '../../api/auth';
import { createProposal, getProposalsByRepository, getProposalById } from '../../api/proposal';
import ModalPPList from '../layout/ModalPPList';

const PageContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const GraphContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

interface RepositoryHistoryPageProps {
  repositoryId?: UUID;
}

const RepositoryHistoryPage: React.FC<RepositoryHistoryPageProps> = React.memo(({ 
  repositoryId = "1a728c51-4cca-43b5-a41e-08c1edcc33f6" 
}) => {
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

  // 콜백 함수들을 useCallback으로 최적화
  const handleTeamIconClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleInvite = useCallback((email: string) => {
    console.log('Invite requested for', email);
  }, []);

  // 히스토리 상세 조회 함수
  const handleHistoryDetailClick = useCallback(async (historyId: string) => {
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

  // 상세 모달 닫기
  const handleDetailModalClose = useCallback(() => {
    setIsDetailModalOpen(false);
    setSelectedHistoryDetail(null);
    setIsEditing(false);
    setEditedTitle('');
    setEditedContent('');
  }, []);

  // 편집 시작
  const handleEditStart = useCallback(() => {
    if (selectedHistoryDetail) {
      setEditedTitle(selectedHistoryDetail.title);
      setEditedContent(selectedHistoryDetail.content);
      setIsEditing(true);
    }
  }, [selectedHistoryDetail]);

  // 편집 취소
  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
    setEditedTitle('');
    setEditedContent('');
  }, []);

  // 편집 저장
  const handleEditSave = useCallback(async () => {
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
  }, [repositoryId, selectedHistoryDetail, editedTitle, editedContent]);

  // 편집 권한 확인
  const canEditHistory = useMemo(() => {
    if (!currentUser || !selectedHistoryDetail) return false;
    return currentUser.userId === selectedHistoryDetail.createdBy.providerId;
  }, [currentUser, selectedHistoryDetail]);

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

  // Proposal 모달 닫기
  const handleProposalModalClose = useCallback(() => {
    setIsProposalModalOpen(false);
    setSelectedHistoryForProposal(null);
    setProposalTitle('');
    setProposalContent('');
  }, []);

  // Proposal 저장
  const handleProposalSave = useCallback(async () => {
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
        handleProposalModalClose();
      }
    } catch (err) {
      console.error('Failed to create proposal:', err);
    }
  }, [proposalTitle, proposalContent, selectedHistoryForProposal, handleProposalModalClose]);

  // 생성 모달 닫기
  const handleCreateModalClose = useCallback(() => {
    setIsCreateModalOpen(false);
    setParentFileId(null);
    setCreateTitle('');
    setCreateContent('');
    setSelectedFiles([]);
  }, []);

  // 파일 선택 핸들러
  const handleFileSelect = useCallback((files: FileList | null) => {
    if (files && files.length > 0) {
      // 첫 번째 파일만 선택
      setSelectedFiles([files[0]]);
    }
  }, []);

  // 파일 제거 핸들러
  const handleFileRemove = useCallback((index: number) => {
    setSelectedFiles([]);
  }, []);

  // 히스토리 생성 저장
  const handleCreateSave = useCallback(async () => {
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
        handleCreateModalClose();
        
        // 히스토리 목록 다시 가져오기
        const historiesResponse = await getFilteredHistories(repositoryId, undefined, 'all');
        if (historiesResponse.code === 100 && historiesResponse.data) {
          setHistories(historiesResponse.data);
        }
      }
    } catch (err) {
      console.error('Failed to create history:', err);
    }
  }, [repositoryId, createTitle, createContent, parentFileId, selectedFiles, handleCreateModalClose]);

  // Proposal 목록 모달 열기
  const handleProposalListOpen = useCallback(async () => {
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
          id: proposal.id || proposal.proposalId,
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

  // Proposal 목록 모달 닫기
  const handleProposalListClose = useCallback(() => {
    setIsProposalListModalOpen(false);
  }, []);

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

  const handleProposalDetailClose = useCallback(() => {
    setIsProposalDetailModalOpen(false);
    setSelectedProposalId(null);
    setSelectedProposalDetail(null);
  }, []);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 토큰에서 사용자 정보 가져오기
        const userFromToken = AuthService.getUserFromToken();
        if (userFromToken) {
          setCurrentUser(userFromToken);
        }

        const [rootFilesResponse, historiesResponse] = await Promise.all([
          getHistoryRootFiles(repositoryId),
          getFilteredHistories(repositoryId, undefined, 'all')
        ]);

        if (rootFilesResponse.code === 100 && rootFilesResponse.data) {
          setRootFiles(rootFilesResponse.data);
        }

        if (historiesResponse.code === 100 && historiesResponse.data) {
          setHistories(historiesResponse.data);
        }
      } catch (err) {
        console.error('Failed to fetch history data:', err);
        setError('히스토리 데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, [repositoryId]);

  // API 데이터를 그래프 노드 형태로 변환 (useMemo로 최적화)
  const graphNodes = useMemo(() => {
    if (!histories.length) return [];
    
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
          onDetailClick: handleHistoryDetailClick,
          onEditClick: handleHistoryEditClick,
          onCreateClick: handleHistoryCreateClick,
          onProposalClick: handleProposalCreateClick,
          currentUserId: currentUser?.userId,
          historyCreatorId: history.createdBy?.providerId,
          // 같은 깊이 내에서 노드들을 균등하게 분산
          x: startX + (currentPosition * nodeWidth),
          // 깊이별로 세로 간격 (루트가 위, 하위 깊이가 아래)
          y: 80 + (depth * 220),
        });
        
        // 해당 깊이의 카운터 증가
        depthCounters[depth]++;
      });

      rootIndex++;
    });

    return nodes;
  }, [histories, getRelativeTime, handleHistoryDetailClick, handleHistoryEditClick, handleHistoryCreateClick, handleProposalCreateClick, currentUser]);

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

  // 로딩 상태 컴포넌트를 메모이제이션
  const LoadingComponent = useMemo(() => (
    <PageContainer>
      <SideBar activeMenu="저장소" />
      <MainContent>
        <RepoHeader
          hasNewNotification={true}
          onTeamIconClick={handleTeamIconClick}
        />
        <RepositoryTile 
          title="캡스톤 디자인" 
          subtitle="2025 상반기 프로젝트" 
        />
        <GraphContainer>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            로딩 중...
          </div>
        </GraphContainer>
      </MainContent>
    </PageContainer>
  ), [handleTeamIconClick]);

  // 에러 상태 컴포넌트를 메모이제이션
  const ErrorComponent = useMemo(() => (
    <PageContainer>
      <SideBar activeMenu="저장소" />
      <MainContent>
        <RepoHeader
          hasNewNotification={true}
          onTeamIconClick={handleTeamIconClick}
        />
        <RepositoryTile 
          title="캡스톤 디자인" 
          subtitle="2025 상반기 프로젝트" 
        />
        <GraphContainer>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'red' }}>
            {error}
          </div>
        </GraphContainer>
      </MainContent>
    </PageContainer>
  ), [error, handleTeamIconClick]);

  if (loading) return LoadingComponent;
  if (error) return ErrorComponent;

  return (
    <PageContainer>
      <SideBar activeMenu="저장소" />
      <MainContent>
        <RepoHeader
          hasNewNotification={true}
          onTeamIconClick={handleTeamIconClick}
          onRepoIconClick={handleProposalListOpen}
        />
        <RepositoryTile 
          title="캡스톤 디자인" 
          subtitle="2025 상반기 프로젝트" 
        />
        <GraphContainer>
          <PhysicsRepoGraph 
            nodes={graphNodes} 
            edges={graphEdges} 
          />
        </GraphContainer>
      </MainContent>

      <TeamInviteModal
        repositoryId={repositoryId}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onInvite={handleInvite}
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
            onClose={handleDetailModalClose}
            isEditing={isEditing}
            canEdit={canEditHistory}
            onEditStart={handleEditStart}
            onEditCancel={handleEditCancel}
            onEditSave={handleEditSave}
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
            onClose={handleCreateModalClose}
            isEditing={true}
            canEdit={true}
            onEditStart={() => {}}
            onEditCancel={handleCreateModalClose}
            onEditSave={handleCreateSave}
            onTitleChange={setCreateTitle}
            onContentChange={setCreateContent}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
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
            onClose={handleProposalModalClose}
            isEditing={true}
            canEdit={true}
            onEditStart={() => {}}
            onEditCancel={handleProposalModalClose}
            onEditSave={handleProposalSave}
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
            onClose={handleProposalListClose}
            onProposalClick={handleProposalDetailOpen}
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
            onReject={handleProposalDetailClose}
            onAccept={handleProposalDetailClose}
            onClose={handleProposalDetailClose}
          />
        </div>
      )}
    </PageContainer>
  );
});

export default RepositoryHistoryPage; 