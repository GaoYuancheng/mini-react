interface Fiber {
  type?: string; // 标签名
  props: {
    [key: string]: any;
    children: Fiber[];
  };
  parent?: Fiber; // 父节点
  dom?: any; // 调用 createDom 转换之后的dom节点
  sibling?: Fiber; // 兄弟节点
  child?: Fiber; // 第一个子节点
}
