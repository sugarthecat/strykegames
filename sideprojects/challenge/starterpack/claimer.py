class Claimer:
    def __init__(self, graph:dict[list], myVertices: set, oppVertices: set):
        self.oppVertices = oppVertices
        self.myVertices = myVertices
        self.graph = graph

    # Not called when the enemy passes. 
    # Fires on enemy turns, when a valid vertex is submitted.
    def enemyClaimed(self, vertex):
        self.oppVertices.add(vertex)

        
    def claimed(self,vertex):
        self.myVertices.add(vertex)

    def getNextMove(self):
        raise Exception("Not Implemented")