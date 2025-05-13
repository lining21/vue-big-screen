<template>
  <div id="app">
    <div class="box">
      <div class="content">
        春江潮水连海平，海上明月共潮生①122221213123123123。
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted} from 'vue'

onMounted(()=>{
  // const contentEl = document.querySelector('.content')
  // const speed = 110
  // contentEl.style.animationDuration = contentEl.clientWidth / speed + 's'
})
</script>

<style scoped>
.box {
  /* width: var(--show-width); */
  height: 40px;
  line-height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #a5b4fc;
  color: #fff;
  overflow: hidden;
}

.content {
  white-space: nowrap;
  width: max-content;
  animation: roll 5s infinite linear;
}

@keyframes roll {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

</style>