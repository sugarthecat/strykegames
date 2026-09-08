file = open('religionSrc2.csv','r')
outFile = open('religion.csv','w')
handled = ['India', 'China', "Taiwan"]
biggest = 0
for line in file.readlines():
    parts = []
    currPart = ""
    inQuotes = False
    for char in line:
        if char == '\"':
            inQuotes = not inQuotes
            continue
        if char == ',' and not inQuotes:
            if('<' not in currPart):
                parts.append(currPart.replace("  "," ").replace("  "," ").replace("  "," ").replace("  "," "))
            else:
                parts.append('0')
            currPart = "" 
            continue
        if char == ',':
            continue
        currPart += char
    if parts[1] == '2' or parts[1] == '3' or (parts[3] != '2020' and parts[3] != 'Year'):
        continue
    parts = parts[5:]
    if len(parts[-2]) < 10:
        if int(parts[-2]) > 100000 and parts[0] not in handled:
            print(parts)
            biggest = int(parts[-2])
        elif parts[0] not in handled:
            parts[-2] = '0'
    if( parts[3] != 'Unaffiliated'):
        parts[3] = str(int(parts[3])+1)
    outFile.write(",".join(parts))
    outFile.write("\n")