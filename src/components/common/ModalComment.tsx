import React from 'react';
import styled from 'styled-components';
import avatar from '../../assets/avatar.svg';

interface Comment {
  author: string;
  content: string;
}

interface ModalCommentProps {
  comments: Comment[];
  isEditing?: boolean;
}

const ModalCommentContainer = styled.div`
  padding: 24px 33px;
  background: #f1f5f9;
`;

const Title = styled.h3`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 26px;
  line-height: 0.85em;
  letter-spacing: -0.007em;
  color: #1e293b;
  margin: 0 0 22px 0;
`;

const CommentInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  background: #f1f5f9;
  border-radius: 10px;
  padding: 8px 12px;
  border: 2px solid #cbd5e1;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: none;
  background: #f1f5f9;
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 18px;
  line-height: 1.11em;
  letter-spacing: -0.006em;
  color: #475569;
  &::placeholder {
    color: #475569;
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AuthorName = styled.span`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 18px;
  line-height: 1.22em;
  letter-spacing: -0.007em;
  color: #1e293b;
`;

const CommentText = styled.p`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 18px;
  line-height: 1.67em;
  letter-spacing: -0.007em;
  color: #475569;
  margin: 0;
`;

const ModalComment: React.FC<ModalCommentProps> = ({
  comments,
  isEditing = false,
}) => {
  if (isEditing) return null;

  return (
    <ModalCommentContainer>
      <Title>댓글</Title>
      <CommentList>
        {comments.map((comment, index) => (
          <CommentItem key={index}>
            <Avatar src={avatar} alt='avatar' />
            <CommentContent>
              <AuthorName>{comment.author}</AuthorName>
              <CommentText>{comment.content}</CommentText>
            </CommentContent>
          </CommentItem>
        ))}
      </CommentList>
      <CommentInputContainer>
        <Avatar src={avatar} alt='avatar' />
        <Input placeholder='댓글을 입력하세요' />
      </CommentInputContainer>
    </ModalCommentContainer>
  );
};

export default ModalComment;
