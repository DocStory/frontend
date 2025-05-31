import React, { useState } from 'react';
import styled from 'styled-components';
import avatar from '../../assets/avatar.svg';
import pencilIcon from '../../assets/pencilIcon.svg';
import trashIcon from '../../assets/trashIcon.svg';
import commentIcon from '../../assets/commentIcon.svg';
import saveIcon from '../../assets/saveIcon.svg';

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isAuthor: boolean;
  replies?: Comment[];
}

interface ModalCommentProps {
  comments: Comment[];
  isEditing?: boolean;
  onCommentSubmit?: (content: string, parentId?: string) => void;
  onCommentEdit?: (commentId: string, content: string) => void;
  onCommentDelete?: (commentId: string) => void;
  commentContent?: string;
  onCommentContentChange?: (content: string) => void;
}

const ModalCommentContainer = styled.div`
  padding: 32px;
  background: ${({ theme }) => theme.background};
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const Title = styled.h3`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 18px;
  line-height: 1.3;
  letter-spacing: -0.007em;
  color: ${({ theme }) => theme.text};
  margin: 0 0 24px 0;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 20px;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px ${({ theme }) => theme.shadow};
    border-color: ${({ theme }) => theme.primary}20;
  }
`;

const CommentAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.border};
  flex-shrink: 0;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AuthorName = styled.span`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 16px;
  line-height: 1.3;
  letter-spacing: -0.007em;
  color: ${({ theme }) => theme.text};
`;

const UpdatedAt = styled.span`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 13px;
  line-height: 1.3;
  letter-spacing: -0.006em;
  color: ${({ theme }) => theme.textSecondary};
  opacity: 0.7;
`;

const CommentText = styled.p`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 15px;
  line-height: 1.5;
  letter-spacing: -0.006em;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
`;

const ReplyContainer = styled.div`
  margin-left: 56px;
  margin-top: 12px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: -28px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${({ theme }) => theme.border};
    border-radius: 1px;
  }
`;

const ActionButtons = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 4px;
  background: ${({ theme }) => theme.surface};
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.shadow};
  opacity: 0;
  transition: opacity 0.2s ease;

  ${CommentItem}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;

  img {
    width: 14px;
    height: 14px;
    opacity: 0.6;
    transition: opacity 0.2s ease;
  }

  &:hover {
    background: ${({ theme }) => theme.hoverBackground};
    img {
      opacity: 1;
    }
  }

  &:disabled {
    cursor: not-allowed;
    img {
      opacity: 0.3;
    }
    &:hover {
      background: none;
    }
  }
`;

const EditInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-family: 'Pretendard';
  font-size: 15px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  margin-top: 8px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const ReplyInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 10px;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.border};
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const NewCommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

const InputContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  font-family: 'Pretendard';
  font-size: 15px;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  transition: border-color 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const SubmitButton = styled.button`
  padding: 8px 16px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-family: 'Pretendard';
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-end;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: translateY(-1px);
  }

  &:disabled {
    background: ${({ theme }) => theme.textSecondary};
    cursor: not-allowed;
    transform: none;
  }
`;

const ReplyButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  font-family: 'Pretendard';
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: ${({ theme }) => theme.primary}10;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }) => theme.textSecondary};
  
  p {
    font-family: 'Pretendard';
    font-size: 15px;
    margin: 0;
    opacity: 0.7;
  }
