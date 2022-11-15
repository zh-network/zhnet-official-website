<template>
  <div ref="globeElement"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import specImage from '@/assets/texture/spec.jpg';
import { Location } from '@/types/location';
import type { GlobeInstance } from 'globe.gl';

interface Props {
  width?: number;
  height?: number;
  locations?: Location[];
  focus?: Location;
}

const props = withDefaults(defineProps<Props>(), {
  width: 800,
  height: 600,
  locations: () => [],
});

const globeElement = ref<HTMLDivElement | null>(null);

let globe: GlobeInstance;

const init = async () => {
  if (globeElement.value) {
    // init dom
    const Globe = await import('globe.gl');
    globe = Globe.default({
      rendererConfig: { alpha: true, antialias: true },
    });
    globe(globeElement.value);

    // size
    globe //
      .globeImageUrl(specImage)
      .height(props.height)
      .width(props.width)
      .backgroundColor('#000000');

    // control
    const orbitControls = globe.controls();
    orbitControls.enableZoom = false;
    orbitControls.enableRotate = false;
    orbitControls.autoRotate = true;
    orbitControls.autoRotateSpeed = 1;

    // label
    globe
      .labelsData(props.locations)
      .labelDotRadius(3)
      .labelAltitude(() => {
        return 0.005 + Math.random() * 0.015;
      })
      .labelColor(() => '#fbbf24aa')
      .labelText(() => '');
  } else {
    throw new Error('Cannot init globe before mounted');
  }
};

// watch focus
watch(
  () => props.focus,
  () => {
    if (props.focus) {
      globe.pointOfView(
        {
          lat: Number(props.focus.lat),
          lng: Number(props.focus.lng),
        },
        1000,
      );
      globe.controls().autoRotate = false;
    } else {
      globe.controls().autoRotate = true;
    }
  },
);

// watch size
watch(
  () => props.width,
  () => {
    globe.width(props.width);
  },
);
watch(
  () => props.height,
  () => {
    globe.height(props.height);
  },
);

onMounted(() => {
  init();
});
</script>
