import React from "react";
import PickList from "./components/TaskList/PickList";
import Header from "./components/Header/Header";
import HeaderText from "./components/Header/HeaderText";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { useSelector } from "react-redux";
import PackList from "./components/TaskList/PackList";

function App() {
  const view = useSelector((state) => state.task.view);

  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<>Loading..</>}>
        <div className="container" data-testid="app-container">
          <HeaderText>Warehouse Tool</HeaderText>
          <div style={{ maxWidth: 750, width: "100%", margin: "0 auto" }}>
            <Header />
            {view === "picking" ? <PickList /> : <PackList />}
          </div>
        </div>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
