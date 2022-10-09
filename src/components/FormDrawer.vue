<template>
  <el-drawer
    v-model="showDrawer"
    :title="title"
    :size="size"
    :close-on-click-modal="false"
    :before-close="close"
    :destroy-on-close="destroyOnClose"
  >
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
      <div class="actions">
        <el-button type="primary" @click="submitSave">保存</el-button>
        <el-button @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref } from "vue";
const showDrawer = ref(false);
const props = defineProps({
  title: String,
  size:{
    type: String,
    default:"45%"
  },
  destroyOnClose:{
    type: Boolean,
    default: false
  }
})
//打开
const open = () => (showDrawer.value = true);

// 关闭
const close = () => (showDrawer.value = false);

// 保存
const emit = defineEmits(["submit"])
const submitSave = () => emit("submit")

defineExpose({
  open,
  close,
});
</script>

<style lang="less" scoped>
.formDrawer {
  width: 100%;
  height: 100%;
  position: relative;
}
.body{
  flex:1;
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:50px;
  overflow-y: auto;
}

.actions {
  height: 50px;
  position: absolute;
  bottom: 0px;
}
</style>
