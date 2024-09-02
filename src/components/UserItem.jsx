import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  EmailOutlined as EmailOutlinedIcon,
  PhoneEnabledOutlined as PhoneEnabledOutlinedIcon,
  LanguageOutlined as LanguageOutlinedIcon,
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  BorderColorOutlined as BorderColorOutlinedIcon,
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import { updateUser } from "../redux/usersSlice";
import EditUserModal from "./EditUserModal";
import "./UserItem.css";

const UserItem = ({ users, onDelete }) => {
  const [liked, setLiked] = useState(false);
  const [EditIsHovered, setEditIsHovered] = useState(false);
  const [RemoveIsHovered, setRemoveIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(users);
  const dispatch = useDispatch();

  const handleLikeToggle = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const handleEdit = (updatedData) => {
    setUserData(updatedData);
    dispatch(updateUser(updatedData));
  };

  const handleDelete = () => {
    onDelete(userData.username);
  };

  return (
    <li className="user-item">
      <article>
        <div>
          <img
            src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${userData.username}`}
            alt="Avatar"
          />
        </div>
        <div className="user-details">
          <h3>{userData.name}</h3>
          <div className="icon-text">
            <EmailOutlinedIcon style={{ fontSize: "20px", color: "#5f5f5f" }} />
            <span>{userData.email}</span>
          </div>
          <div className="icon-text">
            <PhoneEnabledOutlinedIcon
              style={{ fontSize: "20px", color: "#5f5f5f" }}
            />
            <span>{userData.phone}</span>
          </div>
          <div className="icon-text">
            <LanguageOutlinedIcon
              style={{ fontSize: "20px", color: "#5f5f5f" }}
            />
            <span>{userData.website}</span>
          </div>
        </div>
        <div className="bottom-bar">
          {!liked ? (
            <FavoriteBorderOutlinedIcon
              style={{
                fontSize: "18px",
                color: "#d30d0d",
                cursor: "pointer",
              }}
              onClick={handleLikeToggle}
            />
          ) : (
            <FavoriteIcon
              style={{
                fontSize: "18px",
                color: "#d30d0d",
                cursor: "pointer",
              }}
              onClick={handleLikeToggle}
            />
          )}
          {EditIsHovered ? (
            <BorderColorOutlinedIcon
              onClick={() => setIsModalOpen(true)}
              onMouseLeave={() => setEditIsHovered(false)}
              style={{ fontSize: "18px", color: "#2394FE", cursor: "pointer" }}
            />
          ) : (
            <BorderColorOutlinedIcon
              onClick={() => setIsModalOpen(true)}
              onMouseEnter={() => setEditIsHovered(true)}
              style={{ fontSize: "18px", color: "grey", cursor: "pointer" }}
            />
          )}
          {RemoveIsHovered ? (
            <DeleteIcon
              onClick={handleDelete}
              onMouseLeave={() => setRemoveIsHovered(false)}
              style={{ fontSize: "18px", color: "#2394FE", cursor: "pointer" }}
            />
          ) : (
            <DeleteIcon
              onClick={handleDelete}
              onMouseEnter={() => setRemoveIsHovered(true)}
              style={{ fontSize: "18px", color: "grey", cursor: "pointer" }}
            />
          )}
        </div>
      </article>

      <EditUserModal
        user={userData}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleEdit}
      />
    </li>
  );
};

export default UserItem;
