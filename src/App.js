import USMap from "./USMap";
import InternationalMap from "./InternationalMap";
import ReactTooltip from "react-tooltip";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import React, { useState } from "react";

function App() {
  const [content, setContent] = useState("");
  return (
    <Tabs>
      <TabList>
        <Tab>US Map</Tab>
        <Tab>International Map</Tab>
      </TabList>
      <TabPanel>
        <USMap setTooltipContent={setContent} />
        <ReactTooltip>{content}</ReactTooltip>
      </TabPanel>
      <TabPanel>
        <InternationalMap setTooltipContent={setContent} />
        <ReactTooltip>{content}</ReactTooltip>
      </TabPanel>
    </Tabs>
  );
}

export default App;
