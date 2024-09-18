import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Pages from "./pages";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Pages />
      </AuthProvider>
      {/* Ini akan mengatur semua routing dan halaman */}
      {/* <ProTip /> */}
      {/* <Copyright /> */}
    </Router>
  );
}
