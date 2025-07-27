import { useContext } from "react";
import { AnnouncementContext } from "../context/AnnouncementContext";

export const useAnnouncements = () => useContext(AnnouncementContext);
