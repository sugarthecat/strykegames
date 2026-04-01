export default function loadPresetPack(presetPack,endDoc){
    let flagPairs = []
    switch(presetPack){
        case 'ModernEurope':
            flagPairs.push(["rz000000z0z0z1z1xrzdd0000z0z0.33z1z1xrzffcc00z0z0.67z1z1",'Germany'])
            flagPairs.push(["rz193578z0z0z1z1xrzffffffz0z0z1z0.33xrze4181cz0z0.67z1z0.33",'Russia'])
            flagPairs.push(["rz0057b7z0z0z1z1xrzffdd00z0z0.5z1z0.5",'Ukraine'])
            flagPairs.push(["rz002654z0z0z1z1xrzffffffz0.33z0z1z1xrzED2939z0.67z0z1z1",'France'])
            flagPairs.push(["rz008C45z0z0z1z1xrzf4f9ffz0.33z0z1z1xrzCD212Az0.67z0z1z1",'Italy'])
            flagPairs.push(["rzA91F32z0z0z1z1xrzffffffz0z0.33z1z1xrz1E4785z0z0.67z1z1",'Netherlands'])
            flagPairs.push(["rz0008ffz0z0z1z1xrz001eb4z0z0z1z0.111xrzffffffz0z0.111z1z0.111xrz001eb4z0z0.222z1z0.111xrzffffffz0z0.333z1z0.111xrz001eb4z0z0.444z1z0.111xrzffffffz0z0.555z1z0.111xrz001eb4z0z0.666z1z0.111xrzffffffz0z0.777z1z0.111xrz001eb4z0z0.888z1z0.111xrz001eb4z0z0z0.36z0.56xrzffffffz0.14z0z0.07z0.56xrzffffffz0z0.22z0.36z0.111",'Greece'])
            flagPairs.push(["rz009A44z0z0z1z1xrzffffffz0.33z0z1z1xrzFF8200z0.67z0z1z1",'Ireland'])
            flagPairs.push(['rzffffffz0z0z1z1xrzce2939z0z0z1z0.33xrz477050z0z0.67z1z0.33','Hungary'])
            flagPairs.push(['rzffffffz0z0z1z1xrzef3340z0z0z1z0.33xrzef3340z0z0.67z1z0.33','Austria'])
            flagPairs.push(["rz2D2926z0z0z1z1xrzFFCD00z0.33z0z1z1xrzC8102Ez0.67z0z1z1",'Belgium'])
            flagPairs.push(['rzba0c2fz0z0z1z1xrzffffffz0.3z0z0.1z1xrzffffffz0z0.425z1z0.15','Denmark'])
            flagPairs.push(['rz006aa7z0z0z1z1xrzfecc02z0.3z0z0.2z1xrzfecc02z0z0.35z1z0.3','Sweden'])
            flagPairs.push(['rzffffffz0z0z1z1xrzDC143Cz0z0.5z1z0.5','Poland'])
            flagPairs.push(['rzffffffz0z0z1z1xrzd7141az0z0.5z1z0.5xtz11457ez0z0z0.5z0.5z0z1','Czechia'])
            flagPairs.push(['rz002b7fz0z0z1z1xrzfcd116z0.33z0z1z1xrzce1126z0.67z0z1z1','Romania'])
            flagPairs.push(['rzda291cz0z0z1z1xrzffffffz0.2z0.4z0.6z0.2xrzffffffz0.4z0.2z0.2z0.6','Switzerland'])
            flagPairs.push(['rz012169z0z0z1z1xlzffffffz0.12z0z0z1z1xlzffffffz0.12z1z0z0z1xlzc8102ez0.03z-0.1z-0.05z0.5z0.55xlzc8102ez0.03z1.1z1.05z0.5z0.45xlzc8102ez0.03z1.07z-0.1z0.52z0.45xlzc8102ez0.03z-0.07z1.1z0.48z0.55xlzffffffz0.2z0z0.5z1z0.5xlzffffffz0.2z0.5z0z0.5z1xlzc8102ez0.1z0z0.5z1z0.5xlzc8102ez0.1z0.5z0z0.5z1','United Kingdom'])
        break;
        case 'Historical':
            flagPairs.push(['rz012169z0z0z1z1xlzffffffz0.2z0z0z1z1xlzffffffz0.2z1z0z0z1xlzffffffz0.2z0z0.5z1z0.5xlzffffffz0.2z0.5z0z0.5z1xlzc8102ez0.12z0z00.5z1z0.5xlzc8102ez0.12z0.5z0z0.5z1','British Empire'])
            flagPairs.push(['rz0014dcz0z0z1z1xsz2z0.05z0.05z0.3z0.45xsz2z0.65z0.05z0.3z0.45xsz2z0.35z0.5z0.3z0.45','Kingdom of France'])
            flagPairs.push(['rz000000z0z0z1z1xrzffffffz0z0.33z1z1xrzde0000z0z0.67z1z1','German Empire'])
            flagPairs.push(['rz000000z0z0z1z1xrzdeae00z0z0.33z1z1xrzffffffz0z0.67z1z1','Russian Empire'])
            flagPairs.push(['rzffffffz0z0z1z1xrz003884z0z0.67z1z0.33xrzff8400z0z0z1z0.33','Colonial South Africa'])
            flagPairs.push(['rzde0000z0z0z1z1xsz22z0.05z0.05z0.3z0.45','USSR'])
            flagPairs.push(['rzffffffz0z0z1z1xlzdb0101z0.1z0.2z0.1z0.8z0.9xlzdb0101z0.1z0.2z0.9z0.8z0.1','Kingdom of Kongo'])
        break;
        case 'Divisions':
            flagPairs.push(['rz012169z0z0z1z1xlzffffffz0.2z0z0z1z1xlzffffffz0.2z1z0z0z1','Scotland'])
            flagPairs.push(['rzffffffz0z0z1z1xlzc8102ez0.2z0z0.5z1z0.5xlzc8102ez0.2z0.5z0z0.5z1','England'])
            flagPairs.push(['rzffffffz0z0z1z1xrzbf0d3ez0z0.5z1z0.5xrz00205bz0z0z0.35z1xstzffffffz0.175z0.5z0.25z5','Texas'])
            flagPairs.push(['rzffffffz0z0z1z1xlze81b39z0.1z0z0.5z1z0.5xlze81b39z0.1z0z0.8z1z0.8xstze81b39z0.2z0.175z0.15z5xstze81b39z0.5z0.175z0.15z5xstze81b39z0.8z0.175z0.15z5','Washington D.C.'])
        break;
        case 'CentralAsia':
            flagPairs.push(['rz007016z0z0z1z1xrzb80000z0.1z0z0.2z1xczffffffz0.47z0.23z0.08xcz027016z0.45z0.2z0.08xstzffffffz0.41z0.23z0.03z5xstzffffffz0.42z0.14z0.03z5xstzffffffz0.43z0.05z0.03z5xstzffffffz0.48z0.13z0.03z5xstzffffffz0.36z0.15z0.03z5','Turkmenistan'])
            flagPairs.push(['rz00afcaz0z0z1z1xrzfec50cz0.03z0.04z0.1z0.92xczfec50cz0.56z0.39z0.20xrz00afcaz0.2z0z1z0.39xcz00afcaz0.56z0.39z0.15xstzfec50cz0.56z0.39z0.22z30xcz00afffz.56z0.39z0.1xczfec50cz0.56z0.39z0.09','Kazakhstan'])
        break;
        case 'SouthAsia':
            flagPairs.push(['rz115740z0z0z1z1xrzffffffz0z0z0.3z1xczffffffz0.63z0.5z0.22xcz115740z0.69z0.44z0.21xstzffffffz0.76z0.37z0.14z5','Pakistan'])
            flagPairs.push(['rzffffffz0z0z1z1xrz138808z0z0.67z1z0.33xrzff9933z0z0z1z0.33xcz00008az0.5z0.5z0.1xczffffffz0.5z0.5z0.09xstz000080z0.5z0.5z0.13z30xczffffffz0.5z0.5z0.03xcz000080z0.5z0.5z0.02','India'])
        break;
        case 'EastAsia':
            flagPairs.push(["rzffffffz0z0z1z1xczbc002dz0.5z0.5z0.2",'Japan'])
            flagPairs.push(["rzee1c25z0z0z1z1xcsz0z0.05z0.125z0.2z0.3xcsz0z0.25z0.05z0.1z0.15xcsz0z0.3z0.2z0.1z0.15xcsz0z0.25z0.35z0.1z0.15",'China'])
            flagPairs.push(['rzc8102ez0z0z1z1xcsz0z0.3z0.2z0.4z0.6','Vietnam'])
            flagPairs.push(['rzfe0000z0z0z1z1xrz000095z0z0z0.5z0.5xczffffffz0.25z0.25z0.1','Taiwan'])
            flagPairs.push(['rzce1126z0z0z1z1xrz002868z0z0.25z1z0.5xczffffffz0.5z0.5z0.15','Laos'])
            flagPairs.push(['rzff0000z0z0z1z1xrzffffffz0z0.5z1z0.5','Indonesia'])
            flagPairs.push(['rzef3340z0z0z1z1xrzffffffz0z0.16z1z0.67xrz00247dz0z0.33z1z0.33','Thailand'])
        break;
        case 'SouthAmerica':
            flagPairs.push(["rzffffffz0z0z1z1xrzd91023z0z0z0.33z1xrzd91023z0.67z0z0.33z1",'Peru'])
            flagPairs.push(["rzfcd116z0z0z1z1xrz003893z0z0.5z1z0.25xrzce1126z0z0.75z1z0.25",'Colombia'])
            flagPairs.push(["rzda291cz0z0z1z1xrzffffffz0z0z1z0.5xrz0032a0z0z0z0.4z0.5xczffffffz0.2z0.25z0.06",'Chile'])
            flagPairs.push(['rz6cace4z0z0z1z1xrzffffffz0z0.33z1z0.34xczffb81cz0.5z0.5z0.1','Argentina'])
            flagPairs.push(['rz009739z0z0z1z1xtzfedd00z0.5z0.1z0.5z0.9z0.1z0.5xtzfedd00z0.5z0.1z0.5z0.9z0.9z0.5xcz012169z0.5z0.5z0.2xlzffffffz0.07z0.67z0.67z0.32z0.32','Brazil'])
            flagPairs.push(['rz009739z0z0z1z1xtzffffffz0z0z0z1z1z0.5xtzffd100z-0.1z0z-0.1z1z0.9z0.5xtz000000z0z0z0z1z0.5z0.5xtzef3340z-0.1z0z-0.1z1z0.4z0.5','Guyana'])
            break;
        case 'Africa':
            flagPairs.push(['rzffffffz0z0z1z1xrz003082z0z0z1z0.25xrz289728z0z0.5z1z0.25xrzffce00z0z0.75z1z0.25xrzd21034z0.4z0z0.2z1xstzffce00z0.1z0.125z0.1z5','Central African Republic'])
            flagPairs.push(['rz4189ddz0z0z1z1xstzffffffz0.5z0.5z0.3z5','Somalia'])
            flagPairs.push(['rz1b7339z0z0z1z1xrzffffffz0.33z0z0.33z1','Nigeria'])
            flagPairs.push(['rze05206z0z0z1z1xrzffffffz0z0.33z1z1xrz0db02bz0z0.67z1z1xcze05206z0.5z0.5z0.1','Niger'])
            flagPairs.push(['rz1eb53az0z0z1z1xrzffffffz0z0.33z1z1xrz0072c6z0z0.67z1z1','Sierra Leone'])
            flagPairs.push(['rzef3340z0z0z1z1xrz009739z0z0.5z1z0.5xstzffcd00z0.5z0.5z0.23z5','Burkina Faso'])
            flagPairs.push(['rzabcae9z0z0z1z1xrzffffffz0z0.35z1z0.3xrz000000z0z0.4z1z0.2','Botswana'])
            flagPairs.push(['rze03c31z0z0z1z1xrz001489z0z0.5z1z0.5xlzffffffz0.2z0z0.5z1z0.5xlzffffffz0.2z0z0z0.5z0.5xlzffffffz0.2z0z1z0.5z0.5xlz007749z0.12z0z0.5z1z0.5xtz007749z0z-0.1z0z1.1z0.6z0.5xtzffb81cz0z0.1z0z0.9z0.4z0.5xtz000000z0z0.2z0z0.8z0.3z0.5','South Africa'])
        break;
        case 'Organizations':
            flagPairs.push(['rz001489z0z0z1z1xstzffdd00z0.5z0.82z0.06z5xstzffdd00z0.73z0.5z0.06z5xstzffdd00z0.27z0.5z0.06z5xstzffdd00z0.5z0.18z0.06z5xstzffdd00z0.68z0.37z0.06z5xstzffdd00z0.60z0.25z0.06z5xstzffdd00z0.68z0.63z0.06z5xstzffdd00z0.60z0.75z0.06z5xstzffdd00z0.32z0.37z0.06z5xstzffdd00z0.4z0.25z0.06z5xstzffdd00z0.32z0.63z0.06z5xstzffdd00z0.4z0.75z0.06z5','European Union'])
            flagPairs.push(['rz012169z0z0z1z1xlzffffffz0.05z0z0.5z0.3z0.5xlzffffffz0.05z1z0.5z0.7z0.5xlzffffffz0.05z0.5z0z0.5z0.25xlzffffffz0.05z0.5z1z0.5z0.75xczffffffz0.5z0.5z0.15xcz012169z0.5z0.5z0.12xstzffffffz0.5z0.5z0.15z4','NATO'])
            break;
        case 'Pride':
            flagPairs.push(["rz732982z0z0z1z1xrzff8c00z0z0.16z1z0.17xrzffed00z0z0.33z1z0.17xrz008026z0z0.50z1z0.17xrz24408ez0z0.65z1z0.17xrze40303z0z0z1z0.16",'LGBT+ Pride'])
            flagPairs.push(["rz4bcefaz0z0z1z1xrzf5a9b8z0z0.2z1z0.2xrzffffffz0z0.4z1z0.2xrzf5a9b8z0z0.6z1z0.2xrz4bcdfaz0z0.8z1z0.2",'Trans Pride'])
            flagPairs.push(['rzd60273z0z0z1z0.5xrz9b4f96z0z0.4z1z0.2xrz0038a8z0z0.6z1z1','Bi Pride'])
            flagPairs.push(['rzff218cz0z0z1z0.5xrzffd800z0z0.33z1z1xrz21b1ffz0z0.67z1z1','Pan Pride'])
            flagPairs.push(['rz078d70z0z0z1z1xrz26ceaaz0z0.14z1z0.14xrz98eac1z0z0.28z1z0.14xrzffffffz0z0.42z1z0.14xrz7bade2z0z0.56z1z0.14xrz5049ccz0z0.70z1z0.14xrz3d1a78z0z0.84z1z0.2','Gay Pride'])
            flagPairs.push(['rzD52D00z0z0z1z1xrzEF7627z0z0.14z1z0.14xrzFF9A56z0z0.28z1z0.14xrzffffffz0z0.42z1z0.14xrzD162A4z0z0.56z1z0.14xrzB55690z0z0.70z1z0.14xrzA30262z0z0.84z1z0.2','Lesbian Pride'])
            flagPairs.push(['rzfcf434z0z0z1z1xrz2c2c2cz0z0.75z1z0.25xrzffffffz0z0.25z1z0.25xrz9c59d1z0z0.5z1z0.25','Non-Binary Pride'])
        break;
    }
    endDoc.innerHTML = ""
    for(let i = 0; i<flagPairs.length; i++){
        endDoc.innerHTML += "<option value=\""+flagPairs[i][0]+"\">" + flagPairs[i][1] + "</option>"
    }
}