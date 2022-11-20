import { ElNotification ,ElMessageBox } from "element-plus";
import NProgress  from 'nprogress'

export function toast(message, type){
    ElNotification({
        title: "提示",
        message: message,
        type: type,
        duration: 3000
      });
}

export function showModal(content="提示内容", type="warning", title=""){
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: type,
    }
  )
}
export function showFullLoading() {
  NProgress.start()
}

export function hideFullLoading(){
  NProgress.done() 
}


