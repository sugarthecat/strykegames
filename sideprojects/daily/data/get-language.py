# Usage: python get-forenames.py <slug> <iso2>
# Fetches https://forebears.io/<slug>/forenames and parses it with BeautifulSoup.
# iso2 is the country code used in forenames.csv.
import sys
import requests
from bs4 import BeautifulSoup

OUT_FILE = 'language.csv'

url = "https://www.unicode.org/cldr/charts/48/supplemental/territory_language_information.html"
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

response = requests.get(url, headers=headers, timeout=30)
response.raise_for_status()

soup = BeautifulSoup(response.text, 'html.parser')
soup = soup.findAll('table')[-1]
soup = soup.tbody

def cleanLanguageName(name):
    if '(' in name:
        name = name[:name.index('(')-1]
    if '[' in name:
        name = name[:name.index('[')-1]
    return name

rows = [child for child in soup.contents if len(child) > 5]
currCountry = None
countryLanguages = dict()
for row in rows:
    desc = [r.get_text() for r in row.contents if len(str(r)) > 1]
    if len(desc) > 9:
        #print(desc)
        currCountry = desc[1]
        #print("Country: ",currCountry)
        countryLanguages[currCountry] = []
        desc = desc[3:]
    #print(desc)
    desc[0] = cleanLanguageName(desc[0])
    desc[3] = int(desc[3].replace(",","").replace(".",""))
    print(desc)
    countryLanguages[currCountry].append((desc[0],desc[3],desc[4][:-1]))

file = open("languages.csv",'w',encoding='utf8')
for code in countryLanguages:
    for pair in countryLanguages[code]:
        file.write(f"{code},{pair[0]},{pair[1]},{pair[2]}\n")