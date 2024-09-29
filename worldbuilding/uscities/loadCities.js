
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
            borderingCities.push(closestCity)
        }
        for (let i = 0; i < borderingCities.length; i++) {
            let borderCity = borderingCities[i]
            if (selectedCity.connections.includes(borderCity)) {
                continue;
            }
            selectedCity.Connect(borderCity);
        }
    }

    //connect 4 and 5-groups
    connectGroups([], 6)
    connectGroups([], 5)
    connectGroups([], 4)
    console.log('loaded')
}
let count = 0
//Establishes nessecary connections that would otherwise not be established. 
function connectGroups(nodes, size) {
    if (nodes.length == 0) {
        for (let i = 0; i < cities.length; i++) {
            connectGroups([cities[i]], size)
        }
    } else if (size == nodes.length) {
        //if the last node does not connect to the first node, cancel.
        if (!nodes[nodes.length - 1].connections.includes(nodes[0])) {
            return;
        }
        //ensure that no 2 are connected that arent next to each other
        let closestNodes = [nodes[0], nodes[2]];
        let closestNodesDist = adjDist(nodes[0], nodes[2]);
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (i == j || (i + 1) % size == j || i == (j + 1) % size) {
                    continue;
                }
                if (nodes[i].connections.includes(nodes[j])) {
                    return;
                }
                if (adjDist(nodes[i], nodes[j]) < closestNodesDist) {
                    closestNodes = [nodes[i], nodes[j]]
                    closestNodesDist = adjDist(nodes[i], nodes[j])
                }
            }
        }
        //ensure there isn't a node that is connected to every single node
        let commonNodes = nodes[0].connections.slice();
        for (let i = 1; i < size; i++) {
            for (let j = 0; j < commonNodes.length; j++) {
                if (!nodes[i].connections.includes(commonNodes[j])) {
                    commonNodes.splice(j, 1);
                    j--;
                }
            }
        }
        if (commonNodes.length > 0) {
            return;
        }

        //Ensure there isn't a shortcut
        if (size > 5) {
            for (let i = 0; i < size; i++) {
                let oconn = nodes[(i + 3) % size].connections
                for (let j = 0; j < oconn.length; j++) {
                    if(nodes[i].connections.includes(oconn[j])){
                        console.log(nodes[i].name, " - ", oconn[j].name, " - ", nodes[(i + 3) % size].name)
                        return;
                    }
                }
            }
        }

        closestNodes[0].Connect(closestNodes[1])
        let nodeNames = []
        for (let i = 0; i < size; i++) {
            nodeNames.push(nodes[i].name)
        }
        //console.log(nodeNames, closestNodes[0].name, closestNodes[1].name, ++count)

    } else {
        let conn = nodes[nodes.length - 1].connections;
        for (let i = 0; i < conn.length; i++) {
            let newNode = conn[i]
            let alrConnected = false;
            for (let j = 0; j + 1 < nodes.length; j++) {
                alrConnected = alrConnected || (newNode == nodes[j])
            }
            if (!alrConnected) {
                let newNodes = nodes.slice()
                newNodes.push(newNode);
                connectGroups(newNodes, size)
            }
        }
    }
}