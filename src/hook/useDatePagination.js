import { useState } from "react";

export const useDatePagination = (less) => {
  const maxRange = 7;
  const [page, setPage] = useState(0);
  const [queue, setQueue] = useState(less ? [0] : [0, 1, 2]);

  const enqueue = () => {
    setQueue((prevQueue) => {
      const queue = [...prevQueue];
      const lastPageInQueue = queue[queue.length - 1];
      queue.push(lastPageInQueue + 1);
      queue.shift();
      return queue;
    });
  };

  const dequeue = () => {
    setQueue((prevQueue) => {
      const queue = [...prevQueue];
      const firstPageInQueue = queue[0];
      if (firstPageInQueue < 0) return queue;

      queue.pop();
      queue.unshift(firstPageInQueue - 1);
      return queue;
    });
  };

  const isFirstDay = page === 0;
  const isLastDay = page === maxRange;
  const moveNextDay = () => {
    if (page === maxRange) return;
    setPage((prev) => prev + 1);
    if (!queue.includes(page + 1)) enqueue();
  };
  const movePrevDay = () => {
    if (page <= 0) return;
    setPage((prev) => prev - 1);
    if (!queue.includes(page - 1)) dequeue();
  };
  return {
    currDay: page,
    setDay: setPage,
    moveNextDay,
    movePrevDay,
    range: queue,
    isFirstDay,
    isLastDay,
  };
};
