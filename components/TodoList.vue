<template>
  <div
    class="grid w-[min(40rem,100%)] rounded border border-slate-300 bg-white p-6 ~gap-6/10 dark:border-slate-800 dark:bg-gray-900"
  >
    <AddTodo />

    <div
      class="grid gap-2 border-b border-slate-300 ~pb-6/10 dark:border-slate-800"
      v-if="todoStore.notCompletedTodos.length > 0"
    >
      <TodoItem
        v-for="todo in todoStore.notCompletedTodos"
        :key="todo.id"
        :todo="todo"
        @remove="removeTodo"
        @toggle="toggleTodoStatus"
      />
    </div>

    <div class="grid gap-2">
      <h2
        class="text-lg font-semibold"
        v-if="todoStore.completedTodos.length < 1"
      >
        No completed items
      </h2>
      <h2
        class="text-lg font-semibold"
        v-else-if="todoStore.completedTodos.length === 1"
      >
        {{ todoStore.completedTodos.length }} completed item
      </h2>
      <h2 class="text-lg font-semibold" v-else>
        {{ todoStore.completedTodos.length }} completed items
      </h2>

      <div class="grid gap-4" v-if="todoStore.completedTodos.length > 0">
        <TodoItem
          v-for="todo in todoStore.completedTodos"
          :key="todo.id"
          :todo="todo"
          @remove="removeTodo"
          @toggle="toggleTodoStatus"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const todoStore = useTodoStore();

const fetchTodos = async () => {
  await todoStore.fetchTodos();
};

const removeTodo = async (id: number) => {
  await todoStore.removeTodo(id);
};

const toggleTodoStatus = async (id: number, completed: boolean) => {
  await todoStore.updateTodoStatus(id, completed);
};

onMounted(() => {
  const hasLocalTodos = todoStore.loadFromLocalStorage();

  if (!hasLocalTodos) {
    fetchTodos();
  }
});
</script>
