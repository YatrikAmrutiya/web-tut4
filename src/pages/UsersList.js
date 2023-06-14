import React, { useState, useEffect } from "react";
import { Form, Card, ListGroup } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UsersList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://express-t4.onrender.com/api/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserClick = (_id) => {
    navigate(`/profile/${_id}`);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    return user.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="m-5 d-flex flex-column">
      <Form.Group controlId="search">
        <p className="h1 heading">Users</p>
        <Form.Control
          type="text"
          placeholder="Search by First Name or Last Name"
          value={search}
          onChange={handleSearchChange}
        />
      </Form.Group>

      <div className="card-container mt-5 ">
        {filteredUsers.map((user) => (
          <Card
            key={user._id}
            onClick={() => handleUserClick(user._id)}
            className="card-item user-card-item"
          >
            <Card.Img
              variant="top"
              src={user.picture}
              alt="User Avatar"
              className="user-card-image"
            />
            <Card.Body>
              <Card.Title>Name: {user.name}</Card.Title>
              <Card.Text>Email: {user.email}</Card.Text>
              <Card.Text>Balance: {user.balance}</Card.Text>
              <Card.Text>Age: {user.age}</Card.Text>
              <Card.Text>Gender: {user.gender}</Card.Text>
              <Card.Link href="#" className="btn btn-primary">
                Details
              </Card.Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default UsersList;
