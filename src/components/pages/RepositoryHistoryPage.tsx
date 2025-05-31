import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
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
import { createProposal, getProposalsByRepository, getProposalById, updateProposal, mergeProposal, updateProposalStatus } from '../../api/proposal';
import ModalPPList from '../layout/ModalPPList';
import { getRepositoryDetail, updateRepository, RepositoryDetail, UpdateRepositoryRequest } from '../../api/repository';
import { useUser } from '../../contexts/UserContext';
import { useToastContext } from '../../contexts/ToastContext';
import pencilIcon from '../../assets/pencilIcon.svg';
import { getUserAuthority } from '../../api/user';
import { getReviewsByProposal, createReview, updateReview, deleteReview } from '../../api/review';
import { Review, ReviewCreateRequest, ReviewUpdateRequest } from '../../api/review/types';
import HistoryDetailModal from '../common/HistoryDetailModal';

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  background: ${({ theme }) => theme.background};
  width: 100%;
  min-width: 0;
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${({ theme }) => theme.cardBackground};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 24px;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

const CreateButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  font-family: 'Pretendard';
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.hoverBackground};
  }
`;

const ProposalButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.background};
  font-family: 'Pretendard';
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  min-width: 0;
  max-width: 100vw;
  box-sizing: border-box;
`;

const TitleSection = styled.div`
  background: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.borderLight};
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
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: ${({ theme }) => theme.backgroundLighter};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.hoverBackground};
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
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  letter-spacing: 0.94%;
`;

const GraphContainer = styled.div`
  flex: 1;
  width: 100%;
  min-width: 0;
  height: calc(100vh - 180px);
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  box-sizing: border-box;
`;

const CenterContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 80px 20px;
  text-align: center;
`;

const EmptyIcon = styled.img`
  width: 80px;
  height: 80px;
  opacity: 0.3;
  margin-bottom: 24px;
`;

const EmptyTitle = styled.h3`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 20px;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0 0 12px 0;
  transition: color 0.3s ease;
