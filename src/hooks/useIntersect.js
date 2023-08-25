import { useEffect, useRef, useState } from 'react';

export const useIntersect = ({ root = null, rootMargin, threshold = 0 }) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const [node, setNode] = useState();
  const observer = useRef();

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new window.IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      {
        root,
        rootMargin,
        threshold,
      }
    );

    const { current: currentObserver } = observer;

    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node, root, rootMargin, threshold]);

  return [setNode, isIntersecting];
};
