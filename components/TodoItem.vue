<template>
  <div
    v-if="todo"
    class="mb-2 transform rounded bg-white p-4 shadow-md transition hover:scale-105 dark:bg-slate-800"
  >
    {{ todo.todo }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  todo: Object as PropType<Todo>,
});
</script>
