import axios from "axios";

const API_URL = "https://dummyjson.com/todos/";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [] as Todo[],
    currentPage: 1,
    pageSize: 5,
    totalTodos: 0,
  }),

  getters: {
    paginatedTodos(state) {
      const start = (state.currentPage - 1) * state.pageSize;
      return state.todos.slice(start, start + state.pageSize);
    },
  },

  actions: {
    async fetchTodos(page: number, limit: number) {
      const skip = (page - 1) * limit;

      try {
        const response = await axios.get<TodoApiResponse>(
          `${API_URL}?skip=${skip}&limit=${limit}`,
        );

        this.todos = response.data.todos;
        this.totalTodos = response.data.total;
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    },
  },
});

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

interface TodoApiResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}
