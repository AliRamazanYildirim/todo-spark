import useModalStore from "../../store/useModalStore";
import Modal from "../Modal/Modal";


const ListHeader = () => {
  const { showModal, signOut, handleAdd } = useModalStore();

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
