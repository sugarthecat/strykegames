import os

for f in os.listdir("idf\\hacking"):
    print(f)

file = open("idf/hacking/allwords.txt","r")
lines = file.readlines()
file.close()

file = open("words.txt",'w')
for line in lines:
    if(len(line) > 4):
        file.write(line)
file.close()