import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Directory from "./pages/Directory";
import ListingDetail from "./pages/ListingDetail";
import About from "./pages/About";
import Submit from "./pages/Submit";
import Family from "./pages/Family";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="directory" element={<Directory />} />
          <Route path="directory/:id" element={<ListingDetail />} />
          <Route path="about" element={<About />} />
          <Route path="family" element={<Family />} />
          <Route path="submit" element={<Submit />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
