import { create } from "zustand";
import { signOut, handleAdd, handleSubmit } from "../utils/modalActions";

const useModalStore = create((set) => ({
  data: {
    user_email: "",
    title: "",
    progress: 50,
    date: new Date(),
  },
  setData: (newData) =>
    set((state) => ({ data: { ...state.data, ...newData } })),
  showModal: false,
  setShowModal: (show) => set({ showModal: show }),
  mode: "",
  setMode: (mode) => set({ mode }),
  task: null,
  setTask: (task) => set({ task }),
  getData: () => {},
  setGetData: (getData) => set({ getData }),
  signOut, // <-- Kein Argument mehr nötig, weil removeCookie jetzt in signOut() geholt wird
  handleAdd: () => handleAdd(set),
  handleSubmit: (e) => handleSubmit(e, useModalStore),
}));

export default useModalStore;
