import HomeThree from '@/components/homes/home-3';
import Wrapper from '@/layouts/Wrapper';
import React from 'react';

export const metadata = {
  title: "Imdeveloper web",
};


const index = () => {
  return (
    <Wrapper>
      <HomeThree />
    </Wrapper>
  );
};

export default index;