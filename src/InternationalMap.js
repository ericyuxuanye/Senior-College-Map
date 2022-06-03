import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import us_colleges from "./us_colleges.json";
import international_colleges from "./international_colleges.json";

const colleges = us_colleges.concat(international_colleges);

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const InternationlMap = ({ setTooltipContent, popup }) => {
  const [scaleFactor, setScaleFactor] = useState(1);
  return (
    <ComposableMap data-tip="" style={{ outline: "none" }}>
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
                  onMouseEnter={() => {
                    const { NAME } = geo.properties;
                    setTooltipContent(NAME);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#DDD",
                      outline: "none",
                    },
                    hover: {
                      fill: "#95c99f",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#1cb828",
                      outline: "none",
                    },
                  }}
                />
              ))}
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
                    onMouseLeave={() => setTooltipContent("")}
                    onClick={() => popup(college, image, students)}
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
  );
};

export default InternationlMap;
