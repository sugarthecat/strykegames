import random
from claimer import Claimer
class RandomClaimer(Claimer):
    def __init__(self, graph:dict[list], myVertices: set, oppVertices: set):
        self.oppVertices = oppVertices
        self.myVertices = myVertices
        self.graph = graph
        
    def getNextMove(self):
        possibleChoices = []
        for vertex in self.graph:
            if vertex in self.oppVertices or vertex in self.myVertices:
                continue
            hasFriendNeighbor = False
            
            adj = self.graph[vertex]
            for v in adj:
                if v in self.myVertices:
                    hasFriendNeighbor = True
            if hasFriendNeighbor:
                possibleChoices.append(vertex)
        if len(possibleChoices) == 0:
            return None

        return random.choice(possibleChoices)