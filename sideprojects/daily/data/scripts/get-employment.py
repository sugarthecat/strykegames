# Usage: python get-employment.py
# Fetches employment by sector and unemployment rate (ILO modeled estimates) from the World Bank API.
# Sector values are scaled by the employment rate, so agriculture + industry + services + unemployment = 100.
import requests
import os
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')

OUT_FILE = 'employment.csv'

API = "https://api.worldbank.org/v2"
INDICATORS = {
    'Agriculture': 'SL.AGR.EMPL.ZS',
    'Industry': 'SL.IND.EMPL.ZS',
    'Services': 'SL.SRV.EMPL.ZS',
    'Unemployment': 'SL.UEM.TOTL.ZS',
}

def fetch(path, **params):
    response = requests.get(f"{API}/{path}", params={'format': 'json', 'per_page': 1000, **params}, timeout=30)
    response.raise_for_status()
    return response.json()[1]

# Aggregates like "Arab World" have region id NA
countries = [c['iso2Code'] for c in fetch("country") if c['region']['id'] != 'NA']

values = {code: {} for code in countries}
for name, indicator in INDICATORS.items():
    # mrnev=1 gives the most recent non-empty value per country
    for row in fetch(f"country/all/indicator/{indicator}", mrnev=1):
        code = row['country']['id']
        if code in values and row['value'] is not None:
            values[code][name] = row['value']

outFile = open(os.path.join(DATA_DIR, OUT_FILE), 'w', encoding='utf-8')
outFile.write("iso2," + ",".join(INDICATORS) + "\n")
for code in countries:
    if len(values[code]) < len(INDICATORS):
        print("missing data:", code, values[code])
        continue
    employed = (100 - values[code]['Unemployment']) / 100
    parts = [round(values[code][name] * employed, 2) for name in INDICATORS if name != 'Unemployment']
    parts.append(round(values[code]['Unemployment'], 2))
    outFile.write(code + "," + ",".join(str(p) for p in parts) + "\n")
