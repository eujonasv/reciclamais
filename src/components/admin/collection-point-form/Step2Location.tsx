import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import LocationPickerMap from '@/components/map/LocationPickerMap';
import { LatLngTuple } from 'leaflet';

// Helper function to format address from Nominatim
const formatNominatimAddress = (result: any, searchQuery: string = ""): string => {
  const { address, display_name } = result;
  if (!address) return display_name; // Fallback to full display name

  // Prioritize more specific location types
  const mainName = address.road || address.pedestrian || address.attraction || address.amenity || '';
  
  // 1. Prioritize API's house number
  let houseNumber = address.house_number || '';

  // 2. If no house number from API, try to extract from the user's original search query
  if (!houseNumber) {
    const numbersInQuery = searchQuery.match(/\b\d+\b/);
    if (numbersInQuery) {
      houseNumber = numbersInQuery[0];
    }
  }

  const suburb = address.suburb || address.neighbourhood || ''; // Bairro or vizinhança
  const city = address.city || address.town || address.village || '';
  const state = address.state || '';

  const addressParts = [
    mainName ? `${mainName}${houseNumber ? `, ${houseNumber}` : ''}` : '',
    suburb,
    city
  ].filter(Boolean).join(', ');

  let finalAddress = addressParts;
  if (state) {
    finalAddress = `${addressParts} - ${state}`;
  }

  // If the formatted address is too short or generic, fallback to a more complete version
  if (finalAddress.length < 15 && display_name) {
    const fallbackParts = display_name.split(',').slice(0, 4).join(', ');
    if (fallbackParts.length > finalAddress.length) {
      return fallbackParts;
    }
  }

  return finalAddress || display_name;
};


const Step2Location = () => {
  const { control, setValue, watch } = useFormContext();
  const [showAddressSearch, setShowAddressSearch] = React.useState(false);
  const [searchAddress, setSearchAddress] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState<LatLngTuple | null>(null);

  const latitude = watch('latitude');
  const longitude = watch('longitude');

  React.useEffect(() => {
    if (typeof latitude === 'number' && typeof longitude === 'number' && (latitude !== 0 || longitude !== 0)) {
        if (!selectedLocation || selectedLocation[0] !== latitude || selectedLocation[1] !== longitude) {
            setSelectedLocation([latitude, longitude]);
        }
    }
  }, [latitude, longitude, selectedLocation]);

  const searchForAddress = async () => {
    if (!searchAddress.trim()) return;
    
    setIsSearching(true);
    try {
      // Added addressdetails=1 to get structured address & countrycodes=br to restrict to Brazil
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(searchAddress)}&countrycodes=br`);
      const data = await response.json();
      setSearchResults(data);
      if (data.length > 0) {
        // Automatically select the first result to show on map
        // selectAddress(data[0]);
      }
    } catch (error) {
      console.error("Error searching for address:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const selectAddress = (result: any) => {
    const formattedAddress = formatNominatimAddress(result, searchAddress);
    const { lat, lon } = result;
    const newLocation: LatLngTuple = [parseFloat(lat), parseFloat(lon)];
    
    setValue("address", formattedAddress, { shouldValidate: true });
    setValue("latitude", newLocation[0], { shouldValidate: true });
    setValue("longitude", newLocation[1], { shouldValidate: true });
    
    setSelectedLocation(newLocation);
  };
  
  const handleLocationChange = (lat: number, lng: number) => {
    setValue("latitude", lat, { shouldValidate: true });
    setValue("longitude", lng, { shouldValidate: true });
  };

  const handleConfirmLocation = () => {
    setShowAddressSearch(false);
  };

  const handleSheetOpenChange = (open: boolean) => {
    setShowAddressSearch(open);
    if (!open) {
      setSearchAddress("");
      setSearchResults([]);
      setSelectedLocation(null);
    }
  };


  return (
    <div className="space-y-4 animate-fade-in">
      <Sheet open={showAddressSearch} onOpenChange={handleSheetOpenChange}>
        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Input placeholder="Clique na lupa para buscar..." {...field} />
                </FormControl>
                <SheetTrigger asChild>
                  <Button variant="outline" type="button" className="shrink-0">
                    <Search className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <SheetContent side="right" className="w-full sm:max-w-2xl flex flex-col">
          <SheetHeader>
            <SheetTitle>Buscar e Ajustar Endereço</SheetTitle>
            <SheetDescription>
              Busque por um endereço e arraste o pino no mapa para ajustar a localização exata.
            </SheetDescription>
          </SheetHeader>
          <div className="py-2 space-y-4 flex-grow overflow-y-auto pr-4 -mr-4">
            <div className="flex space-x-2">
              <Input 
                placeholder="Digite um endereço ou local..." 
                value={searchAddress} 
                onChange={(e) => setSearchAddress(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && searchForAddress()}
              />
              <Button onClick={searchForAddress} disabled={isSearching}>
                {isSearching ? "Buscando..." : "Buscar"}
              </Button>
            </div>
            
            {selectedLocation && (
              <div className="space-y-3 pt-2">
                <p className="text-sm text-muted-foreground text-center">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Arraste o pino no mapa para a posição exata.
                </p>
                <LocationPickerMap 
                  location={selectedLocation}
                  onLocationChange={handleLocationChange}
                />
              </div>
            )}

            <div className="space-y-2">
              {searchResults.map((result) => (
                <div 
                  key={result.place_id}
                  className="p-3 border rounded-md hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => selectAddress(result)}
                >
                   <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                    <div className="flex-grow">
                      <p className="text-sm font-medium">{formatNominatimAddress(result, searchAddress)}</p>
                      <p className="text-xs text-muted-foreground capitalize">{result.type}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {searchResults.length === 0 && !isSearching && searchAddress.length > 2 && !selectedLocation && (
                <p className="text-center text-muted-foreground py-4">
                  Nenhum resultado encontrado. Tente um termo de busca diferente.
                </p>
              )}
              
              {isSearching && (
                <div className="text-center py-4 text-muted-foreground">
                  <p>Buscando endereços...</p>
                </div>
              )}
            </div>
          </div>
          <div className="pt-4 mt-auto border-t">
              <Button onClick={handleConfirmLocation} className="w-full">
                Confirmar Localização
              </Button>
          </div>
        </SheetContent>
      </Sheet>
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="any" 
                  placeholder="-25.4284" 
                  {...field}
                  onChange={e => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="any"
                  placeholder="-49.2733" 
                  {...field}
                  onChange={e => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default Step2Location;
