import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [] as Todo[],
    localTodos: [] as Todo[],
  }),

  getters: {
    allTodos(state) {
      return [...state.todos, ...state.localTodos];
    },
    completedTodos(state) {
      return [...state.todos, ...state.localTodos].filter(
        (todo) => todo.completed,
      );
    },
    notCompletedTodos(state) {
      return [...state.todos, ...state.localTodos].filter(
        (todo) => !todo.completed,
      );
    },
  },

  actions: {
    loadFromLocalStorage(): boolean {
      const storedTodos = localStorage.getItem("todos");
      const storedLocalTodos = localStorage.getItem("localTodos");

      if (storedTodos) this.todos = JSON.parse(storedTodos);
      if (storedLocalTodos) this.localTodos = JSON.parse(storedLocalTodos);

      return !!(storedTodos || storedLocalTodos);
    },

    saveToLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
      localStorage.setItem("localTodos", JSON.stringify(this.localTodos));
    },

    async fetchTodos(limit: number = 5) {
      try {
        const response = await axios.get<TodoApiResponse>(
          `${API_URL}?limit=${limit}`,
        );

        this.todos = response.data.todos;
        this.saveToLocalStorage();
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    },

    async addTodo(todo: Omit<Todo, "id">) {
      try {
        // Simulate adding a new todo
        const response = await axios.post<Todo>(`${API_URL}/add`, todo, {
          headers: { "Content-Type": "application/json" },
        });

        // Create a new todo object with a unique ID
        const newTodo = {
          ...response.data,
          isLocal: true,
        };

        // If localTodos is empty, this is the first todo, assign a unique ID
        if (this.localTodos.length === 0) {
          newTodo.id = Date.now(); // Assign a unique ID
        }

        this.localTodos.push(newTodo);
        this.saveToLocalStorage();
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    },

    async removeTodo(id: number) {
      const localIndex = this.localTodos.findIndex((todo) => todo.id === id);

      if (localIndex !== -1) {
        this.localTodos.splice(localIndex, 1);
        this.saveToLocalStorage();
        return;
      }

      const apiIndex = this.todos.findIndex((todo) => todo.id === id);

      if (apiIndex !== -1) {
        try {
          const response = await axios.delete<{
            isDeleted: boolean;
            deletedOn: string;
          }>(`${API_URL}/${id}`);

          if (response.data.isDeleted) {
            this.todos.splice(apiIndex, 1);
            this.saveToLocalStorage();
          }
        } catch (error) {
          console.error("Error removing todo:", error);
        }
      }
    },

    async updateTodoStatus(id: number, completed: boolean) {
      const localIndex = this.localTodos.findIndex((todo) => todo.id === id);

      if (localIndex !== -1) {
        this.localTodos[localIndex].completed = completed;
        this.saveToLocalStorage();
        return;
      }

      const apiIndex = this.todos.findIndex((todo) => todo.id === id);

      if (apiIndex !== -1) {
        try {
          const response = await axios.put<Todo>(
            `${API_URL}/${id}`,
            { completed },
            { headers: { "Content-Type": "application/json" } },
          );

          this.todos[apiIndex].completed = response.data.completed;
          this.saveToLocalStorage();
        } catch (error) {
          console.error("Error updating todo status:", error);
        }
      }
    },
  },
});

// Interfaces
export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  isLocal?: boolean;
  isDeleted?: boolean;
  deletedOn?: string;
}

interface TodoApiResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}
