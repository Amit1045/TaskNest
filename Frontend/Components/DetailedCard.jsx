import React from "react";
import { FiX } from "react-icons/fi";

const DetailedCard = ({ entity, onClose }) => {
  if (!entity) return null; // Safety check if no entity is passed

  const task = {
    title: entity.title,
    description: entity.noteDescription,
    status: entity.Status,
    priority: entity.priority,
    lastUpdated: new Date(entity.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  const statusStyle = {
    backgroundColor:
      task.status === "Completed"
        ? "#4CAF50"
        : task.status === "Pending"
        ? "#FFC107"
        : task.status === "Active"
        ? "#1ebd66"
        : "#F44336",
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontWeight: "bold",
  };

  const priorityStyle = {
    backgroundColor:
      task.priority === "High"
        ? "#F44336"
        : task.priority === "Medium"
        ? "#FF9800"
        : "#2196F3",
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontWeight: "bold",
    marginLeft: "10px",
  };

  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    width: "90%",
    maxWidth: "600px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
    backgroundColor: "#fff",
    position: "relative",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.3)",
    backdropFilter: "blur(6px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const headingStyle = {
    color: "#333",
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
    marginBottom: "20px",
  };

  const detailRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
    padding: "10px 0",
    borderBottom: "1px dotted #eee",
  };

  const labelStyle = {
    fontWeight: "bold",
    color: "#555",
    flexBasis: "30%",
  };

  const valueStyle = {
    flexBasis: "70%",
    textAlign: "right",
  };

  const descriptionBoxStyle = {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "6px",
    marginTop: "15px",
    borderLeft: "4px solid #007bff",
    lineHeight: "1.6",
    color: "#444",
  };

  return (
    <div style={overlayStyle}>
      <div style={containerStyle}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#666",
            fontSize: "20px",
          }}
        >
          <FiX />
        </button>

        <h1 style={headingStyle}>{task.title}</h1>

        {/* Status and Priority */}
        <div style={detailRowStyle}>
          <div style={labelStyle}>Status & Priority</div>
          <div style={valueStyle}>
            <span style={statusStyle}>{task.status}</span>
            <span style={priorityStyle}>{task.priority}</span>
          </div>
        </div>

        {/* Description */}
        <h2
          style={{
            ...headingStyle,
            fontSize: "1.2em",
            marginTop: "20px",
          }}
        >
          Details
        </h2>
        <div style={descriptionBoxStyle}>
          <p>{task.description}</p>
        </div>

        {/* Last Updated */}
        <div style={{ ...detailRowStyle, marginTop: "20px" }}>
          <div style={labelStyle}>Last Updated</div>
          <div style={valueStyle}>{task.lastUpdated}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailedCard;
