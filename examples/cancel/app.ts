import { isCancel } from "../../src/cancel/Cancel";
import axios from "../../src/index";

const CancelToken = axios.CancelToken
const Source = axios.CancelToken.source()

axios({
  method: "get",
  url: "/cancel/get",
  params: {
    a: 1,
    b: 2
  }
});

let c = null

axios({
  method: "post",
  url: "/cancel/cancel",
  data: {
    a: 1,
    b: 2
  },
  timeout: 1111,
  CancelToken: new CancelToken((cancel) => {
    c = cancel
  })
}).then((res) => {
  console.log('cancel res: ', res);
}).catch((err) => {
  if (isCancel(err)) {
    console.log('第二个 这是取消异常 err: ', err);
  } else {
    console.log('第二个 cancel err: ', err);
  }
});

setTimeout(() => {
  if (c) {
    c('我结束了new CancelToken')
  }
}, 2000)

axios({
  method: "post",
  url: "/cancel/cancel",
  data: {
    a: 1,
    b: 2
  },
  CancelToken: Source.token
}).then((res) => {
  console.log('cancel res: ', res);
}).catch((err) => {
  if (isCancel(err)) {
    console.log('这是取消异常 err: ', err);
  } else {
    console.log('cancel err: ', err);
  }
});

setTimeout(() => {
  if (c) {
    Source.cancel('我结束了source')
  }
}, 2000)
