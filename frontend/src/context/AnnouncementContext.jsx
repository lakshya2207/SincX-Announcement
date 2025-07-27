import { createContext, useState, useContext, useEffect } from "react";
import Quill from "quill";

export const AnnouncementContext = createContext();

export const AnnouncementProvider = ({ children }) => {
  const Delta = Quill.import("delta");
  const API_URL = import.meta.env.VITE_BACKEND_URl;
console.log('import.meta.env.VITE_BACKEND_URl',import.meta.env.VITE_BACKEND_URl);

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch announcements from backend
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        // ✅ Safely parse description
        const formatted = data.map((a) => {
          let parsedDesc = a.description;

          // If backend returns a string, parse it
          if (typeof parsedDesc === "string") {
            try {
              parsedDesc = JSON.parse(parsedDesc);
            } catch (err) {
              console.warn("Invalid JSON in description", err);
            }
          }

          return {
            ...a,
            description: new Delta(parsedDesc),
          };
        });

        setAnnouncements(formatted);
      } catch (err) {
        console.error("Failed to fetch announcements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // ✅ Add announcement (POST)
  const addAnnouncement = async (announcement) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...announcement,
          description: announcement.description, // send full Delta JSON
        }),
      });

      const newAnnouncement = await res.json();

      // ✅ Convert back to Delta for frontend
      setAnnouncements((prev) => [
        ...prev,
        {
          ...newAnnouncement,
          description: new Delta(
            typeof newAnnouncement.description === "string"
              ? JSON.parse(newAnnouncement.description)
              : newAnnouncement.description
          ),
        },
      ]);
    } catch (err) {
      console.error("Failed to add announcement:", err);
    }
  };

  // ✅ Update announcement (PUT)
  const updateAnnouncement = async (id, updated) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updated,
          description: updated.description, // full Delta JSON
        }),
      });

      if (!res.ok) return console.error("Failed to update announcement");

      setAnnouncements((prev) =>
        prev.map((a) =>
          a.id === id
            ? {
                ...updated,
                id,
                description: new Delta(
                  typeof updated.description === "string"
                    ? JSON.parse(updated.description)
                    : updated.description
                ),
              }
            : a
        )
      );
    } catch (err) {
      console.error("Failed to update announcement:", err);
    }
  };

  // ✅ Delete announcement (DELETE)
  const deleteAnnouncement = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) return console.error("Failed to delete announcement");

      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Failed to delete announcement:", err);
    }
  };

  return (
    <AnnouncementContext.Provider
      value={{
        announcements,
        loading,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncements = () => useContext(AnnouncementContext);
