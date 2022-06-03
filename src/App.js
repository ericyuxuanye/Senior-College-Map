import USMap from "./USMap";
import InternationalMap from "./InternationalMap";
import ReactTooltip from "react-tooltip";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import React, { useState } from "react";
import Popup from "reactjs-popup";

function App() {
  const [content, setContent] = useState("");
  const [people, setPeople] = useState("");
  const [college, setCollege] = useState("");
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const popup = (college, image, students) => {
    let result = "";
    if (students.length > 1) {
      for (let i = 0; i < students.length - 1; i++) {
        result += students[i] + ", ";
      }
      result += "and " + students[students.length - 1];
    } else {
      result = students[0];
    }
    setPeople(result);
    setImage(image);
    setCollege(college);
    setOpen(true);
  };
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>US Map</Tab>
          <Tab>International Map</Tab>
        </TabList>
        <TabPanel>
          <USMap setTooltipContent={setContent} popup={popup} />
          <ReactTooltip>{content}</ReactTooltip>
        </TabPanel>
        <TabPanel>
          <InternationalMap setTooltipContent={setContent} popup={popup} />
          <ReactTooltip>{content}</ReactTooltip>
        </TabPanel>
      </Tabs>
      <Popup
        open={open}
        modal
        onClose={() => setOpen(false)}
        position="right center"
      >
        {(close) => (
          <>
            <div className="popup-text">
              <h3>{college}</h3>
              <img src={image} width="500" alt={college} />
              <p>Congratulations {people}!</p>
            </div>
            <button className="popup-close" onClick={close}>
              &#x2715;
            </button>
          </>
        )}
      </Popup>
    </>
  );
}

export default App;
