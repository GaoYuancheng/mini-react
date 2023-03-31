// 耗时较长的任务
export const longTimeScript = async (time) => {
  console.log("longTimeScript Start");
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
      console.log("longTimeScript End");
    }, time);
  });
};
