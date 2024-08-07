<template>
  <div
    v-if="todo"
    class="transform rounded border bg-white p-4 shadow-md transition hover:scale-105 dark:border-slate-700/50 dark:bg-slate-800"
  >
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="toggleCompleted"
    />
    {{ todo.todo }}
    <button class="text-red-500" @click="removeTodo">Remove</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  todo: Object as PropType<Todo>,
});

const emits = defineEmits<{
  (event: "remove", id: number): void;
  (event: "toggle", id: number, completed: boolean): void;
}>();

const removeTodo = () => {
  if (props.todo) {
    emits("remove", props.todo.id);
  }
};

const toggleCompleted = () => {
  if (props.todo) {
    emits("toggle", props.todo.id, !props.todo.completed);
  }
};
</script>
