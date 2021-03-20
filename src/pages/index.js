import React from "react";
import loadable from "@loadable/component";

const LoadableEstimateCalc = loadable(() =>
  import("../components/EstimateCalc")
);

const IndexPage = () => {
  return (
    <>
      <LoadableEstimateCalc />
    </>
  );
};

export default IndexPage;
