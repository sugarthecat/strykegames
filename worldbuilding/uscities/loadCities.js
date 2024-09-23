
async function loadCityData() {
    let data = await (fetch("usCities.json").then(x => x.json()))
    factions = data.factions
    for (let i = 0; i < factions.length; i++) {
        factions[i] = new Faction(factions[i])
    }
    cities = data.cities
    for (let i = 0; i < cities.length; i++) {
        cities[i] = new City(cities[i])
    }
    //connect citieslet borderingCities = []

    for (let i = 0; i < cities.length; i++) {
        let selectedCity = cities[i]
        let allCities = cities.slice()
        allCities.splice(i, 1);
        function compare(a, b) {
            if (adjDist(selectedCity, a) < adjDist(selectedCity, b))
                return -1;
            if (adjDist(selectedCity, a) > adjDist(selectedCity, b))
                return 1;
            return 0;
        }
        allCities.sort(compare);
        let borderingCities = []
        while (allCities.length > 0) {
            //find close city
            let closestCity = allCities.pop()
            borderingCities.push(closestCity)

            let deltaLng = closestCity.lng - selectedCity.lng;
            let deltaLat = closestCity.lat - selectedCity.lat;
            let newCity = { lng: closestCity.lng + deltaLng, lat: closestCity.lat + deltaLat }

            for (let i = 0; i < borderingCities.length; i++) {
                //console.log(newCity.lng, closestCity.lat, selectedCity.lat)
                //console.log(adjDist(newCity,allCities[i]) - adjDist(selectedCity,allCities[i]))
                if (adjDist(newCity, borderingCities[i]) < adjDist(selectedCity, borderingCities[i])) {
                    //console.log('splice')
                    borderingCities.splice(i, 1)
                    i--;
                }
            }
        }
        for (let i = 0; i < borderingCities.length; i++) {
            let borderCity = borderingCities[i]
            if (selectedCity.connections.includes(borderCity)) {
                continue;
            }
            selectedCity.connections.push(borderCity)
            borderCity.connections.push(selectedCity)
        }
    }
    //all cities connected :)

    console.log('loaded')
}