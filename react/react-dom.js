// react/react-dom.js

// 需要删除的节点
let deletions = null;
// 下一个功能单元 fiber节点
let nextUnitOfWork = null;
// 下一轮更新的fiberTree
let wipFiberTree = null;

// 更新前的根节点fiber树
let currentRoot = null;

// 是否为事件监听
const isEvent = (key) => key.startsWith("on");
const isProperty = (key) => key !== "children" && !isEvent(key);
// 是否有新属性
const isNew = (prev, next) => (key) => prev[key] !== next[key];
// 是否是旧属性
const isGone = (prev, next) => (key) => !(key in next);

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
    // return;
  }
  requestIdleCallback(workLoop);
  // 空闲时间应该任务
}

requestIdleCallback(workLoop);

/**
 * 更新dom属性
 * @param {*} dom
 * @param {*} prevProps 老属性
 * @param {*} nextProps 新属性
 */
function updateDom(dom, prevProps, nextProps) {
  // 移除老的事件监听
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // 添加新的事件处理
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });

  // 移除老的属性
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = "";
    });

  // 设置新的属性
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = nextProps[name];
    });
}

/**
 * 删除情况下，不断的向下找，直到找到有dom的子节点
 * @param {*} fiber
 * @param {*} domParent
 */
function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
}

// 将生成的 fiber树渲染到页面上面
function commitRoot() {
  console.log("wipFiberTree", wipFiberTree, currentRoot, deletions);
  // deletions.forEach(commitUnit);
  // 遍历删除旧节点
  function commitUnit(fiber) {
    console.log("commitUnit fiber", fiber);
    if (!fiber) return;

    let domParentFiber = fiber.parent;
    // if (!domParentFiber) return;
    // 一直向上找，直到找到有dom的节点
    while (!domParentFiber.dom) {
      domParentFiber = domParentFiber.parent;
    }

    const domParent = domParentFiber.dom;

    // 获取父节点的 dom
    if (fiber.dom && domParent) {
      if (fiber.effectTag === "PLACEMENT") {
        // 新增
        domParent.appendChild(fiber.dom);
      } else if (fiber.effectTag === "DELETION") {
        // 删除
        commitDeletion(fiber, domParent);
        return;
      } else if (fiber.effectTag === "UPDATE") {
        // 更新
        updateDom(fiber.dom, fiber.alternate.props, fiber.props);
      }
    }

    if (fiber.child) {
      commitUnit(fiber.child);
    }
    if (fiber.sibling) {
      commitUnit(fiber.sibling);
    }
  }

  commitUnit(wipFiberTree.child);
  currentRoot = wipFiberTree;
  wipFiberTree = null;
}

/**
 * 协调
 * @param {*} wipFiber
 * @param {*} elements
 */
function reconcileChildren(wipFiber, fiberList) {
  // 索引
  let index = 0;
  // 上一个兄弟节点
  let prevSibling = null;

  // 上一次渲染的fiber
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;

  // 遍历孩子节点  第一次render的 oldFiber 是 null
  while (index < fiberList.length || oldFiber != null) {
    const fiberChild = fiberList[index];
    // 创建fiber
    // const newFiberChild = {
    //   type: fiberChild.type,
    //   props: fiberChild.props,
    //   parent: wipFiber,
    //   dom: null,
    // };

    let newFiber = null;

    // 类型判断 全部都存在的情况  type  div/a/span...
    const sameType = oldFiber && fiberChild && fiberChild.type == oldFiber.type;

    // 类型相同需要更新
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: fiberChild.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }

    // 新的存在并且类型和老的不同需要 新增
    if (fiberChild && !sameType) {
      //  add this node
      newFiber = {
        type: fiberChild.type,
        props: fiberChild.props,
        dom: null, // fiberChild.dom 就是 undefined
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "PLACEMENT",
      };
    }

    // 老的存在并且类型和新的不同需要 移除
    if (oldFiber && !sameType) {
      // delete the oldFiber's node
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }

    // 处理老fiber的兄弟节点
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    // 将第一个孩子节点设置为 fiber 的子节点
    if (index === 0) {
      wipFiber.child = newFiber;
    }

    if (index > 0 && fiberChild) {
      // 第一个之外的子节点设置为第一个子节点的兄弟节点
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}

function updateFunctionComponent(fiber) {
  // 处理函数组件
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

function updateHostComponent(fiber) {
  // 处理普通节点
  // ---- 构建fiber节点
  // debugger;
  // 如果fiber上没有dom节点，为其创建一个
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  // 获取到当前fiber的孩子节点
  const fiberChildren = fiber.props.children;

  reconcileChildren(fiber, fiberChildren);
}

// 执行单元事件，返回下一个单元事件
function performUnitOfWork(fiber) {
  // 判断是否为函数
  const isFunctionComponent = fiber.type instanceof Function;

  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    // 更新普通节点
    updateHostComponent(fiber);
  }

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
  deletions = [];
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

  updateDom(dom, {}, element.props);

  return dom;
};

export { render };
