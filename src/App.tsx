import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import DataError from "./components/DataError";
import { listingsResult } from "./data/listings";
import Home from "./pages/Home";
import Directory from "./pages/Directory";
import ListingDetail from "./pages/ListingDetail";
import About from "./pages/About";
import Submit from "./pages/Submit";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

function App() {
  if (!listingsResult.success) {
    return <DataError error={listingsResult.error} />;
  }

  const { listings } = listingsResult;

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home listings={listings} />} />
            <Route
              path="directory"
              element={<Directory listings={listings} />}
            />
            <Route
              path="directory/:id"
              element={<ListingDetail listings={listings} />}
            />
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
