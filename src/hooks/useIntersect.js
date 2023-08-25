import { useEffect, useRef, useState } from 'react';

/**
 * A custom React hook that uses the Intersection Observer API to detect when an element is visible in the viewport.
 * @param {Object} options - An options object that contains the following properties:
 * @param {Element} [options.root=null] - The element that is used as the viewport for checking visibility of the target. If not specified, the browser viewport is used.
 * @param {string} [options.rootMargin='0px'] - A string that specifies the margin around the root element. The margin can have values similar to a CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). If not specified, the default is "0px".
 * @param {number|number[]} [options.threshold=0] - Either a single number or an array of numbers that indicate at what percentage of the target's visibility the observer's callback should be executed. A value of 0.0 means that the callback will be executed as soon as even one pixel of the target is visible within the root element. A value of 1.0 means that the entire target element is visible within the root element. Values between 0.0 and 1.0 represent the percentage of the target's visibility within the root element. If an array is passed, the callback will be executed for each threshold value in the array.
 * @returns {Array} An array with two values: `setNode` and `isIntersecting`.
 * @example
 * function MyComponent() {
 *   const [setRef, isIntersecting] = useIntersect({
 *     root: null,
 *     rootMargin: '0px',
 *     threshold: 0.5,
 *   });
 *
 *   return (
 *     <div ref={setRef}>
 *       {isIntersecting ? 'Visible' : 'Not visible'}
 *     </div>
 *   );
 * }
 */
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
