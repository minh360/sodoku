<script setup>
import {computed, defineProps,defineEmits} from "vue";
import {STATUSES_CLOCK} from "@/components/statuses";
const emits = defineEmits(['stop_clock','begin_clock'])
const props = defineProps({
  totalMilli: Number,
  status: Number
})
const minutes = computed(() => {
  return Math.floor(props.totalMilli / 1000 / 60 % 60)
})
const seconds = computed(() => {
  return Math.floor(props.totalMilli / 1000 % 60)
})
const formatTime = (time) =>{
  if (time <= 9 )
    return '0'+ time
  else
    return time
}
</script>

<template>
  <div class="clock_wrapper">
    <div class="clock">
      {{formatTime(minutes)}}:{{formatTime(seconds)}}
    </div>
    <div>
      <button v-if="status === STATUSES_CLOCK.START" @click="emits('begin_clock')">{{$t('start')}}</button>
      <button v-if="status === STATUSES_CLOCK.PAUSE" @click="emits('stop_clock')">{{$t('pause')}}</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.clock_wrapper{
  display: flex;
  flex-direction: row;
  gap: 10px
}
</style>