// pages/AnnouncementsPage.jsx
import { useState } from "react";
import { useAnnouncements } from "../context/AnnouncementContext";
import SearchIcon from "@rsuite/icons/Search";
import {
  Button,
  FlexboxGrid,
  Input,
  ButtonGroup,
  IconButton,
  Message,
  Stack,
  Divider,
  InputGroup,
} from "rsuite";
import GridIcon from "@rsuite/icons/Grid";
import TableIcon from "@rsuite/icons/Table";
import PlusIcon from "@rsuite/icons/Plus";

import AnnouncementModal from "../components/AnnouncementModal";
import AnnouncementTable from "../components/AnnouncementTable";
import AnnouncementCard from "../components/AnnouncementCard";
import ScrollToTopButton from "../components/ScrollToTopButton";

export default function AnnouncementsPage() {
  const {
    announcements,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
  } = useAnnouncements();

  const [mode, setMode] = useState("edit");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleView = (data) => {
    setModalOpen(true);
    setEditData(data);
    setMode("view");
  };

  // ✅ Filter announcements by search
  const filtered = announcements.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (data) => {
    if (editData) {
      updateAnnouncement(data.id, {
        title: data.title,
        type: data.type,
        description: data.description,
      });
    } else {
      addAnnouncement({
        title: data.title,
        type: data.type,
        description: data.description,
      });
    }
    setEditData(null);
    setModalOpen(false);
  };

  return (
    <div style={{ background: "#f5f8fb", minHeight: "100vh" }}>
      <div className="px-4 sm:px-6 md:px-10 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* ✅ Header Section */}
          <div>
            <h3 className="text-xl font-bold mb-1">Announcements</h3>
            <p className="text-gray-500 m-0 text-sm">
              Manage and view company announcements
            </p>
          </div>
          {/* ✅ Search + Controls */}
          <div className="md:w-1/2 md:justify-end flex flex-wrap flex-row sm:items-center gap-3">
            {/* 🔍 Search Input */}
            <InputGroup style={{ width: "100%", maxWidth: 250 }}>
              <Input
                placeholder="Search announcements..."
                value={search}
                onChange={setSearch}
              />
              <InputGroup.Addon>
                <SearchIcon />
              </InputGroup.Addon>
            </InputGroup>

            {/* 📊 View Toggle */}
            <ButtonGroup>
              <IconButton
                icon={<GridIcon />}
                appearance={view === "grid" ? "ghost" : "default"}
                onClick={() => setView("grid")}
                title="Grid view"
              />
              <IconButton
                icon={<TableIcon />}
                appearance={view === "table" ? "ghost" : "default"}
                onClick={() => setView("table")}
                title="Table view"
              />
            </ButtonGroup>

            {/* ➕ Add Button */}
            <Button
              appearance="primary"
              startIcon={<PlusIcon />}
              onClick={() => {
                setEditData(null);
                setModalOpen(true);
              }}
              // className="w-full sm:w-auto"
            >
              New
            </Button>
          </div>
        </div>

        {/* </div> */}

        <Divider className="my-4" />

        {/* ✅ Announcement List */}
        <div className="mt-6">
          {filtered.length === 0 ? (
            <Message type="info" showIcon>
              No announcements found.
            </Message>
          ) : view === "grid" ? (
            <div className="flex flex-wrap gap-4">
              {filtered.map((item) => (
                // <div key={item.id} className="w-full sm:w-[48%] lg:w-[32%]">
                  <AnnouncementCard
                    item={item}
                    onEdit={(data) => {
                      setEditData(data);
                      setModalOpen(true);
                    }}
                    onView={(data) => handleView(data)}
                    onDelete={deleteAnnouncement}
                  />
                // </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <AnnouncementTable
                data={filtered}
                onEdit={(data) => {
                  setEditData(data);
                  setModalOpen(true);
                }}
                onDelete={deleteAnnouncement}
                onView={(data) => handleView(data)}
              />
            </div>
          )}
        </div>
      </div>

      {/* ✅ Modal */}
      <AnnouncementModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditData(null);
          setMode("edit");
        }}
        onSave={handleSave}
        initialData={editData}
        mode={mode}
      />

      <ScrollToTopButton />
    </div>
  );
}
