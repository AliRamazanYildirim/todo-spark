import useModalStore from "../../stores/useModalStore";
import Modal from "../Modal/Modal";
import { useCookies } from "react-cookie"; // <-- Hier holen wir useCookies

const ListHeader = () => {
  const { showModal, signOut, handleAdd } = useModalStore();
  const [, , removeCookie] = useCookies(null); // <-- useCookies in der Komponente aufrufen

  return (
    <div className="list-header">
      <h1 className="list-header-title">Todo List</h1>
      <div className="btn-group">
        <button className="create" onClick={handleAdd}>
          Add
        </button>
        <button className="sign-out" onClick={() => signOut(removeCookie)}>
          Sign out
        </button>
      </div>
      {showModal && <Modal />}
    </div>
  );
};

export default ListHeader;
