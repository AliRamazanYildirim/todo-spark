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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, editMode, setShowModal, getData } = useModalStore.getState();
    const url = editMode
      ? `${import.meta.env.VITE_APP_SERVER_URL}/api/todos/${data.id}`
      : `${import.meta.env.VITE_APP_SERVER_URL}/api/todos`;
    const method = editMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        console.log("Worked");
        setShowModal(false);
        getData();
        window.location.reload(); // Seite aktualisieren
      } else {
        console.error(`Failed to ${editMode ? "update" : "create"} todo`);
      }
    } catch (error) {
      console.error(error);
    }
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
    handleSubmit,
  };
});

export default useModalStore;