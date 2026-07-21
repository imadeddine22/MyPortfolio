import BlogDetailsTwo from '@/components/blog-details-2';
import Wrapper from '@/layouts/Wrapper';
import React from 'react';

export const metadata = {
  title: "Imdeveloper web",
};
const index = () => {
  return (
    <Wrapper>
      <BlogDetailsTwo />
    </Wrapper>
  );
};

export default index;