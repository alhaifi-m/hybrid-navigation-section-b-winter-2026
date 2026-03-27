import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import AppCard from "@/components/app-card";
import { theme } from "@/styles/theme";

type Building = {
  id: string;
  title: string;
  description: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
};

const CAMPUS_BUILDINGS: Building[] = [
  {
    id: "heritage",
    title: "Heritage Hall",
    description: "Administration, Registrar, student services",
    coordinate: { latitude: 51.06635, longitude: -114.09225 },
  },
  {
    id: "johnware",
    title: "John Ware Building",
    description: "Business and IT programs, classrooms and labs",
    coordinate: { latitude: 51.06705, longitude: -114.09155 },
  },
  {
    id: "senator",
    title: "Senator Burns Building",
    description: "Trades and technology programs",
    coordinate: { latitude: 51.06575, longitude: -114.09305 },
  },
  {
    id: "stangrad",
    title: "Stan Grad Centre",
    description: "Student association, food court, student lounge",
    coordinate: { latitude: 51.06655, longitude: -114.09085 },
  },
  {
    id: "aldred",
    title: "Aldred Centre",
    description: "Health and public safety programs, simulation labs",
    coordinate: { latitude: 51.06725, longitude: -114.09335 },
  },
  {
    id: "athletics",
    title: "Athletics & Recreation",
    description: "Fitness centre, gym, climbing wall, student locker rooms",
    coordinate: { latitude: 51.06595, longitude: -114.09415 },
  },
];

// The initial map region — centered on SAIT's main campus (1301 16 Ave NW, Calgary)
const CAMPUS_CENTER: Region = {
  latitude: 51.0665,
  longitude: -114.0922,
  latitudeDelta: 0.006, // height of visible map area in degrees (~650m)
  longitudeDelta: 0.006, // width of visible map area in degrees (~500m)
};

const CampusMap = () => {
  const mapRef = useRef<MapView>(null);
  const markerRefs = useRef<
    Record<string, React.ComponentRef<typeof Marker> | null>
  >({});
  const [locationGranted, setLocationGranted] = useState<boolean | undefined>(
    false,
  );
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null,
  );

  const requestLocation = async () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      setLocationGranted(true);
    } else {
      setLocationError(
        "Location permission denied. You can still browse the campus map.",
      );
    }
    setIsLoadingLocation(false);
  };
  useEffect(() => {
    requestLocation();
  });

  const handleBuildingPress = (building: Building) => {
    setSelectedBuilding(building);
    mapRef.current?.animateToRegion(
      {
        latitude: building.coordinate.latitude,
        longitude: building.coordinate.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      },
      500,
    );

    setTimeout(() => {
      markerRefs.current[building.id]?.showCallout();
    }, 600);
  };

  if (isLoadingLocation) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Campus Map</Text>
      {/* Optional: Show soft banner if location was denied */}
      {locationError && (
        <View style={styles.locationBanner}>
          <Ionicons
            name="location-outline"
            size={16}
            color={theme.colors.muted}
          />
          <Text style={styles.locationBannerText}>{locationError}</Text>
        </View>
      )}

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={CAMPUS_CENTER}
          showsUserLocation={locationGranted}
          showsMyLocationButton={false}
        >
          {CAMPUS_BUILDINGS.map((building) => (
            <Marker
              key={building.id}
              ref={(ref) => {
                markerRefs.current[building.id] = ref;
              }}
              coordinate={building.coordinate}
              title={building.title}
              description={building.description}
              onPress={() => handleBuildingPress(building)}
            />
          ))}
        </MapView>

        <Pressable
          style={styles.recenterBtn}
          onPress={() => {
            mapRef.current?.animateToRegion(CAMPUS_CENTER, 600);
          }}
        >
          <Ionicons name="location" size={22} color={theme.colors.primary} />
        </Pressable>
      </View>

      {/* Selected Build deltail Card */}

      {selectedBuilding && (
        <View style={styles.selectedCard}>
          <AppCard
            title={selectedBuilding.title}
            subtitle={selectedBuilding.description}
            right={
              <Pressable onPress={() => setSelectedBuilding(null)}>
                <Ionicons
                  name="close-circle-outline"
                  size={22}
                  color={theme.colors.muted}
                />
              </Pressable>
            }
          />
        </View>
      )}

{/* Building List */}
      {
        <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>Buildings</Text>
            {
                CAMPUS_BUILDINGS.map((building)=>(
                    <Pressable key={building.id} onPress={()=> handleBuildingPress(building)}>
                        <AppCard 
                        title={building.title}
                        subtitle={building.description}
                        right={
                            <Ionicons 
                            name="location-outline"
                            size={20}
                            color={theme.colors.primary}
                            />
                        }
                        />
                    </Pressable>
                ))
            }

        </ScrollView>

      }
    </View>
  );
};

export default CampusMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.bg,
  },
  h1: {
    fontSize: 22,
    fontWeight: "800",
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.screen,
    paddingTop: theme.spacing.screen,
    paddingBottom: 8,
  },
  locationBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginHorizontal: theme.spacing.screen,
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.input,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  locationBannerText: {
    flex: 1,
    fontSize: 13,
    color: theme.colors.muted,
  },
  mapContainer: {
    height: 420,
    marginHorizontal: theme.spacing.screen,
    borderRadius: theme.radius.card,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  map: {
    flex: 1,
  },
  recenterBtn: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectedCard: {
    marginHorizontal: theme.spacing.screen,
    marginTop: 10,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.screen,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
});
