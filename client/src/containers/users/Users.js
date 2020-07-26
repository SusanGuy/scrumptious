import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import "./Users.css";
import User from "./User/user";
const Users = ({ history, user }) => {
  const [usersState, setUsers] = useState({
    users: [],
    loading: false,
    error: {},
  });
  const { users, loading } = usersState;
  useEffect(() => {
    const getAllUsers = async () => {
      setUsers({
        users: [],
        loading: true,
        error: {},
      });
      try {
        const { data } = await axios.get("/admin/users");
        setUsers({
          users: data,
          loading: false,
          error: {},
        });
      } catch (error) {
        setUsers({
          users: [],
          loading: false,
          error: {},
        });
      }
    };
    if (user && user.isAdmin) getAllUsers();
  }, [user]);

  if (!user) {
    return <Spinner />;
  }
  if (user && !user.isAdmin) {
    return <Redirect to="/my-recipes" />;
  }

  if (loading) {
    return <Spinner />;
  }

  if (users.length === 0) {
    return (
      <p
        style={{
          textAlign: "center",
          fontSize: "30px",
          marginTop: "20px",
          color: "#12343b",
        }}
      >
        Woah!No users have signed up up with us yet! :(
      </p>
    );
  }

  const handleDeleteUser = async (id) => {
    try {
      setUsers({
        users: [],
        loading: true,
        error: {},
      });
      await axios.delete(`/admin/user/${id}`);
      setUsers({
        users: users.filter((user) => user._id.toString() !== id.toString()),
        loading: false,
        error: {},
      });
    } catch (error) {
      setUsers({
        ...usersState,
        loading: false,
        error,
      });
    }
  };

  return (
    <ul className="card-list">
      {users.map((user) => (
        <User
          key={user._id}
          name={user.name}
          id={user._id}
          history={history}
          avatar={user.avatar}
          clicked={handleDeleteUser}
        />
      ))}
    </ul>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Users);
