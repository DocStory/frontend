import React from 'react';
import styled from 'styled-components';
import RecentActivityCard from './RecentActivityCard';

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 16px;
`;

const HomeSectionCard: React.FC = () => {
  const activities = [
    {
      headerTitle: "김철수",
      headerTime: "10분 전",
      contentTitle: "AI 프로젝트 문서 수정",
      content: "프로젝트 기획서 최종 수정본을 업로드했습니다.",
      isEditing: false,
      canEdit: true
    },
    {
      headerTitle: "이영희",
      headerTime: "1시간 전",
      contentTitle: "팀 위키 업데이트",
      content: "새로운 팀 규칙을 위키에 추가했습니다.",
      isEditing: false,
      canEdit: true
    }
  ];

  return (
    <CardContainer>
      {activities.map((activity, index) => (
        <RecentActivityCard
          key={index}
          headerTitle={activity.headerTitle}
          headerTime={activity.headerTime}
          contentTitle={activity.contentTitle}
          content={activity.content}
          isEditing={activity.isEditing}
          canEdit={activity.canEdit}
        />
      ))}
    </CardContainer>
  );
};

export default HomeSectionCard; 