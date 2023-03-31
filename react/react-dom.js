// react/react-dom.js

// 下一个功能单元 fiber节点
let nextUnitOfWork = null;
// 下一轮更新的fiberTree
let wipFiberTree = null;

// 更新前的根节点fiber树
let currentRoot = null;

const isProperty = (key) => key !== "children";

/**
 * 工作循环
 * @param {*} deadline 截止时间
 */
function workLoop(deadline) {
  // 停止循环标识
  let shouldYield = false;

  // 循环条件为存在下一个工作单元，且没有更高优先级的工作
  while (nextUnitOfWork && !shouldYield) {
    console.log("workLoop", deadline, deadline.timeRemaining(), nextUnitOfWork);
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    // 判断是否有空闲时间，停止工作循环
    shouldYield = deadline.timeRemaining() < 1;
  }

  // 没有任务了 提交fiber树
  if (!nextUnitOfWork && wipFiberTree) {
    // 渲染到页面上
    commitRoot();
    return;
  }
  // 空闲时间应该任务
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

// 将生成的 fiber树渲染到页面上面
function commitRoot() {
  console.log("wipFiberTree", wipFiberTree);
  function commitUnit(fiber) {
    // 获取父节点的 dom
    if (fiber.parent) {
      const parentDom = fiber.parent.dom;
      parentDom.appendChild(fiber.dom);
    }
    if (fiber.child) {
      commitUnit(fiber.child);
    }
    if (fiber.sibling) {
      commitUnit(fiber.sibling);
    }
  }

  commitUnit(wipFiberTree);
  currentRoot = wipFiberTree;
  wipFiberTree = null;
}

/**
 * 协调
 * @param {*} wipFiber
 * @param {*} elements
 */
function reconcileChildren(fiber, fiberList) {
  // 索引
  let index = 0;
  // 上一个兄弟节点
  let prevSibling = null;

  // 遍历孩子节点
  while (index < fiberList.length) {
    const fiberChild = fiberList[index];
    // 创建fiber
    const newFiberChild = {
      type: fiberChild.type,
      props: fiberChild.props,
      parent: fiber,
      dom: null,
    };

    // 将第一个孩子节点设置为 fiber 的子节点
    if (index === 0) {
      fiber.child = newFiberChild;
    }

    if (index > 0 && fiberChild) {
      // 第一个之外的子节点设置为第一个子节点的兄弟节点
      prevSibling.sibling = newFiberChild;
    }

    prevSibling = newFiberChild;
    index++;
  }
}

// 执行单元事件，返回下一个单元事件
function performUnitOfWork(fiber) {
  // debugger;
  // 如果fiber上没有dom节点，为其创建一个
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  // 如果fiber有父节点，将fiber.dom添加到父节点
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  // ---- 构建fiber节点

  // 获取到当前fiber的孩子节点
  const fiberChildren = fiber.props.children;

  reconcileChildren(fiber, fiberChildren);

  // ------返回下一个工作单元

  // 第一个child 和 sibling
  if (fiber.child || fiber.sibling) {
    return fiber.child || fiber.sibling;
  }

  let nextFiber = fiber.parent;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }

  return null;
}

/**
 * 将虚拟 DOM 转换为真实 DOM 并添加到容器中
 * @param {element} 虚拟 DOM
 * @param {container} 真实 DOM
 */
function render(element, container) {
  console.log("container", container);

  // 将根节点设置为第一个将要工作单元
  nextUnitOfWork = wipFiberTree = {
    dom: container,
    alternate: currentRoot,
    props: {
      children: [element],
    },
  };

  // let dom = createDom(element);

  // element.props.children.forEach((child) => {
  //   render(child, dom);
  // });

  // container.appendChild(dom);
}

const createDom = (fiber) => {
  let element = fiber;
  let dom = null;
  if (element.type == "TEXT_ELEMENT") {
    dom = document.createTextNode("");
  } else {
    dom = document.createElement(element.type);
  }
  // 为节点绑定属性
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  return dom;
};

export { render };