`;

const Comment: React.FC<{ 
  comment: Comment;
  onEdit?: (commentId: string, content: string) => void;
  onDelete?: (commentId: string) => void;
  onReply?: (content: string, parentId: string) => void;
  isReply?: boolean;
}> = ({ comment, onEdit, onDelete, onReply, isReply = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [replyContent, setReplyContent] = useState('');

  const handleEdit = () => {
    if (onEdit) {
      onEdit(comment.id, editContent);
      setIsEditing(false);
    }
  };

  const handleReply = () => {
    if (onReply && replyContent.trim()) {
      onReply(replyContent, comment.id);
      setReplyContent('');
      setIsReplying(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isEditing) {
        handleEdit();
      } else if (isReplying) {
        handleReply();
      }
    }
  };

  const handleReplyClick = () => {
    setIsReplying(!isReplying);
    if (isEditing) {
      setIsEditing(false);
      setEditContent(comment.content);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    if (isReplying) {
      setIsReplying(false);
      setReplyContent('');
    }
  };

  const hasReplies = comment.replies && comment.replies.length > 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const currentYear = new Date().getFullYear();
    const commentYear = date.getFullYear();
    
    return date.toLocaleDateString('ko-KR', {
      year: commentYear === currentYear ? undefined : 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <CommentItem>
        <CommentAvatar src={avatar} alt='avatar' />
        <CommentContent>
          <CommentHeader>
            <AuthorName>{comment.author}</AuthorName>
            <UpdatedAt>{formatDate(comment.updatedAt)}</UpdatedAt>
          </CommentHeader>
          {isEditing ? (
            <EditInput
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="댓글을 입력하세요..."
              autoFocus
            />
          ) : (
            <CommentText>{comment.content}</CommentText>
          )}
          {!isEditing && !isReply && (
            <ReplyButton onClick={handleReplyClick}>
              <img src={commentIcon} alt="답글" width={12} height={12} />
              답글
            </ReplyButton>
          )}
        </CommentContent>
        
        {comment.isAuthor && (
          <ActionButtons>
            {isEditing ? (
              <>
                <ActionButton onClick={handleEdit} title="저장">
                  <img src={saveIcon} alt="저장" />
                </ActionButton>
                <ActionButton onClick={() => {
                  setIsEditing(false);
                  setEditContent(comment.content);
                }} title="취소">
                  <img src={trashIcon} alt="취소" />
                </ActionButton>
              </>
            ) : (
              <>
                <ActionButton onClick={handleEditClick} title="수정">
                  <img src={pencilIcon} alt="수정" />
                </ActionButton>
                {!hasReplies && (
                  <ActionButton onClick={() => onDelete?.(comment.id)} title="삭제">
                    <img src={trashIcon} alt="삭제" />
                  </ActionButton>
                )}
              </>
            )}
          </ActionButtons>
        )}
      </CommentItem>

      {isReplying && (
        <ReplyContainer>
          <ReplyInputContainer>
            <CommentAvatar src={avatar} alt='avatar' />
            <Input
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="답글을 입력하세요..."
              autoFocus
            />
            <SubmitButton 
              onClick={handleReply}
              disabled={!replyContent.trim()}
            >
              답글
            </SubmitButton>
          </ReplyInputContainer>
        </ReplyContainer>
      )}

      {hasReplies && (
        <ReplyContainer>
          {comment.replies!.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onEdit={onEdit}
              onDelete={onDelete}
              onReply={onReply}
              isReply={true}
            />
          ))}
        </ReplyContainer>
      )}
    </>
  );
};

const ModalComment: React.FC<ModalCommentProps> = ({
  comments,
  isEditing = false,
  onCommentSubmit,
  onCommentEdit,
  onCommentDelete,
  commentContent = '',
  onCommentContentChange,
}) => {
  const handleSubmit = () => {
    if (onCommentSubmit && commentContent.trim()) {
      onCommentSubmit(commentContent);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (isEditing) return null;

  return (
    <ModalCommentContainer>
      <Title>댓글</Title>
      
      {comments.length === 0 ? (
        <EmptyState>
          <p>아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!</p>
        </EmptyState>
      ) : (
        <CommentList>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onEdit={onCommentEdit}
              onDelete={onCommentDelete}
              onReply={(content, parentId) => onCommentSubmit?.(content, parentId)}
            />
          ))}
        </CommentList>
      )}

      <NewCommentContainer>
        <CommentAvatar src={avatar} alt='avatar' />
        <InputContainer>
          <Input
            value={commentContent}
            onChange={(e) => onCommentContentChange?.(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="댓글을 입력하세요..."
          />
          <SubmitButton 
            onClick={handleSubmit}
            disabled={!commentContent.trim()}
          >
            댓글 작성
          </SubmitButton>
        </InputContainer>
      </NewCommentContainer>
    </ModalCommentContainer>
  );
};

export default ModalComment;
