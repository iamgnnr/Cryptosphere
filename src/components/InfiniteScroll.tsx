import React, { useEffect, useRef } from 'react';

function InfiniteScroll({ loadMore, hasMore }) {
  const observerRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Adjust this threshold as needed
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    let target = document.querySelector(".watch");

    observer.observe(target);

  }, [hasMore]);

  const handleIntersection = (entries, observer) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      loadMore();
    }
  };

  return (
    <div ref={observerRef} className='watch' style={{ height: '10px' }} />
  );
}

export default InfiniteScroll;
