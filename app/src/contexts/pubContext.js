import React, {useState} from 'react';
import {pubs} from '../../dummyData';

export const PubsContext = React.createContext({});
export const PubsProvider = PubsContext.Provider;

const PubContainer = ({children}) => {
  const [selectedPub, setSelectedPub] = useState(undefined);
  const [selectedLocation, setSelectedLocation] = useState(undefined);
  const onSelectPub = (pubId) => {
    const pub = pubs.find((p) => p.id === pubId);
    setSelectedPub(pub);
    setSelectedLocation(pub.locations[0]);
  };
  const onSelectLocation = (locationId) => {
    setSelectedLocation(
      selectedPub.locations.find((loc) => loc.id === locationId),
    );
  };
  return (
    <PubsProvider
      value={{
        pubs,
        onSelectPub,
        selectedPub,
        selectedLocation,
        onSelectLocation,
      }}>
      {children}
    </PubsProvider>
  );
};
export default PubContainer;
