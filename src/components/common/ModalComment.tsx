import React, { useState } from 'react';
import styled from 'styled-components';
import avatar from '../../assets/avatar.svg';
import pencilIcon from '../../assets/pencilIcon.svg';
import trashIcon from '../../assets/trashIcon.svg';
import commentIcon from '../../assets/commentIcon.svg';

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
  position: relative;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const AuthorName = styled.span`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 18px;
  line-height: 1.22em;
  letter-spacing: -0.007em;
  color: #1e293b;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UpdatedAt = styled.span`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 14px;
  line-height: 1.22em;
  letter-spacing: -0.007em;
  color: #94a3b8;
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

const ReplyContainer = styled.div`
  margin-left: 60px;
  margin-top: 8px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: -20px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #e2e8f0;
  }
`;

const ActionButtons = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 1px;
  background: #e2e8f0;
  border-radius: 6px;
  padding: 2px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 16px;
    height: 16px;
    opacity: 0.5;
  }

  &:hover {
    background: #f1f5f9;
    img {
      opacity: 0.8;
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
  padding: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-family: 'Pretendard';
  font-size: 16px;
  margin-top: 8px;
`;

const ReplyInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
  background: #ffffff;
  border-radius: 10px;
  padding: 8px 12px;
  border: 2px solid #cbd5e1;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: none;
  background: #ffffff;
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

const SubmitButton = styled.button`
  padding: 8px 16px;
  background: #4078FF;
  border: none;
  border-radius: 6px;
  color: white;
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #2d5cd9;
  }

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
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
        <img src={avatar} alt='avatar' width={48} height={48} style={{ borderRadius: '50%' }} />
        <CommentContent>
          <AuthorInfo>
            <AuthorName>{comment.author}</AuthorName>
            <UpdatedAt>{formatDate(comment.updatedAt)}</UpdatedAt>
          </AuthorInfo>
          {isEditing ? (
            <>
              <EditInput
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
              />
              <ActionButtons>
                <ActionButton onClick={handleEdit} title="저장">
                  <img src={pencilIcon} alt="저장" />
                </ActionButton>
                <ActionButton onClick={() => {
                  setIsEditing(false);
                  setEditContent(comment.content);
                }} title="취소">
                  <img src={trashIcon} alt="취소" />
                </ActionButton>
              </ActionButtons>
            </>
          ) : (
            <>
              <CommentText>{comment.content}</CommentText>
              <ActionButtons>
                {!isReply && (
                  <ActionButton onClick={handleReplyClick} title="답글">
                    <img src={commentIcon} alt="답글" />
                  </ActionButton>
                )}
                {comment.isAuthor && (
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
            </>
          )}
        </CommentContent>
      </CommentItem>
      {isReplying && (
        <ReplyInputContainer>
          <img src={avatar} alt='avatar' width={48} height={48} style={{ borderRadius: '50%' }} />
          <Input 
            placeholder='답글을 입력하세요' 
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <SubmitButton 
            onClick={handleReply}
            disabled={!replyContent.trim()}
          >
            등록
          </SubmitButton>
        </ReplyInputContainer>
      )}
      {hasReplies && (
        <ReplyContainer>
          {comment.replies?.map((reply) => (
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

const ModalComment: React.FC<ModalCommentProps> = ({
  comments,
  isEditing = false,
  onCommentSubmit,
  onCommentEdit,
  onCommentDelete,
  commentContent = '',
  onCommentContentChange,
}) => {
  if (isEditing) return null;

  const handleSubmit = () => {
    if (commentContent.trim() && onCommentSubmit) {
      onCommentSubmit(commentContent);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <ModalCommentContainer>
      <Title>댓글</Title>
      <CommentList>
        {comments.map((comment) => (
          <Comment 
            key={comment.id} 
            comment={comment} 
            onEdit={onCommentEdit}
            onDelete={onCommentDelete}
            onReply={onCommentSubmit}
          />
        ))}
      </CommentList>
      <CommentInputContainer>
        <img src={avatar} alt='avatar' width={48} height={48} style={{ borderRadius: '50%' }} />
        <Input 
          placeholder='댓글을 입력하세요' 
          value={commentContent}
          onChange={(e) => onCommentContentChange?.(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SubmitButton 
          onClick={handleSubmit}
          disabled={!commentContent.trim()}
        >
          등록
        </SubmitButton>
      </CommentInputContainer>
    </ModalCommentContainer>
  );
};

export default ModalComment;
