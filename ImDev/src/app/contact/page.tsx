
import Contact from '@/components/contact';
import Wrapper from '@/layouts/Wrapper';
import React from 'react';


export const metadata = {
  title: "Imdeveloper web",
};


const index = () => {
  return (
    <Wrapper>
      <Contact />
    </Wrapper>
  );
};

export default index;