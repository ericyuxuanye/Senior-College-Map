import React, { useState } from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
  ZoomableGroup,
} from "react-simple-maps";
import Popup from "reactjs-popup";
import allStates from "./allstates.json";
import colleges from "./us_colleges.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

const USMap = ({ setTooltipContent }) => {
  const [scaleFactor, setScaleFactor] = useState(1);
  const [open, setOpen] = useState(false);
  const [people, setPeople] = useState("");
  const [college, setCollege] = useState("");
  const [image, setImage] = useState("");
  const updatePeople = (students) => {
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
    setOpen(true);
  };
  return (
    <>
      <ComposableMap projection="geoAlbersUsa" data-tip="" style={{outline: "none"}}>
        <ZoomableGroup onMove={({ k }) => setScaleFactor(k)} maxZoom={20}>
          <Geographies geography={geoUrl}>
            {({ geographies }) => (
              <>
                {geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    stroke="#FFF"
                    geography={geo}
                    fill="#DDD"
                    style={{
                      default: {
                        fill: "#DDD",
                        outline: "none",
                      },
                      hover: {
                        /*fill: "#95c99f",*/
                        outline: "none",
                      },
                      pressed: {
                        /*fill: "#1cb828",*/
                        outline: "none",
                      },
                    }}
                  />
                ))}
                {geographies.map((geo) => {
                  const centroid = geoCentroid(geo);
                  const cur = allStates[geo.id];
                  return (
                    <g key={geo.rsmKey + "-name"}>
                      {cur &&
                        centroid[0] > -160 &&
                        centroid[0] < -67 &&
                        (Object.keys(offsets).indexOf(cur) === -1 ? (
                          <Marker coordinates={centroid}>
                            <text y="2" fontSize={8} textAnchor="middle">
                              {cur}
                            </text>
                          </Marker>
                        ) : (
                          <Annotation
                            subject={centroid}
                            dx={offsets[cur][0]}
                            dy={offsets[cur][1]}
                          >
                            <text x={4} fontSize={8} alignmentBaseline="middle">
                              {cur}
                            </text>
                          </Annotation>
                        ))}
                    </g>
                  );
                })}
                {colleges.map(({ college, lat, lng, image, students }) => {
                  return (
                    <Marker
                      onMouseEnter={() => {
                        setTooltipContent(
                          <>
                            <p className="text_center">
                              <b>{college}</b>
                            </p>
                            <img
                              src={image}
                              width="200"
                              alt={college}
                              className="center"
                            />
                          </>
                        );
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      onClick={() => {
                        updatePeople(students);
                        setCollege(college);
                        setImage(image);
                      }}
                      coordinates={[lng, lat]}
                      key={college}
                    >
                      <circle
                        style={{ cursor: "pointer" }}
                        r={5 / scaleFactor}
                        fill="#F00"
                        fillOpacity="0.5"
                      />
                    </Marker>
                  );
                })}
              </>
            )}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <Popup
        open={open}
        modal
        onClose={() => setOpen(false)}
        position="right center"
      >
        {(close) => (
          <div style={{ position: "relative", textAlign: "center" }}>
            <h3>{college}</h3>
            <img src={image} width="500" alt={college} />
            <p>Congratulations {people}!</p>
            <button className="popup-close" onClick={close}>
              ✕
            </button>
          </div>
        )}
      </Popup>
    </>
  );
};

export default USMap;
