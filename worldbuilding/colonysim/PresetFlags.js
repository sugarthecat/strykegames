export default function loadPresetPack(presetPack, endDoc) {
    let flagPairs = []
    switch (presetPack) {

        case 'WesternEurope':
            flagPairs.push(["rz000000z0z0z1z1xrzdd0000z0z0.33z1z1xrzffcc00z0z0.67z1z1", 'Germany'])
            flagPairs.push(["rz002654z0z0z1z1xrzffffffz0.33z0z1z1xrzED2939z0.67z0z1z1", 'France'])
            flagPairs.push(["rzA91F32z0z0z1z1xrzffffffz0z0.33z1z1xrz1E4785z0z0.67z1z1", 'Netherlands'])
            flagPairs.push(["rz2D2926z0z0z1z1xrzFFCD00z0.33z0z1z1xrzC8102Ez0.67z0z1z1", 'Belgium'])
            flagPairs.push(['rzffffffz0z0z1z1xrzef3340z0z0z1z0.33xrzef3340z0z0.67z1z0.33', 'Austria'])
            flagPairs.push(['rzda291cz0z0z1z1xrzffffffz0.2z0.4z0.6z0.2xrzffffffz0.4z0.2z0.2z0.6', 'Switzerland'])
            flagPairs.push(['rze8213cz0z0z1z1xrzffffffz0z0.33z1z1xrz6cdafez0z0.67z1z1', 'Luxembourg'])
            break;
        case 'NorthernEurope':
            flagPairs.push(['rzba0c2fz0z0z1z1xrzffffffz0.3z0z0.1z1xrzffffffz0z0.425z1z0.15', 'Denmark'])
            flagPairs.push(['rz006aa7z0z0z1z1xrzfecc02z0.3z0z0.2z1xrzfecc02z0z0.35z1z0.3', 'Sweden'])
            flagPairs.push(["rz009A44z0z0z1z1xrzffffffz0.33z0z1z1xrzFF8200z0.67z0z1z1", 'Ireland'])
            flagPairs.push(['rz012169z0z0z1z1xlzffffffz0.12z0z0z1z1xlzffffffz0.12z1z0z0z1xlzc8102ez0.03z-0.1z-0.05z0.5z0.55xlzc8102ez0.03z1.1z1.05z0.5z0.45xlzc8102ez0.03z1.07z-0.1z0.52z0.45xlzc8102ez0.03z-0.07z1.1z0.48z0.55xlzffffffz0.2z0z0.5z1z0.5xlzffffffz0.2z0.5z0z0.5z1xlzc8102ez0.1z0z0.5z1z0.5xlzc8102ez0.1z0.5z0z0.5z1', 'United Kingdom'])
            flagPairs.push(['rz003491z0z0z1z1xlzffffffz0.2z0z0.5z1z0.5xlzffffffz0.2z0.33z0z0.33z1xlzc8102ez0.1z0z0.5z1z0.5xlzc8102ez0.1z0.33z0z0.33z1', 'Iceland'])
            flagPairs.push(['rzecf7fez0z0z1z1xrz001d57z0.27z0z0.2z1xrz001d57z0z0.35z1z0.3', 'Finland'])
            flagPairs.push(['rzc8102ez0z0z1z1xlzffffffz0.2z0z0.5z1z0.5xlzffffffz0.2z0.33z0z0.33z1xlz012169z0.1z0z0.5z1z0.5xlz012169z0.1z0.33z0z0.33z1', 'Norway'])
            flagPairs.push(['rz000000z0z0z1z1xrz193578z0z0z1z0.33xrzffffffz0z0.67z1z0.33', 'Estonia'])
            flagPairs.push(['rzffffffz0z0z1z1xrz883036z0z0z1z0.4xrz883036z0z0.6z1z0.4', 'Latvia'])
            flagPairs.push(['rz477050z0z0z1z1xrzffae00z0z0z1z0.33xrzce2939z0z0.67z1z0.33', 'Lithuania'])
            break;
        case 'SouthernEurope':
            flagPairs.push(["rz008C45z0z0z1z1xrzf4f9ffz0.33z0z1z1xrzCD212Az0.67z0z1z1", 'Italy'])
            flagPairs.push(["rz0008ffz0z0z1z1xrz001eb4z0z0z1z0.111xrzffffffz0z0.111z1z0.111xrz001eb4z0z0.222z1z0.111xrzffffffz0z0.333z1z0.111xrz001eb4z0z0.444z1z0.111xrzffffffz0z0.555z1z0.111xrz001eb4z0z0.666z1z0.111xrzffffffz0z0.777z1z0.111xrz001eb4z0z0.888z1z0.111xrz001eb4z0z0z0.36z0.56xrzffffffz0.14z0z0.07z0.56xrzffffffz0z0.22z0.36z0.111", 'Greece'])
            flagPairs.push(['rzffc800z0z0z1z1xrzee111fz0z0z1z0.33xrzee111fz0z0.67z1z0.33xsz9z0.14z0.27z0.3z0.5', 'Spain'])
            flagPairs.push(['rz008a09z0z0z1z1xrzbd0009z0.33z0z1z1xsz29z0.04z0.1z0.58z0.91xsz9z0.23z0.31z0.2z0.36', 'Portugal'])
            flagPairs.push(['rze21212z0z0z1z1xczffffffz0.34z0.5z0.19xcze21212z0.39z0.5z0.16xstzffffffz0.55z0.5z0.11z5', 'Turkey'])
            flagPairs.push(['rze21212z0z0z1z1xlz000000z0.021z0.5z0.45z0.75z0.33xlz000000z0.021z0.5z0.45z0.26z0.33xlz000000z0.022z0.5z0.475z0.75z0.46xlz000000z0.022z0.5z0.475z0.26z0.46xlz000000z0.05z0.5z0.78z0.5z0.25xlz000000z0.03z0.5z0.35z0.39z0.2xlz000000z0.03z0.5z0.35z0.61z0.2xlz000000z0.03z0.5z0.7z0.4z0.8xlz000000z0.03z0.5z0.7z0.6z0.8xlz000000z0.03z0.5z0.78z0.5z0.88xlz000000z0.023z0.5z0.5z0.75z0.59xlz000000z0.023z0.5z0.5z0.26z0.59xlz000000z0.024z0.5z0.525z0.75z0.7xlz000000z0.024z0.5z0.525z0.26z0.7', 'Albania'])
            flagPairs.push(['rze00000z0z0z1z1xtzffc800z0.5z0.5z0.15z0z-0.15z0xtzffc800z0.5z0.5z0.85z0z1.15z0xtzffc800z0.5z0.5z0.15z1z-0.15z1xtzffc800z0.5z0.5z0.85z1z1.15z1xtzffc800z0.5z0.5z0.41z0z0.59z0xtzffc800z0.5z0.5z0.41z1z0.59z1xtzffc800z0.5z0.5z0z0.39z0z0.61xtzffc800z0.5z0.5z1z0.39z1z0.61xcze00000z0.5z0.5z0.11xczffc800z0.5z0.5z0.09', 'Macedonia'])
            flagPairs.push(['rz0043e0z0z0z1z1xrzffffffz0z0z1z0.33xrze4181cz0z0.67z1z0.33xsz9z0.12z0.21z0.18z0.28', 'Slovenia'])
            flagPairs.push(['rzeb001fz0z0z1z1xrzffffffz0z0.33z1z1xrz003d99z0z0.67z1z1xsz30z0.28z0.08z0.43z0.33xsz9z0.35z0.36z0.29z0.48xrzffffffz0.36z0.375z0.055z0.09xrzeb001fz0.415z0.375z0.055z0.09xrzffffffz0.47z0.375z0.055z0.09xrzeb001fz0.525z0.375z0.055z0.09xrzffffffz0.58z0.375z0.05z0.09xrzeb001fz0.36z0.465z0.055z0.09xrzffffffz0.415z0.465z0.055z0.09xrzeb001fz0.47z0.465z0.055z0.09xrzffffffz0.525z0.465z0.055z0.09xrzeb001fz0.58z0.465z0.05z0.09xrzffffffz0.36z0.555z0.055z0.09xrzeb001fz0.415z0.555z0.055z0.09xrzffffffz0.47z0.555z0.055z0.09xrzeb001fz0.525z0.555z0.055z0.09xrzffffffz0.58z0.555z0.05z0.09xtzeb001fz0.36z0.645z0.415z0.645z0.415z0.77xrzffffffz0.415z0.645z0.11z0.12xrzeb001fz0.47z0.645z0.055z0.09xrzffffffz0.525z0.645z0.055z0.12xtzeb001fz0.58z0.645z0.63z0.645z0.58z0.77xtzffffffz0.398z0.735z0.415z0.735z0.415z0.77xrzeb001fz0.415z0.735z0.055z0.035xtzeb001fz0.415z0.77z0.47z0.77z0.47z0.81xrzffffffz0.47z0.735z0.055z0.075xtzffffffz0.47z0.81z0.525z0.81z0.495z0.83xrze2001ez0.525z0.735z0.055z0.035xtze5001ez0.525z0.77z0.58z0.77z0.525z0.81xtzffffffz0.595z0.735z0.58z0.735z0.58z0.77', 'Croatia'])
            flagPairs.push(['rz21266ez0z0z1z1xtzffc800z0.25z0z0.8z0z0.8z1xstzffffffz0.22z0.1z0.06z5xstzffffffz0.31z0.26z0.06z5xstzffffffz0.4z0.42z0.06z5xstzffffffz0.49z0.58z0.06z5xstzffffffz0.58z0.74z0.06z5xstzffffffz0.67z0.9z0.06z5', 'Bosnia and Herzegovina'])
            flagPairs.push(['rzd5a044z0z0z1z1xrzc92626z0.05z0.05z0.9z0.9xsz17z0.25z0.166z0.5z0.66', 'Montenegro'])
            flagPairs.push(['rz304e91z0z0z1z1xrzbd3d3dz0z0z1z0.33xrzffffffz0z0.67z1z0.33xsz30z0.09z0z0.33z0.5xsz9z0.14z0.36z0.23z0.44', 'Serbia'])
            break;
        case 'EasternEurope':
            flagPairs.push(["rz193578z0z0z1z1xrzffffffz0z0z1z0.33xrze4181cz0z0.67z1z0.33", 'Russia'])
            flagPairs.push(["rz0057b7z0z0z1z1xrzffdd00z0z0.5z1z0.5", 'Ukraine'])
            flagPairs.push(['rzffffffz0z0z1z1xrzDC143Cz0z0.5z1z0.5', 'Poland'])
            flagPairs.push(['rzffffffz0z0z1z1xrzd7141az0z0.5z1z0.5xtz11457ez0z0z0.5z0.5z0z1', 'Czechia'])
            flagPairs.push(['rzffffffz0z0z1z1xrzce2939z0z0z1z0.33xrz477050z0z0.67z1z0.33', 'Hungary'])
            flagPairs.push(['rz002b7fz0z0z1z1xrzfcd116z0.33z0z1z1xrzce1126z0.67z0z1z1', 'Romania'])
            flagPairs.push(['rz537c4bz0z0z1z1xrzffffffz0z0z1z0.33xrze4181cz0z0.67z1z0.33', 'Bulgaria'])
            flagPairs.push(['rz15336fz0z0z1z1xrzfcd116z0.33z0z1z1xrzce1126z0.67z0z1z1xsz9z0.35z0.25z0.3z0.5', 'Moldova'])
            flagPairs.push(['rz0f48ccz0z0z1z1xrzffffffz0z0z1z0.33xrzd72323z0z0.67z1z0.33xtz0f48ccz0.17z0.57z0.47z0.57z0.32z0.8xrzd72323z0.17z0.23z0.3z0.36xlzffffffz0.035z0.32z0.57z0.32z0.25xlzffffffz0.035z0.27z0.33z0.37z0.33xlzffffffz0.035z0.245z0.42z0.395z0.42xcz0f48ccz0.32z0.6z0.07xcz0f48ccz0.42z0.6z0.04xcz0f48ccz0.22z0.6z0.04xlzffffffz0.03z0.164z0.56z0.33z0.82xlzffffffz0.03z0.476z0.56z0.31z0.82xlzffffffz0.03z0.17z0.58z0.17z0.21xlzffffffz0.03z0.47z0.58z0.47z0.21', 'Slovakia'])
            flagPairs.push(['rzce2939z0z0z1z1xrz477050z0.2z0.67z1z0.33xlzffffffz0.02z0z0z0z1xlzffffffz0.02z0.04z0z0.05z1xlzffffffz0.02z0z0z0.2z1xlzffffffz0.02z0.09z0z0.08z1xlzffffffz0.02z0.12z0z0.13z1xlzffffffz0.02z0.17z0z0.16z1xlzffffffz0.02z0.2z0z0.2z1', 'Belarus'])
            break;

        case 'Historical':
            flagPairs.push(['rz012169z0z0z1z1xlzffffffz0.2z0z0z1z1xlzffffffz0.2z1z0z0z1xlzffffffz0.2z0z0.5z1z0.5xlzffffffz0.2z0.5z0z0.5z1xlzc8102ez0.12z0z00.5z1z0.5xlzc8102ez0.12z0.5z0z0.5z1', 'British Empire'])
            flagPairs.push(['rz0014dcz0z0z1z1xsz2z0.05z0.05z0.3z0.45xsz2z0.65z0.05z0.3z0.45xsz2z0.35z0.5z0.3z0.45', 'Kingdom of France'])
            flagPairs.push(['rz000000z0z0z1z1xrzffffffz0z0.33z1z1xrzde0000z0z0.67z1z1', 'German Empire'])
            flagPairs.push(['rz000000z0z0z1z1xrzdeae00z0z0.33z1z1xrzffffffz0z0.67z1z1', 'Russian Empire'])
            flagPairs.push(['rzffffffz0z0z1z1xrz003884z0z0.67z1z0.33xrzff8400z0z0z1z0.33', 'Colonial South Africa'])
            flagPairs.push(['rzde0000z0z0z1z1xsz22z0.05z0.05z0.3z0.45', 'USSR'])
            flagPairs.push(['rzffffffz0z0z1z1xlzdb0101z0.1z0.2z0.1z0.8z0.9xlzdb0101z0.1z0.2z0.9z0.8z0.1', 'Kingdom of Kongo'])
            flagPairs.push(['rze30a17z0z0z1z1xczffffffz0.33z0.5z0.22xcze30a17z0.38z0.5z0.19xstzffffffz0.55z0.5z0.14z5', 'Ottoman Empire'])
            break;
        case 'Divisions':
            flagPairs.push(['rz012169z0z0z1z1xlzffffffz0.2z0z0z1z1xlzffffffz0.2z1z0z0z1', 'Scotland'])
            flagPairs.push(['rzffffffz0z0z1z1xlzc8102ez0.2z0z0.5z1z0.5xlzc8102ez0.2z0.5z0z0.5z1', 'England'])
            flagPairs.push(['rzffffffz0z0z1z1xrzbf0d3ez0z0.5z1z0.5xrz00205bz0z0z0.35z1xstzffffffz0.175z0.5z0.25z5', 'Texas'])
            flagPairs.push(['rzffffffz0z0z1z1xlze81b39z0.1z0z0.5z1z0.5xlze81b39z0.1z0z0.8z1z0.8xstze81b39z0.2z0.175z0.15z5xstze81b39z0.5z0.175z0.15z5xstze81b39z0.8z0.175z0.15z5', 'Washington D.C.'])
            break;
        case 'CentralAsia':
            flagPairs.push(['rz007016z0z0z1z1xrzb80000z0.1z0z0.2z1xczffffffz0.47z0.23z0.08xcz027016z0.45z0.2z0.08xstzffffffz0.41z0.23z0.03z5xstzffffffz0.42z0.14z0.03z5xstzffffffz0.43z0.05z0.03z5xstzffffffz0.48z0.13z0.03z5xstzffffffz0.36z0.15z0.03z5', 'Turkmenistan'])
            flagPairs.push(['rz00afcaz0z0z1z1xrzfec50cz0.03z0.04z0.1z0.92xczfec50cz0.56z0.39z0.20xrz00afcaz0.2z0z1z0.39xcz00afcaz0.56z0.39z0.15xstzfec50cz0.56z0.39z0.22z30xcz00afffz.56z0.39z0.1xczfec50cz0.56z0.39z0.09', 'Kazakhstan'])
            flagPairs.push(['rzffffffz0z0z1z1xrz3081f7z0z0z1z0.33xrz308738z0z0.67z1z0.33xrzee162ez0z0.32z1z0.02xrzee162ez0z0.66z1z0.02xczffffffz0.15z0.16z0.08xcz3081f7z0.18z0.16z0.08xstzffffffz0.21z0.26z0.03z5xstzffffffz0.29z0.26z0.03z5xstzffffffz0.29z0.16z0.03z5xstzffffffz0.37z0.16z0.03z5xstzffffffz0.37z0.26z0.03z5xstzffffffz0.37z0.06z0.03z5xstzffffffz0.45z0.06z0.03z5xstzffffffz0.45z0.16z0.03z5xstzffffffz0.45z0.26z0.03z5xstzffffffz0.53z0.26z0.03z5xstzffffffz0.53z0.16z0.03z5xstzffffffz0.53z0.06z0.03z5', 'Uzbekistan'])
            break;
        case 'MiddleEast':
            flagPairs.push(['rz000000z0z0z1z1xrzffffffz0z0.33z1z1xrz007a3dz0z0.67z1z1xtzce1126z0z1z0.5z0.5z0z0xstzffffffz0.16z0.5z0.12z7', 'Jordan'])
            flagPairs.push(['rz000000z0z0z1z1xrzffffffz0z0.33z1z1xrz007a3dz0z0.67z1z1xtzce1126z0z1z0.5z0.5z0z0', 'Palestine'])
            break;
        case 'SouthAsia':
            flagPairs.push(['rz115740z0z0z1z1xrzffffffz0z0z0.3z1xczffffffz0.63z0.5z0.22xcz115740z0.69z0.44z0.21xstzffffffz0.76z0.37z0.14z5', 'Pakistan'])
            flagPairs.push(['rzffffffz0z0z1z1xrz138808z0z0.67z1z0.33xrzff9933z0z0z1z0.33xcz00008az0.5z0.5z0.1xczffffffz0.5z0.5z0.09xstz000080z0.5z0.5z0.13z30xczffffffz0.5z0.5z0.03xcz000080z0.5z0.5z0.02', 'India'])
            break;
        case 'NorthAmerica':
            flagPairs.push(['rzffffffz0z0z1z1xlzb41240z0.053z0z0.038461538z1z0.038461538xlzb31240z0.053z0z0.19230769z1z0.19230769xlzb31240z0.053z0z0.5z1z0.5xlzb41240z0.053z0z0.65384615z1z0.65384615xlzb41240z0.053z0z0.80769231z1z0.80769231xlzb41240z0.053z0z0.96153846z1z0.96153846xlzb41240z0.053z0z0.34615385z1z0.34615385xrz032d61z0z0z0.45z0.54', 'United States'])
            flagPairs.push(['rzed2939z0z0z1z1xrzffffffz0.2z0z1z1xrzed2939z0.8z0z1z1xstzffffffz0.5z0.52z0.28z5xstzed2939z0.5z0.29z0.16z6xstzed2939z0.37z0.48z0.16z7xstzed2939z0.63z0.48z0.16z7xtzed2939z0.41z0.22z0.46z0.5z0.5z0.33xtzed2939z0.59z0.22z0.54z0.5z0.5z0.33xtzed2939z0.37z0.32z0.5z0.52z0.45z0.65xtzed2939z0.63z0.32z0.5z0.52z0.55z0.65xtzed2939z0.27z0.517z0.41z0.65z0.5z0.5xtzed2939z0.73z0.517z0.59z0.65z0.5z0.5xstzed2939z0.5z0.55z0.3z8xlzffffffz0.04z0.73z0.55z0.61z0.66xlzffffffz0.04z0.27z0.55z0.38z0.66xlzed2939z0.03z0.5z0.5z0.5z0.9xtzffffffz0.44z0.4z0.2z0.15z0.37z0xtzffffffz0.56z0.4z0.8z0.15z0.63z0', 'Canada'])
            flagPairs.push(['rz008c45z0z0z1z1xrzf4f9ffz0.33z0z1z1xrzcd212az0.67z0z1z1xstz663c00z0.5z0.5z0.22z10', 'Mexico'])
            break;
        case 'CentralAmerica':
            flagPairs.push(['rzffffffz0z0z1z1xrz4798d1z0z0z0.33z1xrz4798d1z0.67z0z0.33z1xcz5e8837z0.5z0.53z0.1xczffffffz0.5z0.5z0.085xsz29z0.47z0.41z0.067z0.1xlzb2b9bcz0.01z0.55z0.6z0.45z0.45xlz6c2c18z0.015z0.55z0.6z0.525z0.56xlzd6d9daz0.01z0.45z0.6z0.55z0.45xlz67381bz0.015z0.45z0.6z0.475z0.56xrzdfc76fz0.46z0.515z0.06z0.03xrzf0e396z0.47z0.43z0.06z0.11xrze8d584z0.48z0.415z0.06z0.03xsz19z0.48z0.45z0.045z0.08', 'Guatemala'])
            flagPairs.push(['rz00bae2z0z0z1z1xrzffffffz0z0.33z1z0.34xstz00bae2z0.5z0.5z0.05z5xstz00bae2z0.3z0.4z0.05z5xstz00bae2z0.3z0.6z0.05z5xstz00bae2z0.7z0.4z0.05z5xstz00bae2z0.7z0.6z0.05z5', 'Honduras'])
            flagPairs.push(['rzffffffz0z0z1z1xrz0067c6z0z0z1z0.33xrz0067c6z0z0.67z1z0.33xstzfddb51z0.5z0.5z0.15z40xczffffffz0.5z0.5z0.0725xstzffce00z0.5z0.5z0.1z3xstz5f9a48z0.5z0.5z0.08z3xstz0085bfz0.5z0.48z0.06z3xstz84c4e2z0.5z0.48z0.035z7xstz94173cz0.5z0.48z0.015z6', 'Nicaragua'])
            flagPairs.push(['rz021489z0z0z1z1xrzffffffz0z0.17z1z0.65xrzd9291cz0z0.34z1z0.31', 'Costa Rica'])
            flagPairs.push(['rzffffffz0z0z1z1xstz015293z0.25z0.25z0.12z5xrz015293z0z0.5z0.5z0.5xrzd9121az0.5z0z0.5z0.5xstzd9121az0.75z0.75z0.12z5', 'Panama'])
            flagPairs.push(['rz0146abz0z0z1z1xrzffffffz0z0.3333z1z0.3333xstzffd21fz0.5z0.5z0.15z40xczffffffz0.5z0.5z0.075xcz009600z0.5z0.505z0.065xczffffffz0.5z0.485z0.055xstzf7c601z0.5z0.48z0.08z3xstz37a2edz0.5z0.48z0.06z3xstz579c04z0.5z0.47z0.05z3xstzffffffz0.5z0.46z0.04z3xstze40000z0.5z0.46z0.015z4', 'El Salvador'])
            flagPairs.push(['rzce1127z0z0z1z1xrz003e87z0z0.125z1z0.75xczffffffz0.5z0.5z0.2xcz009600z0.5z0.50z0.17xczffffffz0.5z0.5z0.15xsz7z0.35z0.3z0.3z0.37', 'Belize'])
            break;
        case 'Caribbean':
            flagPairs.push(['rz002590z0z0z1z1xrzffffffz0z0.2z1z0.6xrz00247dz0z0.4z1z0.2xtzce132az0z0z0.45z0.5z0z1xstzffffffz0.13z0.5z0.15z5', 'Cuba'])
            flagPairs.push(['rz00357az0z0z1z1xrzdc143cz0z0.5z1z0.5xrzffffffz0.4z0.4z0.2z0.2xlzd4a00cz0.01z0.5z0.58z0.5z0.45xtz296e37z0.45z0.46z0.55z0.46z0.5z0.42xtz296e37z0.45z0.46z.55z0.46z0.5z0.48xstz296e37z0.5z0.46z0.05z8xtz032e8dz0.5z0.58z0.57z0.52z0.52z0.5xtz032e8dz0.5z0.58z0.43z0.52z0.48z0.5xtz006a0ez0.5z0.56z0.4z0.6z0.6z0.6xlzd9a716z0.01z0.43z0.57z0.57z0.57', 'Haiti'])
            flagPairs.push(['rzc20000z0z0z1z1xlzffffffz0.15z0z0.5z1z0.5xlzffffffz0.15z0.5z0z0.5z1xrz011d5cz0z0z0.425z0.39xrz011d5dz0.575z0.61z0.425z0.39xsz9z0.44z0.41z0.12z0.19', 'Dominican Republic'])
            flagPairs.push(['rz007547z0z0z1z1xtz000000z0z0z0z1z0.5z0.5xtz000000z1z0z1z1z0.5z0.5xlzfdb61cz0.13z0z0z1z1xlzfdb61cz0.13z1z0z0z1', 'Jamaica'])
            flagPairs.push(['rz0072a3z0z0z1z1xrzf7ce1ez0z0.3333z1z0.3333xtz000000z0z0z0.47z0.5z0z1', 'The Bahamas'])
            break;
        case 'EastAsia':
            flagPairs.push(["rzffffffz0z0z1z1xczbc002dz0.5z0.5z0.2", 'Japan'])
            flagPairs.push(["rzee1c25z0z0z1z1xcsz0z0.05z0.125z0.2z0.3xcsz0z0.25z0.05z0.1z0.15xcsz0z0.3z0.2z0.1z0.15xcsz0z0.25z0.35z0.1z0.15", 'China'])
            flagPairs.push(['rzc8102ez0z0z1z1xcsz0z0.3z0.2z0.4z0.6', 'Vietnam'])
            flagPairs.push(['rzfe0000z0z0z1z1xrz000095z0z0z0.5z0.5xczffffffz0.25z0.25z0.1', 'Taiwan'])
            flagPairs.push(['rzce1126z0z0z1z1xrz002868z0z0.25z1z0.5xczffffffz0.5z0.5z0.15', 'Laos'])
            flagPairs.push(['rzff0000z0z0z1z1xrzffffffz0z0.5z1z0.5', 'Indonesia'])
            flagPairs.push(['rzef3340z0z0z1z1xrzffffffz0z0.16z1z0.67xrz00247dz0z0.33z1z0.33', 'Thailand'])
            break;
        case 'SouthAmerica':
            flagPairs.push(["rzffffffz0z0z1z1xrzd91023z0z0z0.33z1xrzd91023z0.67z0z0.33z1", 'Peru'])
            flagPairs.push(["rzfcd116z0z0z1z1xrz003893z0z0.5z1z0.25xrzce1126z0z0.75z1z0.25", 'Colombia'])
            flagPairs.push(["rzda291cz0z0z1z1xrzffffffz0z0z1z0.5xrz0032a0z0z0z0.4z0.5xczffffffz0.2z0.25z0.06", 'Chile'])
            flagPairs.push(['rz6cace4z0z0z1z1xrzffffffz0z0.33z1z0.34xczffb81cz0.5z0.5z0.1', 'Argentina'])
            flagPairs.push(['rz009739z0z0z1z1xtzfedd00z0.5z0.1z0.5z0.9z0.1z0.5xtzfedd00z0.5z0.1z0.5z0.9z0.9z0.5xcz012169z0.5z0.5z0.2xlzffffffz0.07z0.67z0.67z0.32z0.32', 'Brazil'])
            flagPairs.push(['rz009739z0z0z1z1xtzffffffz0z0z0z1z1z0.5xtzffd100z-0.1z0z-0.1z1z0.9z0.5xtz000000z0z0z0z1z0.5z0.5xtzef3340z-0.1z0z-0.1z1z0.4z0.5', 'Guyana'])
            flagPairs.push(['rzffffffz0z0z1z0.12xrz0035a9z0z0.12z1z0.11xrzffffffz0z0.23z1z0.11xrz0035a9z0z0.34z1z0.11xrzffffffz0z0.45z1z0.11xrz0035a9z0z0.56z1z0.11xrzffffffz0z0.67z1z0.11xrz0035a9z0z0.78z1z0.11xrzffffffz0z0.89z1z0.11xrzffffffz0z0z0.4z0.56xstzfcd20fz0.19z0.28z0.2z16', 'Uruguay'])
            flagPairs.push(['rz347f3dz0z0z1z1xrzffffffz0z0.2z1z0.6xrzb50329z0z0.3z1z0.4xstzecc917z0.5z0.515z0.2z5', 'Suriname'])
            break;
        case 'Africa':
            flagPairs.push(['rzffffffz0z0z1z1xrz003082z0z0z1z0.25xrz289728z0z0.5z1z0.25xrzffce00z0z0.75z1z0.25xrzd21034z0.4z0z0.2z1xstzffce00z0.1z0.125z0.1z5', 'Central African Republic'])
            flagPairs.push(['rz4189ddz0z0z1z1xstzffffffz0.5z0.5z0.3z5', 'Somalia'])
            flagPairs.push(['rz1b7339z0z0z1z1xrzffffffz0.33z0z0.33z1', 'Nigeria'])
            flagPairs.push(['rze05206z0z0z1z1xrzffffffz0z0.33z1z1xrz0db02bz0z0.67z1z1xcze05206z0.5z0.5z0.1', 'Niger'])
            flagPairs.push(['rz1eb53az0z0z1z1xrzffffffz0z0.33z1z1xrz0072c6z0z0.67z1z1', 'Sierra Leone'])
            flagPairs.push(['rzef3340z0z0z1z1xrz009739z0z0.5z1z0.5xstzffcd00z0.5z0.5z0.23z5', 'Burkina Faso'])
            flagPairs.push(['rzabcae9z0z0z1z1xrzffffffz0z0.35z1z0.3xrz000000z0z0.4z1z0.2', 'Botswana'])
            flagPairs.push(['rze03c31z0z0z1z1xrz001489z0z0.5z1z0.5xlzffffffz0.2z0z0.5z1z0.5xlzffffffz0.2z0z0z0.5z0.5xlzffffffz0.2z0z1z0.5z0.5xlz007749z0.12z0z0.5z1z0.5xtz007749z0z-0.1z0z1.1z0.6z0.5xtzffb81cz0z0.1z0z0.9z0.4z0.5xtz000000z0z0.2z0z0.8z0.3z0.5', 'South Africa'])
            flagPairs.push(['rz00a4dez0z0z1z1xtz18b637z0z0z1z0z0z1xlzfcd20fz0.27z1z0z0z1xlz000000z0.20z1z0z0z1', 'Tanzania'])
            flagPairs.push(['rz009b42z0z0z1z1xtz002b6cz0z0z1z0z0z1xlzffffffz0.26z1z0z0z1xlzc9072az0.20z1z0z0z1xstzffce00z0.17z0.25z0.2z12xcz002b6cz0.17z0.25z0.065xczffce00z0.17z0.25z0.052', 'Namibia'])
            flagPairs.push(['rz198a19z0z0z1z1xrz198a19z0z0z1z0.2xrzebee11z0z0.2z1z0.2xrz198a19z0z0.4z1z0.2xrzebee11z0z0.6z1z0.2xrzcd1818z0z0z0.5z0.6xstzffffffz0.25z0.3z0.2z5', 'Togo'])
            flagPairs.push(['rz41b125z0z0z1z1xrz3f90dfz0z0.5z1z0.5xtze50027z0z0z0z1z1z0.5xstzffc828z0.25z0.5z0.2z5', 'Eritrea'])
            flagPairs.push(['rz078930z0z0z1z1xrzfcdd09z0z0.33z1z1xrzda121az0z0.67z1z1xsz8z0.3z0.25z0.35z0.5', 'Ethiopia'])
            flagPairs.push(['rz007b5ez0z0z1z1xrzcf0921z0.33z0z1z1xrzfcd20fz0.67z0z1z1xstzfcd20fz0.5z0.5z0.15z5', 'Cameroon'])
            flagPairs.push(['rz002664z0z0z1z1xrzfecb00z0.33z0z1z1xrzc60c30z0.67z0z1z1', 'Chad'])
            flagPairs.push(['rz0cb637z0z0z1z1xrzfcd20fz0.33z0z1z1xrzcf0921z0.67z0z1z1', 'Mali'])
            flagPairs.push(['rz3c9b00z0z0z1z1xrzffffffz0z0.33z1z1xrze41b11z0z0.67z1z1xtz0074cfz0z0z0z1z0.3z0.5', 'Equatorial Guinea'])
            break;
        case 'NorthAfrica':
            flagPairs.push(['rze8000bz0z0z1z1xrz000000z0z0.25z1z1xrz1d9f44z0z0.75z1z1xczffffffz0.45z0.5z0.1xcz000000z0.48z0.5z0.08xstzffffffz0.55z0.5z0.1z5', 'Libya'])
            flagPairs.push(['rzd30731z0z0z1z1xrzffffffz0z0.33z1z1xrz000000z0z0.67z1z1xtz007324z0z1z0.5z0.5z0z0', 'Sudan'])
            break;
        case 'Organizations':
            flagPairs.push(['rz001489z0z0z1z1xstzffdd00z0.5z0.82z0.06z5xstzffdd00z0.73z0.5z0.06z5xstzffdd00z0.27z0.5z0.06z5xstzffdd00z0.5z0.18z0.06z5xstzffdd00z0.68z0.37z0.06z5xstzffdd00z0.60z0.25z0.06z5xstzffdd00z0.68z0.63z0.06z5xstzffdd00z0.60z0.75z0.06z5xstzffdd00z0.32z0.37z0.06z5xstzffdd00z0.4z0.25z0.06z5xstzffdd00z0.32z0.63z0.06z5xstzffdd00z0.4z0.75z0.06z5', 'European Union'])
            flagPairs.push(['rz012169z0z0z1z1xlzffffffz0.05z0z0.5z0.3z0.5xlzffffffz0.05z1z0.5z0.7z0.5xlzffffffz0.05z0.5z0z0.5z0.25xlzffffffz0.05z0.5z1z0.5z0.75xczffffffz0.5z0.5z0.15xcz012169z0.5z0.5z0.12xstzffffffz0.5z0.5z0.15z4', 'NATO'])
            break;
        case 'Pride':
            flagPairs.push(["rz732982z0z0z1z1xrzff8c00z0z0.16z1z0.17xrzffed00z0z0.33z1z0.17xrz008026z0z0.50z1z0.17xrz24408ez0z0.65z1z0.17xrze40303z0z0z1z0.16", 'LGBT+ Pride'])
            flagPairs.push(["rz4bcefaz0z0z1z1xrzf5a9b8z0z0.2z1z0.2xrzffffffz0z0.4z1z0.2xrzf5a9b8z0z0.6z1z0.2xrz4bcdfaz0z0.8z1z0.2", 'Trans Pride'])
            flagPairs.push(['rzd60273z0z0z1z0.5xrz9b4f96z0z0.4z1z0.2xrz0038a8z0z0.6z1z1', 'Bi Pride'])
            flagPairs.push(['rzff218cz0z0z1z0.5xrzffd800z0z0.33z1z1xrz21b1ffz0z0.67z1z1', 'Pan Pride'])
            flagPairs.push(['rz078d70z0z0z1z1xrz26ceaaz0z0.14z1z0.14xrz98eac1z0z0.28z1z0.14xrzffffffz0z0.42z1z0.14xrz7bade2z0z0.56z1z0.14xrz5049ccz0z0.70z1z0.14xrz3d1a78z0z0.84z1z0.2', 'Gay Pride'])
            flagPairs.push(['rzD52D00z0z0z1z1xrzEF7627z0z0.14z1z0.14xrzFF9A56z0z0.28z1z0.14xrzffffffz0z0.42z1z0.14xrzD162A4z0z0.56z1z0.14xrzB55690z0z0.70z1z0.14xrzA30262z0z0.84z1z0.2', 'Lesbian Pride'])
            flagPairs.push(['rzfcf434z0z0z1z1xrz2c2c2cz0z0.75z1z0.25xrzffffffz0z0.25z1z0.25xrz9c59d1z0z0.5z1z0.25', 'Non-Binary Pride'])
            break;
    }
    endDoc.innerHTML = ""
    for (let i = 0; i < flagPairs.length; i++) {
        endDoc.innerHTML += "<option value=\"" + flagPairs[i][0] + "\">" + flagPairs[i][1] + "</option>"
    }
}