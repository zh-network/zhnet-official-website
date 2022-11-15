<template>
  <div>
    <div class="text-5xl mt-10 title-arrow">
      <a @click="emit('back')"> <ArrowUpIcon class="arrow" /> </a>
      <font color="orange">Get a Quote</font>
    </div>
    <div class="text-2xl mt-20">
      <font color="orange"><h1 align="center">Contact Us</h1></font>
      <div><h1 align="center">If you want to order or simply contact us, use our email below or contact Telegram <a href="//t.me/zh_210320" target="_blank">@zh_210320</a></h1></div>
      <div><h1 align="center">We speak English and Chinese.</h1></div><br>
      <div class="flex-33">
            <div class="text-center">
              <header class="box-header">
                <p class="text-alternate-secondary"><a class="button button-wide button-gradient" href="mailto:info@zhnet.co.uk" one-link-mark="yes"><i class="fas fa-envelope fa-left"></i>info@zhnet.co.uk</a></p>
              </header>
            </div>
          </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ArrowUpIcon from '~icons/ant-design/arrow-up-outlined';
const emit = defineEmits<{
  (e: 'back'): void;
}>();
</script>

<style lang="less" scoped>
@arrow-size: 100px;
@x-offset: 20px;
@y-offset: 12px;
.title-arrow {
  transform: translateX(-@arrow-size - @x-offset);
  .arrow {
    width: @arrow-size;
    transform: translateY(@y-offset);
    @apply cursor-pointer;
  }
}
</style>
