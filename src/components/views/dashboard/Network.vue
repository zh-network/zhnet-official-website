<template>
  <div>
    <div
      class="transform lg:(text-7xl translate-x-[calc(-1em-36px)]) <lg:(text-4xl translate-x-[calc(-1em-16px)]) mt-10"
    >
      <a @click="emit('back')">
        <ArrowUpIcon class="lg:text-7xl <lg:text-4xl transform translate-y-[0.2em] cursor-pointer" />
      </a>
      About Our Network
    </div>
    <ul class="mt-20">
      <li class="list-disc not-first:mt-2" v-for="location in props.locations">
        <a class="cursor-pointer hover:underline text-3xl" @click="expand(location)">{{ location.name }}</a>
        <Transition name="fadeHeight">
          <div
            class="text-2xl overflow-y-hidden"
            v-show="expanded?.name === location.name"
            v-html="location.description"
          ></div>
        </Transition>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Location } from '@/types/location';
import ArrowUpIcon from '~icons/ant-design/arrow-up-outlined';

interface Props {
  locations?: Location[];
}
const props = withDefaults(defineProps<Props>(), {
  locations: () => [],
});

const emit = defineEmits<{
  (e: 'focus', item: Location | undefined): void;
  (e: 'back'): void;
}>();

const expanded = ref<Location>();

const expand = (target: Location) => {
  if (expanded.value?.name === target.name) {
    expanded.value = undefined;
  } else {
    expanded.value = target;
  }
  emit('focus', expanded.value);
};
</script>

<style lang="less" scoped>
@fade-height: 96px;

.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all 0.5s;
  max-height: @fade-height;
}

.fadeHeight-enter-from,
.fadeHeight-leave-to {
  opacity: 0;
  max-height: 0px;
}
</style>
