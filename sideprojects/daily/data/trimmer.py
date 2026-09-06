file = open('religion.csv','r')
outFile = open('religion2.csv','w')
for line in file.readlines():
    parts = []
    currPart = ""
    inQuotes = False
    for char in line:
        if char == '\"':
            inQuotes = not inQuotes
            continue
        if char == ',' and not inQuotes:
            parts.append(currPart)
            currPart = "" 
            continue
        if char == ',':
            continue
        currPart += char
    if parts[2] == "2010" or parts[-1] == '2' or parts[-1] == '3':
        continue
    parts = parts[1:]
    outFile.write(",".join(parts))
    outFile.write("\n")