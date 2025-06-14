
import React from "react";
import MainLayout from "@/layouts/MainLayout";
import MapSection from "@/components/MapSection";

const MapPage = () => {
  return (
    <MainLayout>
      <div className="pt-16">
        <MapSection />
      </div>
    </MainLayout>
  );
};

export default MapPage;
