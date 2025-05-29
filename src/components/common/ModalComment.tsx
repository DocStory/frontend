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

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: #f1f5f9;
  border-radius: 10px;
  padding: 16px;
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

const CommentInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  background: #ffffff;
  border-radius: 10px;
  padding: 8px 12px;
  border: 2px solid #cbd5e1;
`;

const Input = styled.input`
  font-family: 'Pretendard';
  font-size: 16px;
  padding: 12px 16px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  background: white;
  color: #1a1a1a;
  transition: border-color 0.2s ease;
  flex: 1;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #4078FF;
  }
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
            <img src={avatar} alt='avatar' width={48} height={48} style={{ borderRadius: '50%' }} />
            <CommentContent>
              <AuthorName>{comment.author}</AuthorName>
              <CommentText>{comment.content}</CommentText>
            </CommentContent>
          </CommentItem>
        ))}
      </CommentList>
      <CommentInputContainer>
        <img src={avatar} alt='avatar' width={48} height={48} style={{ borderRadius: '50%' }} />
        <Input placeholder='댓글을 입력하세요' />
      </CommentInputContainer>
    </ModalCommentContainer>
  );
};

export default ModalComment;
