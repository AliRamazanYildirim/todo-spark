import { create } from 'zustand';

const useModalStore = create((set) => {
  const signOut = (removeCookie) => {
    console.log('Signing out...');
    removeCookie('Email');
    removeCookie('Token');
    window.location.reload();
  };

  const handleAdd = () => {
    set((state) => ({ ...state, mode: "create", showModal: true }));
  };

  return {
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
    signOut,
    handleAdd,
  };
});

export default useModalStore;