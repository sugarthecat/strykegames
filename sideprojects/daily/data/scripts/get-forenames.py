# Usage: python get-forenames.py <slug> <iso2>
# Fetches https://forebears.io/<slug>/forenames and parses it with BeautifulSoup.
# iso2 is the country code used in forenames.csv.
import sys
import requests
from bs4 import BeautifulSoup

OUT_FILE = 'scraped-forenames.csv'

if len(sys.argv) < 3:
    print("usage: python get-forenames.py <slug> <iso2>")
    print("example: python get-forenames.py dr-congo CD")
    sys.exit(1)

slug = sys.argv[1]
iso2 = sys.argv[2].upper()
url = f"https://forebears.io/{slug}/forenames"
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

response = requests.get(url, headers=headers, timeout=30)
response.raise_for_status()

soup = BeautifulSoup(response.text, 'html.parser')

# The name data is in the single <table class="forename-table">.
# Columns: Rank | Gender (div.m / div.f widths) | Forename | Incidence | Frequency
table = soup.find('table', class_='forename-table')
rows = table.find_all('tr')[1:]  # skip header row

maleNames = []
femaleNames = []

outFile = open(OUT_FILE, 'w', encoding='utf-8')
for row in rows:
    cells = row.find_all('td')
    if(len(cells) < 3):
        continue
    genderBalance = cells[1]
    if( len(genderBalance) < 2):
        continue
    maleCount = (genderBalance.contents[0]).contents[0]
    femaleCount = (genderBalance.contents[1]).contents[0]

    name = cells[2].contents[0].contents[0]
    if len(maleCount) > len(femaleCount):
        if len(maleNames) >= 10:
            continue
        #male
        maleNames.append(name)
        pass
    elif len(femaleCount) > len(maleCount):
        if len(femaleNames) >= 10:
            continue
        #female
        femaleNames.append(name)
        pass
        

    pass

for name in maleNames:
    outFile.write(f"{name},M,{iso2}\n")
for name in femaleNames:
    outFile.write(f"{name},F,{iso2}\n")
outFile.close()
