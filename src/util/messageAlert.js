import {
  Notification
} from 'element-ui';

 const messageAlert = ({
  code = 500,
  type = 'error',
  title = '异常提醒',
  message = '请通知管理员检查异常！',
} = {}) => {
  // 弹窗状态，只报错
  if (code !== 200) {
    Notification({
      title,
      message,
      type,
    })
  }
}
export default messageAlert