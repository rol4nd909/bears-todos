<template>
  <form @submit.prevent="addTodo" class="flex gap-4">
    <div class="flex-1">
      <label for="todo" class="sr-only">Add todo</label>
      <input
        id="todo"
        v-model="newTodo.todo"
        type="text"
        class="w-full border-b border-gray-300 bg-transparent py-4 focus:border-blue-500 focus:outline-none dark:border-slate-700/50 dark:focus:border-blue-400"
        placeholder="Add todo"
        required
      />
    </div>
    <button
      type="submit"
      class="rounded bg-blue-500 px-4 py-2 text-slate-900 dark:bg-blue-400"
    >
      Add Todo
    </button>
  </form>
</template>

<script setup lang="ts">
const todoStore = useTodoStore();

const newTodo = ref({
  todo: "",
  completed: false,
  userId: 1,
});

const emits = defineEmits(["todoAdded"]);

const addTodo = async () => {
  if (newTodo.value.todo.trim() === "") {
    return;
  }

  try {
    await todoStore.addTodo({
      todo: newTodo.value.todo,
      completed: newTodo.value.completed,
      userId: newTodo.value.userId,
    });
    newTodo.value.todo = "";
    emits("todoAdded");
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};
</script>
