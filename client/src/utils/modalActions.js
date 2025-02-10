import { apiRequest } from "./api.modal";

export const signOut = (removeCookie) => {
  console.log("Signing out...");
  removeCookie("Email");
  removeCookie("Token");
  window.location.reload();
};

export const handleAdd = (set) => {
  set((state) => ({ ...state, mode: "create", showModal: true }));
};

export const handleSubmit = async (e, useModalStore) => {
  e.preventDefault();
  const { data, editMode, setShowModal, getData } = useModalStore.getState();
  const url = editMode
    ? `${import.meta.env.VITE_APP_SERVER_URL}/api/todos/${data.id}`
    : `${import.meta.env.VITE_APP_SERVER_URL}/api/todos`;
  const method = editMode ? "PUT" : "POST";

  try {
    await apiRequest(url, method, data);
    console.log("Worked");
    setShowModal(false);
    getData();
    window.location.reload(); // Seite aktualisieren
  } catch (error) {
    console.error(`Failed to ${editMode ? "update" : "create"} todo`, error);
  }
};
