import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Directory from "./pages/Directory";
import ListingDetail from "./pages/ListingDetail";
import About from "./pages/About";
import Submit from "./pages/Submit";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="directory" element={<Directory />} />
            <Route path="directory/:id" element={<ListingDetail />} />
            <Route path="about" element={<About />} />
            <Route path="submit" element={<Submit />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
