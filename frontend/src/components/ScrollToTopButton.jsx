import { useEffect, useState } from "react";
import { Button } from "rsuite";
import { ArrowUp } from "lucide-react"; // lightweight icon

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300); // show only after scrolling 300px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <Button
      onClick={scrollToTop}
      appearance="primary"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        borderRadius: "50%",
        width: "45px",
        height: "45px",
        padding: "0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        backgroundColor: "#3498ff",
      }}
    >
      <ArrowUp size={20} color="white" />
    </Button>
  );
}
