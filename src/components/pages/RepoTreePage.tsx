import React from 'react';
import styled from 'styled-components';
import RepoHeader from '../layout/RepoHeader';
import RepoTreeGraph from '../common/RepoTreeGraph';

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f7faff;
`;

const GraphArea = styled.div`
  flex: 1;
  min-height: 0;
  padding: 32px 0 0 0;
`;

const RepoTreePage: React.FC = () => (
  <PageWrapper>
    <RepoHeader />
    <GraphArea>
      <RepoTreeGraph />
    </GraphArea>
  </PageWrapper>
);

export default RepoTreePage; 