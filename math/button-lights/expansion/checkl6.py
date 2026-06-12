import math
primes = [
    2,2,2,
    3,3,
    5,5,
]
addable = [2,4,3,9,27]
multipliable = [5]
def compress_num(n):
    curr_n = n
    out = 1
    for p in primes:
        if curr_n % p == 0:
            out *= p
            curr_n //= p
    return out

toSearch = [1]
depth = dict()
depth[1] = 0
while len(toSearch) > 0:
    curr = toSearch.pop()
    for a in addable:
        newNum = compress_num(curr + a)
        if newNum not in depth  or (depth[newNum] > depth[curr] + 1):
            depth[newNum] = depth[curr] + 1
            toSearch.append(newNum)
            print(f"{newNum} can be made by adding {a} to {curr}")
    for m in multipliable:
        newNum = compress_num(curr * m)
        if newNum not in depth or (depth[newNum] > depth[curr] + 1):
            depth[newNum] = depth[curr] + 1
            toSearch.append(newNum)
            print(f"{newNum} can be made by multiplying {m} with {curr}")

for i in depth:
    print(f"{i}: {depth[i]}")

print(f"Valid? {math.prod(primes) in depth} ")
