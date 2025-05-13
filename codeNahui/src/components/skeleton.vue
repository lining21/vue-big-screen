<template>
	<div class="skeleton"><img src="/public/NAHUI.svg" alt="NAHUI" width="360" /></div>
</template>

<style scoped lang="less">
.skeleton {display: flex;align-items: center;justify-content: center;width: 100vw;height: 100vh;animation: loading 2s ease infinite;}
@keyframes loading {0% {background-size: 300% 100%;background-image: linear-gradient(100deg, #eee 40%, #fff 50%, #eee 60%);background-position: 100% 50%;}100% {background-size: 300% 100%;background-image: linear-gradient(100deg, #eee 40%, #fff 50%, #eee 60%);background-position: 0 50%;}}
@keyframes opacity {0% {opacity: 1;}50% {opacity: 0.3;}100% {opacity: 1;}}
</style>
