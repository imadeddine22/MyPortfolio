import React from 'react';
import Wrapper from '@/layouts/Wrapper';
import DynamicPortfolioDetails from '@/components/portfolio-details/DynamicPortfolioDetails';

export const metadata = {
  title: 'Project Details - ImDev Portfolio',
};

interface Props {
  params: {
    id: string;
  };
}

export default function ProjectDetailsPage({ params }: Props) {
  return (
    <Wrapper>
      <DynamicPortfolioDetails id={params.id} />
    </Wrapper>
  );
}
