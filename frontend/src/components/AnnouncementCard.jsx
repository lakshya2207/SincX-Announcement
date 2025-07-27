import { Panel, Button, FlexboxGrid, Tag } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";
import TrashIcon from "@rsuite/icons/Trash";
import Quill from "quill";
import "quill/dist/quill.bubble.css"; // ✅ bubble theme looks cleaner for read-only
import { useEffect, useRef } from "react";
import { BsEye } from "react-icons/bs";

const typeColors = {
  "Policy Updates": "blue",
  "IT Notices": "orange",
  "Event Notifications": "green",
  "Compliance Alerts": "violet",
};

export default function AnnouncementCard({ item, onEdit, onDelete, onView }) {
  const previewRef = useRef(null);

  useEffect(() => {
    if (!previewRef.current) return;

    // Clear previous preview
    previewRef.current.innerHTML = "";

    const container = document.createElement("div");
    previewRef.current.appendChild(container);

    // ✅ Read-only Quill instance without internal scrolling
    const quill = new Quill(container, {
      readOnly: true,
      theme: "bubble",
    });

    quill.setContents(item.description);
  }, [item.description]);

  return (
    <Panel
      bordered
      shaded
      className="not-md:w-[80vw] md:w-100"
      style={{
        position:'relative',
        borderRadius: "10px",
        padding: "12px 14px",
        background: "#fff",
        boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginInline:"auto"
      }}
    >
      {/* ✅ Title + Tag */}
      <div style={{ marginBottom: "6px" }}>
        <FlexboxGrid justify="space-between" align="middle">
          <h6 style={{ margin: 0, fontWeight: 600, fontSize: "15px" }}>
            {item.title}
          </h6>
          <Tag color={typeColors[item.type] || "gray"} size="sm" className="absolute top-2 right-2">
            {item.type}
          </Tag>
        </FlexboxGrid>
      </div>

      {/* ✅ Only one scroll on this outer div */}
      <div
        ref={previewRef}
        style={{
          flex: 1,
          height: "260px", // ✅ fixed card height
          overflowY: "auto", // ✅ only scroll here
          overflowX: "hidden",
          marginBottom: "10px",
          paddingRight: "6px",
        }}
        className="bg-gray-100 border-1 border-gray-300 announcement-preview"
      />

      {/* ✅ Buttons at Bottom */}
      <FlexboxGrid justify="end" style={{ marginTop: "8px", gap: "5px" }}>
        <Button
          size="xs"
          appearance="ghost"
          onClick={() => onView(item)}
          startIcon={<BsEye />}
        >
          View
        </Button>

        <Button
          size="xs"
          appearance="ghost"
          onClick={() => onEdit(item)}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>

        <Button
          size="xs"
          appearance="primary"
          color="red"
          onClick={() => onDelete(item.id)}
          startIcon={<TrashIcon />}
        >
          Delete
        </Button>
      </FlexboxGrid>
    </Panel>
  );
}
