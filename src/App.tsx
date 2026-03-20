import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Directory from "./pages/Directory";
import ListingDetail from "./pages/ListingDetail";
import About from "./pages/About";
import Submit from "./pages/Submit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="directory" element={<Directory />} />
          <Route path="directory/:id" element={<ListingDetail />} />
          <Route path="about" element={<About />} />
          <Route path="submit" element={<Submit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
