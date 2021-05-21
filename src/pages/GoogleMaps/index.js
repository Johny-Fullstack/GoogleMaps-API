import React, { useState, useRef } from "react";
import useSwr from "swr";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import "./App.css";

const fetcher = (...args) => fetch(...args).then(response => response.json());

const useGetPoints = () => {
  const { data, error } = useSwr("http://images.contelege.com.br/poi.json", { fetcher });
  const reponsePoints = data && !error ? data : [];

  return reponsePoints.map(point => ({
    type: "Feature",
    properties: { cluster: false, pointId: point.name, category: point.name },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(point.longitude),
        parseFloat(point.latitude)
      ]
    }
  }));
}

const Marker = ({ children }) => children;

export default function GoogleMaps() {
  const mapRef = useRef();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(6);

  const points = useGetPoints();

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 }
  });

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
        defaultCenter={{ lat: -23.31509536897005, lng:-46.57099951314262 }}
        defaultZoom={6}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat
          ]);
        }}
      >
        {clusters.map(cluster => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                lat={latitude}
                lng={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    mapRef.current.setZoom(expansionZoom);
                    mapRef.current.panTo({ lat: latitude, lng: longitude });
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`marker-${cluster.properties.pointId}`}
              lat={latitude}
              lng={longitude}
            >
              <button className="marker">
                <img src="/marker.svg" alt={cluster.properties.pointId}/>
              </button>
            </Marker>
          );
        })}
      </GoogleMapReact>
    </div>
  );
}