<template>
  <div class="content-box f-full">
    <div>
      <Transition name="fade" mode="out-in">
        <DashBoard v-if="getRoute === 'dashboard'" @go="onGo" />
        <Network v-else-if="getRoute === 'network'" :locations="locationData" @focus="onFocus" @back="onBack" />
        <Placeholder v-else-if="getRoute === 'placeholder'" @back="onBack" />
        <Colo v-else-if="getRoute === 'colo'" @back="onBack" />
      </Transition>
      <div class="text-sm absolute bottom-16">©2022 ZH NETWORK LIMITED</div>
    </div>
    <client-only>
      <Globe
        class="globe"
        :height="globeSize"
        :width="globeSize"
        :locations="locationData"
        :focus="focusedLocation"
        :class="{ [getRoute]: true }"
      />
    </client-only>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useHead } from '@vueuse/head';
import { Location } from '@/types/location';
import { locationData } from '@/utils/locationData';

useHead({
  title: 'ZH NETWORK LIMITED',
  link: [
    {
      rel: 'icon',
      href: '@/assets/texture/zhnetremovebg-cut.png',
    },
  ],
  meta: [
    {
      property: 'og:locale:alternate',
      content: 'en_US',
      key: 'en_US',
    },
    {
      property: 'og:description',
      content: 'ZHNET (ZH NETWORK LIMITED, AS202888) Official Website.',
    },
    {
      property: 'keywords',
      content: 'ZH,ZHNET,ZH Network,ZH NETWORK LIMITED,AS202888,ZH Global Communications',
    },
    {
      property: 'og:tittle',
      content: 'ZH NETWORK LIMITED',
    },
    {
      property: 'og:url',
      content: 'https://zhnet.co.uk',
    },
    {
      property: 'twitter:card',
      content: 'summary',
    },
    {
      property: 'twitter:image',
      content: '@/assets/texture/zhnetremovebg-cut.png',
    },
    {
      property: 'twitter:site',
      content: '@zh_fontana',
    },
    {
      property: 'og:site_name',
      content: 'ZH NETWORK LIMITED - AS202888',
    },
    {
      property: 'og:image',
      content: '@/assets/texture/zhnetremovebg-cut.png',
    },
  ],
});

// Focus
const focusedLocation = ref<Location>();

const onFocus = (item: Location | undefined) => {
  focusedLocation.value = item;
};

// Route

const route = ref('dashboard');
const getRoute = computed(() => {
  if (route.value === 'network' || route.value === 'placeholder' || route.value === 'colo') {
    return route.value;
  } else {
    return 'dashboard';
  }
});

const onGo = (newRoute: string) => {
  route.value = newRoute;
};

const onBack = () => {
  route.value = 'dashboard';
};

watch(
  () => route.value,
  () => {
    focusedLocation.value = undefined;
  },
);

// Globe

// window size
const minSize = ref(0);
const getMinSize = () => Math.min(globalThis.screen.width, globalThis.screen.height);
const updateMinSize = () => {
  minSize.value = getMinSize();
};
// current and target
const globeSize = ref(0);
const targetSize = computed(() => {
  if (route.value === 'dashboard') {
    return minSize.value * 2;
  } else if (route.value === 'network') {
    return minSize.value;
  } else {
    return minSize.value * 2;
  }
});

const initMinSize = () => {
  updateMinSize();
  globeSize.value = targetSize.value;
};

// easing
const startTime = ref(0);
const startValue = ref(0);
const tick = () => {
  const duration = 500;
  const elapsed = Date.now() - startTime.value;
  const delta = targetSize.value - startValue.value;
  globeSize.value = startValue.value + (elapsed / duration) * delta;
  if (elapsed < duration) {
    requestAnimationFrame(tick);
  }
};
const animate = () => {
  startTime.value = Date.now();
  startValue.value = globeSize.value;
  tick();
};
watch(() => targetSize.value, animate);

onMounted(() => {
  initMinSize();
  globalThis.addEventListener('resize', updateMinSize);
});
onUnmounted(() => {
  globalThis.removeEventListener('resize', updateMinSize);
});
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.globe {
  position: absolute;
  z-index: -1;
  bottom: 0;
  right: 0;
  transition: all 0.5s;
  transform: translate(50%, 50%);
  &.dashboard,
  &.placeholder {
    right: 50vmin;
  }
  &.network {
    bottom: 15vmin;
    right: 35vmin;
    @media lg {
      bottom: 50vmin;
      right: 50vmin;
    }
  }
  &.placeholder {
    opacity: 0;
  }
}
</style>
