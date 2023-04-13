import React from "react";
import {
  getImageTagCounts,
  getImageTagColours,
  getVideoTagCounts,
  getVideoTagColours,
} from "./utils";
import AnalyticsImageBar from "./analyticsbar.image";
import AnalyticsVideoBar from "./analyticsbar.video";

interface AnalyticsBarProps {
  frameData: any;
  assetType: string;
  confidence: number;
  jumpToTimeStamp: Function;
}

const AnalyticsBar = (props: AnalyticsBarProps): JSX.Element => {
  /*
  Potential Improvement/fix
  Bug occurs here where the previous analysed Image/Video will allow an unanalysed Image/Video to bypass
  this condition since I am not overwriting the frameData everytime I click a new Image/Video 
  Probably need to maintain some kind of dictionary of Response, where key is the currentTag and the default value is an empty object
  */
  if (Object.keys(props.frameData).length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "28px"
        }}
      >
        Process data to access Analytics.
      </div>
    );
  }
  let tagCount = {}
  let tagColours = {}
  if (props.assetType === "image") {
    tagCount = getImageTagCounts(props.frameData, props.confidence);
    tagColours = getImageTagColours(props.frameData, props.confidence);
  }
  if (props.assetType === "video") {
    tagCount = getVideoTagCounts(props.frameData, props.confidence);
    tagColours = getVideoTagColours(props.frameData, props.confidence);
  }

  return (
    <>
      {props.assetType === "image" && (
        <AnalyticsImageBar
          tagImageCounts={tagCount}
          tagImageColours={tagColours}
        />
      )}
      {props.assetType === "video" && (
        <AnalyticsVideoBar
          tagVideoCounts={tagCount}
          tagVideoColours={tagColours}
          jumpToTimeStamp={props.jumpToTimeStamp}
        />
      )}
    </>
  );
};

export default AnalyticsBar;
