// App.jsx
import { AnnouncementProvider } from "./context/AnnouncementContext";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import 'rsuite/dist/rsuite.min.css';
import './index.css'
export default function App() {
  return (
    <AnnouncementProvider>
      <AnnouncementsPage />
    </AnnouncementProvider>
  );
}
