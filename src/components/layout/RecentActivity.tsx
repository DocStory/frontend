import React from 'react';
import styled from 'styled-components';

interface ActivityItemProps {
  avatar: string;
  name: string;
  action: string;
  repository: string;
  title: string;
  time: string;
}

interface RecentActivityProps {
  activities?: ActivityItemProps[];
}

const ActivityItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background-color: #FFFFFF;
  border: 1px solid #F0F0F0;
  border-radius: 15px;
  margin-bottom: 12px;
`;

const Avatar = styled.div<{ image: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const NameText = styled.p`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 14px;
  color: #31394D;
  margin: 0 0 4px 0;
`;

const TitleText = styled.p`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 20px;
  color: #292929;
  margin: 0 0 4px 0;
  letter-spacing: -0.01em;
`;

const TimeText = styled.p`
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 12px;
  color: #C4C4C4;
  margin: 0;
`;

const ActivityItem: React.FC<ActivityItemProps> = ({
  avatar,
  name,
  action,
  repository,
  title,
  time,
}) => {
  return (
    <ActivityItemContainer>
      <Avatar image={avatar} />
      <ContentContainer>
        <NameText>{name}님께서 {repository}에 {action}하였습니다.</NameText>
        <TitleText>{title}</TitleText>
        <TimeText>{time}</TimeText>
      </ContentContainer>
    </ActivityItemContainer>
  );
};

const RecentActivity: React.FC<RecentActivityProps> = ({
  activities = [
    {
      avatar: 'https://via.placeholder.com/40',
      name: '홍길동',
      action: '수정',
      repository: '1번 저장소',
      title: '[제목] 배틀그라운드 설정 변경',
      time: '1시간 전',
    },
    {
      avatar: 'https://via.placeholder.com/40',
      name: '홍길동',
      action: '수정',
      repository: '1번 저장소',
      title: '[제목] 배틀그라운드 설정 변경',
      time: '1시간 전',
    },
  ]
}) => {
  return (
    <div>
      {activities.map((activity, index) => (
        <ActivityItem key={index} {...activity} />
      ))}
    </div>
  );
};

export default RecentActivity; 