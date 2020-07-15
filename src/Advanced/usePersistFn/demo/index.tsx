/**
 * title: Default usage 基本用法
 * desc: With usePersistFn, function references never change. 通过 usePersistFn, 函数引用永远不会变化。
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 通过 usePersistFn, 函数引用永远不会变化。
 */

import React, { useState, useCallback, useRef } from 'react';
import { message, Button } from 'antd';
import { usePersistFn } from 'imitative-ahooks';

export default () => {
  const [count, setCount] = useState(0);

  const showCountPersistFn = usePersistFn(() => {
    message.info(`Current count is ${count}`);
  });

  const showCountCommon = useCallback(() => {
    message.info(`Current count is ${count}`);
  }, [count]);

  return (
    <>
      <p>父组件的count：{count}</p>
      <Button
        type="primary"
        onClick={() => {
          setCount(c => c + 1);
        }}
      >
        Add Count
      </Button>

      <div style={{ marginTop: 32 }}>
        <h4>使用持久化函数hook的组件:</h4>
        {/* use persist function, ExpensiveTree component will only render once */}
        <ExpensiveTree showCount={showCountPersistFn} />
      </div>
      <div style={{ marginTop: 32 }}>
        <h4>仅仅使用useCallback（依赖count）函数的组件:</h4>
        {/* without persist function, ExpensiveTree component will re-render on state change */}
        <ExpensiveTree showCount={showCountCommon} />
      </div>
    </>
  );
};

// some expensive component with React.memo
const ExpensiveTree = React.memo<{ [key: string]: any }>(({ showCount }) => {
  const renderCountRef = useRef(-1);
  renderCountRef.current += 1;

  return <div>Render Count: {renderCountRef.current}</div>;
});
