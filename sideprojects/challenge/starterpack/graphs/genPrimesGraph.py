import math
outFile = open("squares.json",'w')
outFile.write("{\n")
outFile.write("\t\"title\":\"squares\",\n")
outFile.write("\t\"description\":\"The integers 1 - 400, where n is connected to n+1, n-1, sqrt(n) and n^2, whenever they are in the domain.\",\n")
outFile.write("\t\"p1start\":[\"1\"],\n")
outFile.write("\t\"p2start\":[\"400\"],\n")
adjList = dict()
for i in range(1,401):
    adjList[i] = []
    pSqrt = int(math.sqrt(i))
    if pSqrt*pSqrt == i and i > 1:
        adjList[i].append(pSqrt)
    if i > 1:
        adjList[i].append(i-1)
    if i < 400:
        adjList[i].append(i+1)
    if i*i <= 400 and i > 1:
        adjList[i].append(i*i)
    adjList[i] = [str(k) for k in adjList[i]]

outFile.write("\t\"graph\":{\n")
firstElt = True
for key in adjList:
    if not firstElt:
        outFile.write(",\n")
    firstElt = False
    outFile.write(f"\t\t\"{key}\": [\"{"\",\"".join(adjList[key])}\"]")
outFile.write("\t}\n")

outFile.write("}")