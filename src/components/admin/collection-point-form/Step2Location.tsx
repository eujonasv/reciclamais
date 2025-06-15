
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

const Step2Location = () => {
  const { control, setValue } = useFormContext();
  const [showAddressSearch, setShowAddressSearch] = React.useState(false);
  const [searchAddress, setSearchAddress] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);

  const searchForAddress = async () => {
    if (!searchAddress.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching for address:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const selectAddress = (result: any) => {
    const { display_name, lat, lon } = result;
    setValue("address", display_name, { shouldValidate: true });
    setValue("latitude", parseFloat(lat), { shouldValidate: true });
    setValue("longitude", parseFloat(lon), { shouldValidate: true });
    setShowAddressSearch(false);
    setSearchAddress("");
    setSearchResults([]);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <Sheet open={showAddressSearch} onOpenChange={setShowAddressSearch}>
        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Input placeholder="Endereço completo" {...field} />
                </FormControl>
                <SheetTrigger asChild>
                  <Button variant="outline" type="button" className="shrink-0" onClick={() => setShowAddressSearch(true)}>
                    <Search className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <SheetContent side="right" className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Buscar Endereço</SheetTitle>
            <SheetDescription>
              Digite um endereço para obter automaticamente suas coordenadas.
            </SheetDescription>
          </SheetHeader>
          <div className="py-6 space-y-4">
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
            
            <div className="max-h-[70vh] overflow-y-auto space-y-2 pr-2">
              {searchResults.map((result, index) => (
                <div 
                  key={index}
                  className="p-3 border rounded-md hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => selectAddress(result)}
                >
                  <p className="text-sm font-medium">{result.display_name}</p>
                  <div className="flex space-x-2 mt-1">
                    <Badge variant="secondary">
                      Lat: {parseFloat(result.lat).toFixed(6)}
                    </Badge>
                    <Badge variant="secondary">
                      Lon: {parseFloat(result.lon).toFixed(6)}
                    </Badge>
                  </div>
                </div>
              ))}
              
              {searchResults.length === 0 && !isSearching && searchAddress.length > 2 && (
                <p className="text-center text-muted-foreground py-4">
                  Nenhum resultado encontrado.
                </p>
              )}
              
              {isSearching && (
                <div className="text-center py-4 text-muted-foreground">
                  <p>Buscando endereços...</p>
                </div>
              )}
            </div>
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

