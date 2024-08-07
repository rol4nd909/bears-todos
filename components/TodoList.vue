<template>
  <div
    class="w-[min(40rem,100%)] rounded border border-gray-300 bg-white p-6 dark:border-gray-900 dark:bg-gray-900"
  >
    <TodoItem
      v-for="todo in todoStore.paginatedTodos"
      :key="todo.id"
      :todo="todo"
    />
  </div>
</template>

<script setup lang="ts">
const todoStore = useTodoStore();
const currentPage = ref(todoStore.currentPage);

const fetchTodos = async () => {
  await todoStore.fetchTodos(currentPage.value, todoStore.pageSize);
};

onMounted(() => {
  fetchTodos();
});
</script>
