<script setup>

</script>

<template>
  <div class="game-control-wrapper">
    <button style="width: 100%;height: 50px">New Game</button>
    <slot />
    <div class="number-wrapper">
      <p v-for="number in 9" :key="number">{{number}}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game-control-wrapper{
  display: flex;
  flex-direction: column;
  gap: 30px;
  .number-wrapper{
    flex: 1;
    flex-direction: row;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(3, 108px);
    grid-template-rows: repeat(3, 108px);
    text-align: center;
    p{
      margin: 0;
      padding: 30px;
      font-size: 40px;
      color: dodgerblue;
      background-color: lightblue;
      border-radius: 10px;
      cursor: pointer;
      &:hover{
        opacity: 0.75;
      }
    }
  }
}
</style>