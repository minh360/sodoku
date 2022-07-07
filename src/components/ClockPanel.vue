<script setup>
import {computed, ref, defineProps, watch} from "vue";
const props = defineProps({
  begin: Boolean,
  done: Boolean
})
import dayjs from "dayjs";
let setInter
const STATUSES = {
  START: 0,
  PAUSE: 2,
}
const status_begin = computed(()=>{
  return props.begin
})
const status = ref(STATUSES.START)
const lastTotalMilli = ref(0)
const newTotalMilli = ref(0)
const totalMilli = computed(()=>{
  return lastTotalMilli.value + newTotalMilli.value
})
const minutes = computed(() => {
  return Math.floor(totalMilli.value / 1000 / 60 % 60)
})
const seconds = computed(() => {
  return Math.floor(totalMilli.value / 1000 % 60)
})
const formatTime = (time) =>{
  if (time <= 9 )
    return '0'+ time
  else
    return time
}
const begin_clock = ()=>{
  let timeBegin = new Date()
  lastTotalMilli.value = totalMilli.value
  setInter = setInterval(() => {
    if(props.done){
      stop_clock()
    }
    newTotalMilli.value = dayjs(new Date()).diff(timeBegin)
  }, 0)
}
const stop_clock = () => {
  clearInterval(setInter)
  status.value = STATUSES.PAUSE
}
const reset_time = () => {
  stop_clock()
  newTotalMilli.value = 0
  lastTotalMilli.value = 0
  status.value = STATUSES.START
}
watch(status_begin,()=>{
  if(props.begin){
    begin_clock()
  }
  else{
    reset_time()
  }
})
</script>

<template>
  <div class="clock_wrapper">
    <div class="clock">
      {{formatTime(minutes)}}:{{formatTime(seconds)}}
    </div>
    <div>
      <button v-if="status === STATUSES.START" @click="begin_clock">{{$t('start')}}</button>
      <button v-if="status === STATUSES.PAUSE" @click="stop_clock">{{$t('pause')}}</button>
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