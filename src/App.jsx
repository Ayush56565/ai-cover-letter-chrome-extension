import { useEffect, useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { PAGES } from "./utils/pages";
import Generator from "./pages/Generator";
import Profile from "./pages/Profile";
import { loadData } from "./utils/localStorage";

function App() {
  const [page, setPage] = useState(PAGES.GENERATOR);
  const [resume, setResume] = useState();
  useEffect(() => {
    const fetchLocalData = async () => {
      const localResume = await loadData("resume");
      setResume(localResume);
    };

    fetchLocalData();
  }, []);

  switch (page) {
    case PAGES.GENERATOR:
      return (
        <Generator setPage={setPage} resume={resume} />
      );

    case PAGES.PROFILE:
      return (
        <Profile
          setPage={setPage}
          setResume={setResume}
          resume={resume}
        />
      );

    default:
      return (
        <Generator setPage={setPage} resume={resume} />
      );
  }
}

export default App;
