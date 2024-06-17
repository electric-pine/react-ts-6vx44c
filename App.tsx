import * as React from 'react';
import './style.css';

export default function App() {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const subscribe = React.useCallback((onStoreChange: () => void) => {
    const observer = new ResizeObserver((entries) => {
      entries.forEach((el) => {
        onStoreChange();
      });
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  const width = React.useSyncExternalStore(subscribe, () => {
    return ref.current?.offsetWidth;
  });
  return <div ref={ref}>{width}</div>;
}
