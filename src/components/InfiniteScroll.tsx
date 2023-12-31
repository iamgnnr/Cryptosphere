import { useEffect, useRef } from 'react';

interface InfiniteScrollProps {
  loadMore: () => void;
  hasMore: boolean;
}

function InfiniteScroll({ loadMore, hasMore }: InfiniteScrollProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Adjust this threshold as needed
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    const target = document.querySelector(".watch");

    if (target) {
      observer.observe(target);
    }

  }, [hasMore]);

  const handleIntersection: IntersectionObserverCallback = (entries) => {
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
