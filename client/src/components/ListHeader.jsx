import { useCookies } from "react-cookie";
import useModalStore from "../store/useModalStore";
import Modal from "./Modal";

const ListHeader = () => {
  const { showModal, setShowModal, setMode } = useModalStore();
  const [, , removeCookie] = useCookies(null);

  const signOut = () => {
    console.log('Signing out...');
    removeCookie('Email');
    removeCookie('Token');
    window.location.reload();
  };

  const handleAdd = () => {
    setMode("create");
    setShowModal(true);
  };

  return (
    <div className="list-header">
      <h1 className="list-header-title">Todo List</h1>
      <div className="btn-group">
        <button className="create" onClick={handleAdd}>
          Add
        </button>
        <button className="sign-out" onClick={signOut}>
          Sign out
        </button>
      </div>
      {showModal && <Modal />}
    </div>
  );
};

export default ListHeader;