
'use client'
import React from 'react';
import FooterFour from '@/layouts/footers/FooterFour';
import HeaderFour from '@/layouts/headers/HeaderFour';
import BreadcrumbBlogDetailsTwo from './BreadcrumbBlogDetailsTwo';
import PostboxBlogDetailsTwoArea from './PostboxBlogDetailsTwoArea';




const BlogDetailsTwo = () => {

  return (
    <>
      <HeaderFour style={true} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <BreadcrumbBlogDetailsTwo />
            <PostboxBlogDetailsTwoArea />
          </main>
          <FooterFour />
        </div>
      </div>
    </>
  );
};

export default BlogDetailsTwo;