`;

const EmptyDescription = styled.p`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0 0 32px 0;
  line-height: 1.5;
  max-width: 400px;
  opacity: 0.8;
  transition: color 0.3s ease;
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
  const [allHistories, setAllHistories] = useState<HistoryListResponse[][]>([]);
  const [histories, setHistories] = useState<HistoryListResponse[][]>([]);
  const [rootFiles, setRootFiles] = useState<HistoryFileResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userAuthority, setUserAuthority] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewContent, setReviewContent] = useState('');

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
    const all: HistoryListResponse[] = [];
    histories.forEach((historyGroup: HistoryListResponse[]) => {
      all.push(...historyGroup);
    });

    // fileId를 키로 하는 맵 생성
    const fileIdToHistoryMap = new Map<string, HistoryListResponse>();
    all.forEach(history => {
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
    const rootHistories = all.filter(history => !history.parentFileId);
    
    // 각 루트의 하위 트리 구성
    const getRootForHistory = (history: HistoryListResponse): HistoryListResponse => {
      if (!history.parentFileId) return history;
      const parentHistory = fileIdToHistoryMap.get(history.parentFileId);
      if (!parentHistory) return history;
      return getRootForHistory(parentHistory);
    };

    // 루트별로 히스토리 그룹화
    const rootGroups = new Map<string, HistoryListResponse[]>();
    all.forEach(history => {
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
          onEditClick: history.createdBy?.providerId === currentUser?.userId ? () => handleHistoryEditClick(history.id) : undefined,
          onCreateClick: () => handleHistoryCreateClick(history.id),
          onProposalClick: () => handleProposalCreateClick(history.id),
          currentUserId: currentUser?.userId,
          historyCreatorId: history.createdBy?.providerId,
          createdBy: history.createdBy,
          parentFileId: history.parentFileId,
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
    const all: HistoryListResponse[] = [];
    histories.forEach((historyGroup: HistoryListResponse[]) => {
      all.push(...historyGroup);
    });
    
    // fileId를 키로 하는 맵 생성 (빠른 검색을 위해)
    const fileIdToHistoryMap = new Map<string, HistoryListResponse>();
    all.forEach(history => {
      fileIdToHistoryMap.set(history.fileId, history);
    });
    
    // 각 히스토리에 대해 부모-자식 관계 확인
    all.forEach(history => {
      if (history.parentFileId) {
        // 부모 파일 ID에 해당하는 히스토리 찾기
        const parentHistory = fileIdToHistoryMap.get(history.parentFileId);
        if (parentHistory) {
          // 부모 히스토리에서 현재 히스토리로 엣지 생성
          edges.push({
            source: parentHistory.id,
            target: history.id,
            isMainEdge: parentHistory.historyStatus === 'MAIN' && history.historyStatus === 'MAIN',
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
            case 'merged':
              return 'merge';
            case 'closed':
              return 'close';
            default:
              return 'progress';
          }
        };
        // API 응답을 ModalPPList의 PPItem 형식으로 변환
        const formattedProposals = response.data.map(proposal => ({
          id: proposal.id,
          Name: proposal.title,
          content: proposal.description || '',
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
        setAllHistories(historiesResponse.data);
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

  // 현재 사용자의 권한 확인
  const checkUserAuthority = useCallback(async () => {
    if (!repositoryId) return;

    try {
      const response = await getUserAuthority(repositoryId);
      console.log('User Authority Response:', response);
      setUserAuthority(response.authority);
    } catch (err) {
      console.error('Failed to fetch user authority:', err);
      // API 호출 실패 시 repositoryDetail의 owner 정보를 기반으로 권한 설정
      if (repositoryDetail && userInfo) {
        const isOwner = repositoryDetail.owner.email === userInfo.email;
        console.log('Falling back to owner check:', { isOwner });
        setUserAuthority(isOwner ? 'ADMIN' : null);
      } else {
        setUserAuthority(null);
      }
    }
  }, [repositoryId, repositoryDetail, userInfo]);

  // 현재 사용자가 admin 또는 reviewer인지 확인
  const canReviewProposal = useMemo(() => {
    console.log('User Authority:', userAuthority);
    const result = userAuthority === 'ADMIN' || userAuthority === 'REVIEWER';
    console.log('Can Review Proposal:', result);
    return result;
  }, [userAuthority]);

  // Proposal 상세 모달 열기
  const handleProposalDetailOpen = useCallback(async (proposalId: string) => {
    if (!proposalId) return;
    setSelectedProposalId(proposalId);
    setIsProposalDetailModalOpen(true);
    try {
      // Proposal 목록에서 상태 정보 가져오기
      const proposalFromList = proposalList.find(p => p.id === proposalId);
      const proposalStatus = proposalFromList?.status === 'progress' ? 'OPEN' :
                           proposalFromList?.status === 'merge' ? 'MERGED' :
                           proposalFromList?.status === 'close' ? 'CLOSED' : 'OPEN';
      
      console.log('Proposal Status:', proposalStatus);
      console.log('Debug Info:', {
        canReviewProposal,
        userAuthority,
        proposalStatus,
        isOpen: proposalStatus === 'OPEN'
      });

      const response = await getProposalById(proposalId);
      if (response.code === 100 && response.data) {
        const proposalData = {
          ...response.data,
          status: proposalStatus
        };
        setSelectedProposalDetail(proposalData);
        console.log('Selected Proposal Detail:', proposalData);

        // 댓글 목록 가져오기
        const reviewsResponse = await getReviewsByProposal(proposalId);
        if (reviewsResponse.code === 100 && reviewsResponse.data) {
          setReviews(reviewsResponse.data);
        }
      } else {
        setSelectedProposalDetail(null);
      }
    } catch (err) {
      console.error('Failed to fetch proposal detail:', err);
      setSelectedProposalDetail(null);
    }
  }, [proposalList, canReviewProposal, userAuthority]);

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

  // repositoryDetail이 변경될 때마다 권한 재확인
  useEffect(() => {
    if (repositoryDetail) {
      checkUserAuthority();
    }
  }, [repositoryDetail, checkUserAuthority]);

  // repositoryId가 변경될 때마다 권한 재확인
  useEffect(() => {
    checkUserAuthority();
  }, [repositoryId, checkUserAuthority]);

  useEffect(() => {
    fetchRepositoryDetail();
  }, [repositoryId]);

  // 댓글 작성 함수
  const handleCreateReview = async (content: string, parentId?: string) => {
    if (!selectedProposalId || !content.trim()) return;

    try {
      const reviewData: ReviewCreateRequest = {
        comment: content,
        ...(parentId && { parentId })
      };

      const response = await createReview(selectedProposalId, reviewData);
      if (response.code === 100) {
        // 댓글 목록 새로고침
        const reviewsResponse = await getReviewsByProposal(selectedProposalId);
        if (reviewsResponse.code === 100 && reviewsResponse.data) {
          setReviews(reviewsResponse.data);
        }
        setReviewContent(''); // 댓글 입력 초기화
      }
    } catch (err) {
      console.error('Failed to create review:', err);
    }
  };

  // 댓글 수정 함수
  const handleEditReview = async (reviewId: string, content: string) => {
    if (!selectedProposalId) return;

    try {
      const reviewData: ReviewUpdateRequest = {
        comment: content
      };

      const response = await updateReview(selectedProposalId, reviewId, reviewData);
      if (response.code === 100) {
        // 댓글 목록 새로고침
        const reviewsResponse = await getReviewsByProposal(selectedProposalId);
        if (reviewsResponse.code === 100 && reviewsResponse.data) {
          setReviews(reviewsResponse.data);
        }
      }
    } catch (err) {
      console.error('Failed to update review:', err);
    }
  };

  // 댓글 삭제 함수
  const handleDeleteReview = async (reviewId: string) => {
    if (!selectedProposalId) return;

    try {
      await deleteReview(selectedProposalId, reviewId);
      // 댓글 목록 새로고침
      const reviewsResponse = await getReviewsByProposal(selectedProposalId);
      if (reviewsResponse.code === 100 && reviewsResponse.data) {
        setReviews(reviewsResponse.data);
      }
    } catch (err) {
      console.error('Failed to delete review:', err);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <SideBar activeMenu="저장소" onMenuClick={handleMenuClick} />
        <MainContent>
          <RepoHeader
            onTeamIconClick={() => setIsModalOpen(true)}
            onRepoIconClick={handleProposalListOpen}
          />
          <RepositoryTile
            title="로딩 중..."
            subtitle="레포지토리 정보를 불러오는 중입니다."
            onTabChange={() => {}}
            onCreateClick={() => {}}
          />
          <GraphContainer>
            <CenterContainer>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'Pretendard',
                fontSize: '18px',
                color: 'var(--text-secondary)',
              }}>
                레포지토리 정보를 불러오는 중...
              </div>
            </CenterContainer>
          </GraphContainer>
        </MainContent>
      </PageContainer>
    );
  }

  if (error || !repositoryDetail) {
    return (
      <PageContainer>
        <SideBar activeMenu="저장소" onMenuClick={handleMenuClick} />
        <MainContent>
          <RepoHeader
            onTeamIconClick={() => setIsModalOpen(true)}
            onRepoIconClick={handleProposalListOpen}
          />
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
          onTeamIconClick={() => setIsModalOpen(true)}
          onRepoIconClick={handleProposalListOpen}
        />
        <RepositoryTile
          title={repositoryDetail.name}
          subtitle={repositoryDetail.description || '설명이 없습니다.'}
          onTabChange={(tab) => {
            if (!allHistories.length) return;
            let filtered: HistoryListResponse[][] = [];
            switch (tab) {
              case '전체':
                filtered = allHistories;
                break;
              case '주요':
                filtered = allHistories.map((group: HistoryListResponse[]) => group.filter(h => h.historyStatus === 'MAIN')).filter((g: HistoryListResponse[]) => g.length > 0);
                break;
              case '하위':
                filtered = allHistories.map((group: HistoryListResponse[]) => group.filter(h => h.historyStatus === 'NORMAL')).filter((g: HistoryListResponse[]) => g.length > 0);
                break;
              case '폐기':
                filtered = allHistories.map((group: HistoryListResponse[]) => group.filter(h => h.historyStatus === 'ABANDONED')).filter((g: HistoryListResponse[]) => g.length > 0);
                break;
              case '필터':
                filtered = allHistories;
                break;
            }
            setHistories(filtered);
          }}
          onCreateClick={handleEditClick}
        />
        <GraphContainer>
          {graphNodes.length === 0 ? (
            <CenterContainer>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
                padding: '40px',
                textAlign: 'center',
                background: 'transparent',
              }}>
                <h2 style={{ fontFamily: 'Pretendard', fontWeight: 700, fontSize: 24, color: 'var(--text-color)', marginBottom: 12 }}>아직 생성된 히스토리가 없어요</h2>
                <p style={{ fontFamily: 'Pretendard', fontWeight: 400, fontSize: 16, color: 'var(--text-secondary)', marginBottom: 32 }}>첫 번째 히스토리를 생성하여 문서 관리를 시작해보세요.</p>
                <button
                  onClick={() => handleHistoryCreateClick()}
                  style={{
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Pretendard',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    color: '#fff',
                    background: '#4078FF',
                  }}
                >
                  히스토리 생성하기
                </button>
              </div>
            </CenterContainer>
          ) : (
            <CanvasRepoGraph 
              nodes={graphNodes} 
              edges={graphEdges} 
            />
          )}
        </GraphContainer>
      </MainContent>

      {repositoryId && (
        <>
          <TeamInviteModal
            repositoryId={repositoryId}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onInvite={() => {}}
            isAdmin={isAdmin}
            userAuthority={userAuthority}
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
            <HistoryDetailModal
              userName={selectedHistoryDetail.createdBy.nickname}
              userProfileImage={selectedHistoryDetail.createdBy.profileImage}
              createdAt={selectedHistoryDetail.createAt ? new Date(selectedHistoryDetail.createAt).toLocaleDateString() : ''}
              title={isEditing ? editedTitle : selectedHistoryDetail.title}
              content={isEditing ? editedContent : selectedHistoryDetail.content}
              files={selectedHistoryDetail.files.map(file => ({
                Name: file.name,
                date: file.fileType,
                iconType: 'diff' as const,
                onCompareClick: () => {
                  alert('비교 기능은 추후 구현 예정');
                },
                onDownloadClick: () => {
                  const downloadFile = async () => {
                    try {
                      const response = await fetch(`/api/files/download/${file.id}`);
                      if (!response.ok) throw new Error('다운로드 실패');
                      const blob = await response.blob();
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = file.name || 'download';
                      document.body.appendChild(a);
                      a.click();
                      a.remove();
                      window.URL.revokeObjectURL(url);
                    } catch (err) {
                      alert('파일 다운로드에 실패했습니다.');
                    }
                  };
                  downloadFile();
                },
              }))}
              onClose={() => {
                setIsDetailModalOpen(false);
                setSelectedHistoryDetail(null);
                setIsEditing(false);
                setEditedTitle('');
                setEditedContent('');
              }}
              canEdit={selectedHistoryDetail.createdBy.providerId === currentUser?.userId}
              isEditing={isEditing}
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
                    toast.success('히스토리가 성공적으로 수정되었습니다.');
                    const updatedDetailResponse = await getHistoryDetail(repositoryId, selectedHistoryDetail.Id);
                    if (updatedDetailResponse.code === 100 && updatedDetailResponse.data) {
                      setSelectedHistoryDetail(updatedDetailResponse.data);
                    }
                    setIsEditing(false);
                    setEditedTitle('');
                    setEditedContent('');
                    const historiesResponse = await getFilteredHistories(repositoryId, undefined, 'all');
                    if (historiesResponse.code === 100 && historiesResponse.data) {
                      setHistories(historiesResponse.data);
                    }
                  } else {
                    toast.error(`히스토리 수정 실패: ${response.message}`);
                  }
                } catch (err) {
                  console.error('Failed to update history:', err);
                  toast.error('히스토리 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
                }
              }}
              onTitleChange={setEditedTitle}
              onContentChange={setEditedContent}
            />
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
                isModifying={true}
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
                    toast.warning('제목을 입력해주세요.');
                    return;
                  }
                  if (selectedFiles.length === 0) {
                    toast.warning('파일을 첨부해주세요.');
                    return;
                  }
                  try {
                    const formData = new FormData();
                    const historyCreateRequest = {
                      title: createTitle,
                      ...(createContent.trim() && { content: createContent }),
                      ...(parentFileId && { parentFileId: parentFileId })
                    };
                    const historyCreateRequestJson = JSON.stringify(historyCreateRequest);
                    formData.append('historyCreateRequest', historyCreateRequestJson);
                    formData.append('file', selectedFiles[0]);
                    const response = await createHistory(repositoryId, formData);
                    if (response.code === 100) {
                      toast.success('히스토리가 성공적으로 생성되었습니다.');
                      setIsCreateModalOpen(false);
                      setParentFileId(null);
                      setCreateTitle('');
                      setCreateContent('');
                      setSelectedFiles([]);
                      const historiesResponse = await getFilteredHistories(repositoryId, undefined, 'all');
                      if (historiesResponse.code === 100 && historiesResponse.data) {
                        setHistories(historiesResponse.data);
                      }
                    } else {
                      toast.error(`히스토리 생성 실패: ${response.message}`);
                    }
                  } catch (err) {
                    console.error('Failed to create history:', err);
                    toast.error('히스토리 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
                  }
                }}
                onTitleChange={setCreateTitle}
                onContentChange={setCreateContent}
                onFileSelect={(files: FileList | null) => {
                  if (files && files.length > 0) {
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
            <ModalSimple
              headerTitle={currentUser?.nickname || 'Unknown User'}
              headerTime={new Date().toLocaleDateString()}
              modalTitle="PP 요청"
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
              isModifying={true}
              canEdit={true}
              onEditStart={() => {}}
              onEditCancel={() => {
                setIsProposalModalOpen(false);
                setSelectedHistoryForProposal(null);
                setProposalTitle('');
                setProposalContent('');
              }}
              onEditSave={async () => {
                if (!proposalTitle.trim()) {
                  toast.warning('제목을 입력해주세요.');
                  return;
                }

                if (!selectedHistoryForProposal) {
                  toast.error('히스토리가 선택되지 않았습니다.');
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
                    toast.success('PP 요청이 성공적으로 생성되었습니다.');
                    setIsProposalModalOpen(false);
                    setSelectedHistoryForProposal(null);
                    setProposalTitle('');
                    setProposalContent('');
                  } else {
                    toast.error(`PP 요청 생성 실패: ${response.message}`);
                  }
                } catch (err) {
                  console.error('Failed to create proposal:', err);
                  toast.error('PP 요청 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
                }
              }}
              onTitleChange={setProposalTitle}
              onContentChange={setProposalContent}
              isCreating={true}
              isProposal={true}
            />
          )}

          {isProposalListModalOpen && (
            <ModalPPList 
              items={proposalList}
              onClose={() => {
                setIsProposalListModalOpen(false);
              }}
              onProposalClick={(proposalId) => {
                handleProposalDetailOpen(proposalId);
              }}
            />
          )}

          {isProposalDetailModalOpen && selectedProposalDetail && (
            <Modal
              headerTitle={selectedProposalDetail.createdBy.nickname}
              headerTime={selectedProposalDetail.createdAt ? new Date(selectedProposalDetail.createdAt).toLocaleDateString() : ''}
              modalTitle="PP 상세"
              contentTitle={isEditing ? editedTitle : selectedProposalDetail.title}
              content={isEditing ? editedContent : selectedProposalDetail.description}
              items={[{
                Name: selectedProposalDetail.file.name,
                date: selectedProposalDetail.file.fileType,
                iconType: 'diff' as const
              }]}
              onClose={() => {
                setIsProposalDetailModalOpen(false);
                setSelectedProposalId(null);
                setSelectedProposalDetail(null);
                setIsEditing(false);
                setEditedTitle('');
                setEditedContent('');
                setReviewContent('');
              }}
              isEditing={isEditing}
              canEdit={isAdmin && selectedProposalDetail.status === 'OPEN'}
              onEditStart={() => {
                setIsEditing(true);
                setEditedTitle(selectedProposalDetail.title);
                setEditedContent(selectedProposalDetail.description);
              }}
              onEditCancel={() => {
                setIsEditing(false);
                setEditedTitle('');
                setEditedContent('');
              }}
              onEditSave={async () => {
                if (!selectedProposalDetail) return;

                try {
                  const updateData = {
                    title: editedTitle,
                    description: editedContent
                  };

                  const response = await updateProposal(selectedProposalDetail.id, updateData);
                  
                  if (response.code === 100) {
                    const updatedDetailResponse = await getProposalById(selectedProposalDetail.id);
                    if (updatedDetailResponse.code === 100 && updatedDetailResponse.data) {
                      const updatedProposalData = {
                        ...updatedDetailResponse.data,
                        status: selectedProposalDetail.status
                      };
                      setSelectedProposalDetail(updatedProposalData);
                    }
                    setIsEditing(false);
                    setEditedTitle('');
                    setEditedContent('');
                  }
                } catch (err) {
                  console.error('Failed to update proposal:', err);
                }
              }}
              onTitleChange={setEditedTitle}
              onContentChange={setEditedContent}
              onReject={selectedProposalDetail.status === 'OPEN' ? async () => {
                console.log('Reject button clicked');
                console.log('Current state:', {
                  isEditing,
                  canReviewProposal,
                  userAuthority,
                  proposalStatus: selectedProposalDetail.status
                });
                if (isEditing) {
                  setIsEditing(false);
                  setEditedTitle('');
                  setEditedContent('');
                } else {
                  if (!selectedProposalDetail) return;
                  
                  try {
                    const response = await updateProposalStatus(selectedProposalDetail.id, { status: 'CLOSED' });
                    if (response.code === 100) {
                      toast.success('Proposal이 거절되었습니다.');
                      setIsProposalDetailModalOpen(false);
                      setSelectedProposalId(null);
                      setSelectedProposalDetail(null);
                      if (repositoryId) {
                        const proposalsResponse = await getProposalsByRepository(repositoryId, 'ALL');
                        if (proposalsResponse.code === 100 && proposalsResponse.data) {
                          const formattedProposals = proposalsResponse.data.map(proposal => ({
                            id: proposal.id,
                            Name: proposal.title,
                            content: proposal.description || '',
                            status: proposal.status.toLowerCase() === 'open' ? 'progress' : 
                                   proposal.status.toLowerCase() === 'merged' ? 'merge' : 'close'
                          }));
                          setProposalList(formattedProposals);
                        }
                      }
                    }
                  } catch (err) {
                    console.error('Failed to reject proposal:', err);
                    toast.error('Proposal 거절 중 오류가 발생했습니다.');
                  }
                }
              } : () => {}}
              onAccept={selectedProposalDetail.status === 'OPEN' ? async () => {
                console.log('Accept button clicked');
                console.log('Current state:', {
                  isEditing,
                  canReviewProposal,
                  userAuthority,
                  proposalStatus: selectedProposalDetail.status
                });
                if (!selectedProposalDetail) return;
                
                try {
                  const response = await mergeProposal(selectedProposalDetail.id);
                  if (response.code === 100) {
                    toast.success('Proposal이 승인되었습니다.');
                    setIsProposalDetailModalOpen(false);
                    setSelectedProposalId(null);
                    setSelectedProposalDetail(null);
                    if (repositoryId) {
                      const proposalsResponse = await getProposalsByRepository(repositoryId, 'ALL');
                      if (proposalsResponse.code === 100 && proposalsResponse.data) {
                        const formattedProposals = proposalsResponse.data.map(proposal => ({
                          id: proposal.id,
                          Name: proposal.title,
                          content: proposal.description || '',
                          status: proposal.status.toLowerCase() === 'open' ? 'progress' : 
                                 proposal.status.toLowerCase() === 'merged' ? 'merge' : 'close'
                        }));
                        setProposalList(formattedProposals);
                      }
                    }
                  }
                } catch (err) {
                  console.error('Failed to merge proposal:', err);
                  toast.error('Proposal 승인 중 오류가 발생했습니다.');
                }
              } : () => {}}
              comments={reviews.map(review => ({
                id: review.id,
                content: review.comment,
                author: review.reviewer.nickname,
                createdAt: review.createdAt,
                updatedAt: review.updatedAt,
                isAuthor: review.reviewer.providerId === currentUser?.userId,
                replies: review.replies.map(reply => ({
                  id: reply.id,
                  content: reply.comment,
                  author: reply.reviewer.nickname,
                  createdAt: reply.createdAt,
                  updatedAt: reply.updatedAt,
                  isAuthor: reply.reviewer.providerId === currentUser?.userId,
                  replies: []
                }))
              }))}
              onCommentSubmit={handleCreateReview}
              onCommentEdit={handleEditReview}
              onCommentDelete={handleDeleteReview}
              commentContent={reviewContent}
              onCommentContentChange={setReviewContent}
              role={(() => {
                const shouldShowButtons = canReviewProposal && selectedProposalDetail.status === 'OPEN' && userAuthority;
                console.log('Role Calculation:', {
                  canReviewProposal,
                  proposalStatus: selectedProposalDetail.status,
                  userAuthority,
                  shouldShowButtons,
                  finalRole: shouldShowButtons ? userAuthority : undefined
                });
                return shouldShowButtons ? userAuthority : undefined;
              })()}
            />
          )}
        </>
      )}
    </PageContainer>
  );
};

export default RepositoryHistoryPage; 