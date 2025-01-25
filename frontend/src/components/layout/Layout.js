import Navbar from "./Navbar";
import './Layout.css';
import Settings from "../settings/Settings";

export default function Layout({ children }) {
  return (
    <div className="layout">
        <Settings />
        <div className="main-content">
            {children}
        </div>
        <Navbar />
    </div>
  );
}
