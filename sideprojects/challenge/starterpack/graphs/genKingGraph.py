outFile = open("kings.json",'w')
outFile.write("{\n")
outFile.write("\t\"title\":\"Kings\",\n")
outFile.write("\t\"description\":\"An 8x8 chessboard, where adjacency between cells is determined by being a king's move away.\",\n")
letters = "ABCDEFGH"
numbers = "12345678"
adjList = dict()
for i in range(len(letters)):
    for j in range(len(numbers)):
        mySymbol = letters[i] + numbers[j]
        adjList[mySymbol] = []
        for xp in range(i-1,i+2):
            for yp in range(j-1,j+2):
                if xp == i and yp == j:
                    continue
                if xp < 0 or yp < 0 or xp >= len(letters) or yp >= len(numbers):
                    continue
                adjList[mySymbol].append(letters[xp] + numbers[yp])

outFile.write("\t\"graph\":{\n")
firstElt = True
for key in adjList:
    if not firstElt:
        outFile.write(",\n")
    firstElt = False
    outFile.write(f"\t\t\"{key}\": [\"{"\",\"".join(adjList[key])}\"]")
outFile.write("\t}\n")

outFile.write("}")