import {create} from 'zustand';

const useModalStore = create((set) => ({
  data: {
    user_email: '',
    title: '',
    progress: 50,
    date: new Date(),
  },
  setData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
  showModal: false,
  setShowModal: (show) => set({ showModal: show }),
  mode: '',
  setMode: (mode) => set({ mode }),
  task: null,
  setTask: (task) => set({ task }),
  getData: () => {},
  setGetData: (getData) => set({ getData }),
  listName: '',
  setListName: (title) => set({ listName: title }),
}));

export default useModalStore;