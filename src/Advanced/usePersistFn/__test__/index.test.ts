import {
  act,
  renderHook,
  RenderHookResult,
} from '@testing-library/react-hooks';
import { useState } from 'react';
import usePersistFn from '..';

const TestHooks = () => {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount(count + 1);
  };

  const persistFn = usePersistFn(() => count);

  return { addCount, persistFn };
};

let hook: RenderHookResult<[], ReturnType<typeof TestHooks>>; // 不是很明白里面的泛型为什么这样写

describe('usePersistFn的单元测试', () => {
  it('should be defined', () => {
    // hooks是否被定义
    expect(usePersistFn).toBeDefined();
  });

  it('usePersistFn should work', () => {
    act(() => {
      hook = renderHook(() => TestHooks());
    });
    const currentFn = hook.result.current.persistFn;
    expect(hook.result.current.persistFn()).toEqual(0);

    act(() => {
      hook.result.current.addCount();
    });

    // 是否为同一个函数
    expect(currentFn).toEqual(hook.result.current.persistFn);
    // 执行addcount后，组件会重新渲染，如果函数没有持久化，应该等于0
    expect(hook.result.current.persistFn()).toEqual(1);
  });
});
