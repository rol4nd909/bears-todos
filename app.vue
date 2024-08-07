<script setup>
const colorMode = useColorMode();
</script>

<template>
  <div class="grid min-h-screen place-content-center ~gap-4/6 ~p-4/8">
    <h1 class="text-balance ~text-2xl/5xl">Todo List</h1>

    <TodoList />
  </div>
</template>

<style lang="postcss">
body {
  @apply bg-gray-100 text-gray-700 dark:bg-slate-950 dark:text-gray-500;
}
</style>
