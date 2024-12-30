const ListHeader = ({listName}) => {
    const signOut = () => {
        console.log('signout');
        
    }
    return<div className="list-header">
        <h1>{listName}</h1>
        <div className="btn-group">
            <button className="btn-add">Add</button>
            <button className="btn-sign-out" onClick={signOut}>Sign out</button>
        </div>
    </div>
}

export default ListHeader;