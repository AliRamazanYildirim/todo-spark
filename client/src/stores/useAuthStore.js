import { create } from 'zustand';

const useAuthStore = create((set) => ({
  email: '',
  password: '',
  confirmPassword: '',
  error: null,
  isLogin: false,

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setError: (error) => set({ error }),
  setIsLogin: (isLogin) => set({ isLogin }),
  
  resetForm: () => set({
    email: '',
    password: '',
    confirmPassword: '',
    error: null
  }),

  handleSubmit: async (e, endpoint) => {
    e.preventDefault();
    const state = useAuthStore.getState();
    
    if (!state.email || !state.password) {
      set({ error: "Email and password are required" });
      return;
    }

    if (!state.isLogin && state.password !== state.confirmPassword) {
      set({ error: "Passwords do not match" });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/auth/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: state.email,
            password: state.password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch data");
      }

      const data = await response.json();
      document.cookie = `Email=${data.email}`;
      document.cookie = `Token=${data.token}`;
      state.resetForm();
      window.location.reload();
    } catch (error) {
      set({ error: error.message });
    }
  }
}));

export default useAuthStore;