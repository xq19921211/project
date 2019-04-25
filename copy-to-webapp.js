const fs = require('fs-extra');
const path = require('path');
const source = path.resolve(__dirname, './www');

const targetSrc = path.resolve(__dirname, '../../webapp/src');
const targetScripts = path.resolve(__dirname, '../../webapp/scripts');
const targetMock = path.resolve(__dirname, '../../webapp/mock');
const targetImage = path.resolve(__dirname, '../../webapp/image');
const targetCss = path.resolve(__dirname, '../../webapp/css');

const target = path.resolve(__dirname, '../../webapp');

(async () => {
  await Promise.all(
    [targetSrc, targetScripts, targetMock, targetImage, targetCss].map(item =>
      fs.emptyDir(item),
    ),
  );
  console.log('清空上一版本代码完成');

  await fs.copy(source, target);
  console.log('copy 至 webapp 成功');
})();
