<script setup>
import {ref} from "vue";
import {challenge_3,answer_challenge_3} from "@/components/challenges";
const languages = ref([{name:'English',value:'en'},{name:'Vietnamese',value:'vi'}])
</script>

<template>
  <div class="header">
    <p>Sudoku.com</p>
    <select v-model="$i18n.locale">
      <option v-for="locale in languages" :key="locale.name" :value="locale.value" >
        {{ locale.name }}
      </option>
    </select>
  </div>
  <div class="content">
    <div class="sudoku-wrapper">
      <div class="row-flex" v-for="(row,index) in challenge_3.length" :key="row" :class="{borderBottom: (index+1) % 3 === 0 ,borderTop: index === 0}">
        <p v-for="(column,index) in challenge_3[row-1]" :key="column" :class="{read_only: column.read_only,borderLeft: (index) % 3 === 0,borderRight: index === 8}">
          {{column.num === 0 ? answer_challenge_3[row-1][index].num : column.num}}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header{
  display: flex;
  align-items: center;
  justify-content: space-around;
  align-content: baseline;
  font-size: 50px;
  height: 70px;
  border-bottom: 1px solid whitesmoke;
  margin-bottom: 30px;
}
.content{
  height: 100%;
  .sudoku-wrapper{
    margin: 0 auto;
    width: 750px;
    .row-flex{
      display: flex;
      flex-direction: row;
      p{
        border: 1px solid gray;
        padding: 10px;
        margin: 0;
        font-size: 50px;
        flex: 1;
        text-align: center;
        color: aqua;
      }
      .read_only{
        color: black;
      }
      .borderLeft{
        border-left: 4px solid black;
      }
      .borderRight{
        border-right: 4px solid black;
      }
      &.borderBottom{
        border-bottom: 4px solid black;
      }
      &.borderTop{
        border-top: 4px solid black;
      }
    }
  }
}
</style>