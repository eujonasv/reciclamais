
import React from "react";
import FullscreenMapHeader from "@/components/map/FullscreenMapHeader";
import FullscreenMap from "@/components/map/FullscreenMap";

const MapPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <FullscreenMapHeader />
      <FullscreenMap />
    </div>
  );
};

export default MapPage;
