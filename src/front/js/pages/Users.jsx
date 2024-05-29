import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Modal, Button, Table, FormControl, InputGroup } from "react-bootstrap";
import styles from "./Users.module.css";
import moment from "moment";

const Users = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const FormattedDate = ({ dateTime }) => {
    return <span>{moment(dateTime).format('LL')}</span>;
  };

  useEffect(() => {
    if (store.users) {
      setFilteredUsers(store.users.filter(user =>
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase())
      ));
    }
  }, [search, store.users]);

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  return (
    <div className={`${styles.container} container-fluid`}>
      <h3 className={`d-flex justify-content-center ${styles.title}`}>Users List</h3>
      <InputGroup className={`mb-3 ${styles.searchInput}`}>
        <FormControl
          placeholder="Search by email, name, username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
      <div className="table-responsive">
        <Table striped bordered hover responsive className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Photo</th>
              <th scope="col">Email</th>
              <th scope="col">Last name</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Register date</th>
              <th scope="col">Role</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className={styles.tableRow}>
                <th scope="row">{user.id}</th>
                <td>{user.profile_image_url ? (
                  <img
                    src={user.profile_image_url}
                    alt="Profile"
                    className={styles.userImagen}
                  />
                ) : (
                  <i className="fa-regular fa-user"></i>
                )}</td>
                <td>{user.email}</td>
                <td>{user.last_name}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td><FormattedDate dateTime={user.register_date} /></td>
                <td>{user.role}</td>
                <td>
                  <Button variant="primary" onClick={() => handleShowModal(user)} className={styles.button}>
                    Learn more
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div className={`container d-flex justify-content-center ${styles.modalContent}`}>
              <div className={`card mb-3 ${styles.card}`}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={selectedUser.profile_image_url || "https://th.bing.com/th/id/OIP.iPvPGJG166ivZnAII4ZS8gHaHa?w=194&h=194&c=7&r=0&o=5&dpr=1.5&pid=1.7..."}
                      className={`img-fluid rounded-start ${styles.profileImage}`}
                      alt="User"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className={`card-body text-black ${styles.cardBody}`}>
                      <h3 className="card-title">
                        {selectedUser.name} {selectedUser.last_name}
                      </h3>
                      <h5>User Role: {selectedUser.role}</h5>
                      <h5>User name: {selectedUser.username}</h5>
                      <h5>Email: {selectedUser.email}</h5>
                      <h5>Register date: <FormattedDate dateTime={selectedUser.register_date} /></h5>
                      <h5>Membership start date: <FormattedDate dateTime={selectedUser.membership_start_date} /></h5>
                      <h5>Membership end date: <FormattedDate dateTime={selectedUser.membership_end_date} /></h5>
                      <h5>Membership description: {selectedUser.membership_description}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} className={styles.button}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
