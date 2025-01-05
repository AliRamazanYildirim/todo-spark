import { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

const ListHeader = ({listName, getData}) => {
    const [showModal, setShowModal] = useState(false);
    const [, , removeCookie] = useCookies(null);

    const signOut = () => {
        console.log('Signing out...');
        removeCookie('Email');
        removeCookie('Token');
        window.location.reload();
    }
    return<div className="list-header">
        <h1>{listName}</h1>
        <div className="btn-group">
            <button className="create" onClick={() => setShowModal(true)}>Add</button>
            <button className="sign-out" onClick={signOut}>Sign out</button>
        </div>
        {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData}/>}
    </div>
}

export default ListHeader;