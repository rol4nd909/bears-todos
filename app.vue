<script setup>
const colorMode = useColorMode();
</script>

<template>
  <div
    class="grid min-h-screen content-center justify-items-center ~gap-4/6 ~p-4/8"
  >
    <h1 class="text-balance ~text-2xl/5xl">Todo List</h1>

    <TodoList />
  </div>
</template>

<style lang="postcss">
body {
  @apply bg-gradient-to-br from-slate-50 to-slate-100 text-gray-700 dark:from-slate-900 dark:to-slate-950 dark:text-gray-300;
}
</style>
