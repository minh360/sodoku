<script setup>
import {ref} from "vue";
import {challenge_3,answer_challenge_3} from "@/components/challenges";
import HeaderPanel from "@/components/HeaderPanel";
import GamePanel from "@/components/GamePanel";
import GameControlPanel from "@/components/GameControlPanel";
import ButtonControlPanel from "@/components/ButtonControlPanel";
const status_note = ref(false)
const auto_check_mistakes = ref(false)
const undo = ()=>{

}
const erase = ()=>{

}
const note = ()=>{

}
const hint = ()=>{

}
</script>

<template>
  <header-panel />
  <div class="content">
    <div class="sudoku-wrapper">
      <div style="font-size: 20px">
        Auto_Check  <input type="checkbox" v-model="auto_check_mistakes" style="width: 20px;height: 20px">
      </div>
      <div class="game-wrapper">
        <game-panel :challenge="challenge_3" :answer_challenge="answer_challenge_3" style="width: 500px;" />
        <game-control-panel>
          <button-control-panel @undo="undo" @erase="erase" @note="note" @hint="hint" :status_note="status_note"/>
        </game-control-panel>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content{
  height: 100%;
  .sudoku-wrapper {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 900px;
    .game-wrapper{
      display: flex;
      gap: 40px
    }
  }
}
</style>