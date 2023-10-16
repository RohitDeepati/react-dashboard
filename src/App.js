import { Space } from "antd";
import "./App.css";
// import { AppFooter } from "./Components/AppFooter/AppFooter";
// import { AppHeader } from "./Components/AppHeader/AppHeader";
import { PageContent } from "./Components/PageContent/PageContent";
import { SideMenu } from "./Components/SideMenu/SideMenu";
// import { BasicExample } from "./Pages/Dashboard/db";

function App() {
  return (
    <div className="App">
      {/* <AppHeader /> */}
     
      <Space className="SideMenuAndPageContent">
        <SideMenu />
        <PageContent />
      </Space>
      {/* <AppFooter /> */}
    </div>
  );
}

export default App;
