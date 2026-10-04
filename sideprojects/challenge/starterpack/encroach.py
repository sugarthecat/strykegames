from collections import deque
from claimer import Claimer
class EncroachClaimer(Claimer):
    def __init__(self, graph:dict[list], myVertices: set, oppVertices: set):
        self.oppVertices = oppVertices
        self.myVertices = myVertices
        self.graph = graph

    # Distance from each vertex to the nearest opponent vertex.
    def distancesToOpponent(self):
        distances = {vertex: 0 for vertex in self.oppVertices}
        queue = deque(self.oppVertices)
        while queue:
            vertex = queue.popleft()
            for v in self.graph[vertex]:
                if v not in distances:
                    distances[v] = distances[vertex] + 1
                    queue.append(v)
        return distances

    def getNextMove(self):
        distances = self.distancesToOpponent()
        bestChoice = None
        bestDistance = None
        for vertex in self.graph:
            if vertex in self.oppVertices or vertex in self.myVertices:
                continue
            hasFriendNeighbor = False

            adj = self.graph[vertex]
            for v in adj:
                if v in self.myVertices:
                    hasFriendNeighbor = True
            if not hasFriendNeighbor:
                continue

            distance = distances.get(vertex, float("inf"))
            if bestDistance is None or distance < bestDistance:
                bestChoice = vertex
                bestDistance = distance

        return bestChoice
