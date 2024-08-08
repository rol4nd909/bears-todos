<template>
  <Motion
    preset="slideLeft"
    v-if="todo"
    class="flex gap-4 rounded border bg-white p-4 shadow-md dark:border-slate-700/50 dark:bg-slate-800"
  >
    <label class="flex flex-1 cursor-pointer gap-4">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="toggleCompleted"
      />

      <span
        class="text-gray-700/75 line-through dark:text-gray-300/80"
        v-if="todo.completed"
        >{{ todo.todo }}</span
      >
      <span v-else>{{ todo.todo }}</span>
    </label>

    <button class="transition hover:text-red-500" @click.stop="removeTodo">
      <span class="sr-only">Remove</span>
      <Icon
        name="solar:trash-bin-minimalistic-linear"
        mode="svg"
        class="text-2xl"
      />
    </button>
  </Motion>
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
