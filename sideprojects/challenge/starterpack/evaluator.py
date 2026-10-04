import importlib.util
import inspect
import json
import os
import random
import sys
import time
import traceback

from claimer import Claimer

TIME_LIMIT = 30  # seconds of computing time per bot per game
HERE = os.path.dirname(os.path.abspath(__file__))


# Loads strategies/<name>.py and returns the Claimer subclass defined in it.
def loadStrategy(name):
    path = os.path.join(HERE, "strategies", name + ".py")
    # Load under a prefixed module name so files like random.py don't shadow the standard library.
    spec = importlib.util.spec_from_file_location("strategy_" + name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    for _, cls in inspect.getmembers(module, inspect.isclass):
        if issubclass(cls, Claimer) and cls is not Claimer and cls.__module__ == module.__name__:
            return cls
    raise Exception("No Claimer subclass found in " + path)


def loadGraph(name):
    with open(os.path.join(HERE, "graphs", name + ".json")) as file:
        return json.load(file)


def legalMoves(graph, owner, player):
    return [v for v in graph if owner[v] is None and any(owner[n] == player for n in graph[v])]


class Player:
    def __init__(self, name, cls, graph, myVertices, oppVertices):
        self.name = name
        self.timeUsed = 0
        self.failed = False  # once true, the evaluator plays random moves for this bot
        self.bot = None
        # Each bot gets its own copies, so it can't modify the real game state.
        self.call(lambda: setattr(self, "bot", cls({v: list(n) for v, n in graph.items()}, set(myVertices), set(oppVertices))))

    # Runs a call to the bot, charging its time and marking it failed on a crash or timeout.
    def call(self, fn):
        if self.failed:
            return None
        start = time.perf_counter()
        try:
            result = fn()
        except Exception:
            print(self.name + " crashed; random moves from here on.")
            traceback.print_exc()
            self.failed = True
            return None
        self.timeUsed += time.perf_counter() - start
        if self.timeUsed > TIME_LIMIT:
            print(self.name + " exceeded " + str(TIME_LIMIT) + "s; random moves from here on.")
            self.failed = True
            return None
        return result


def playGame(cls1, cls2, data, name1, name2):
    graph = data["graph"]
    owner = {v: None for v in graph}
    for v in data["p1start"]:
        owner[v] = 0
    for v in data["p2start"]:
        owner[v] = 1

    players = [
        Player(name1, cls1, graph, data["p1start"], data["p2start"]),
        Player(name2, cls2, graph, data["p2start"], data["p1start"]),
    ]

    turn = 0  # player 1 goes first
    skipsInARow = 0
    while skipsInARow < 2:
        player, opponent = players[turn], players[1 - turn]
        moves = legalMoves(graph, owner, turn)
        move = player.call(player.bot.getNextMove)
        if player.failed:
            move = random.choice(moves) if moves else None

        if move in moves:
            owner[move] = turn
            player.call(lambda: player.bot.claimed(move))
            opponent.call(lambda: opponent.bot.enemyClaimed(move))
            skipsInARow = 0
        else:
            skipsInARow += 1
        turn = 1 - turn

    return [sum(1 for v in owner if owner[v] == p) for p in (0, 1)], players


def main():
    if len(sys.argv) != 4:
        print("Usage: python evaluator.py <strategy1> <strategy2> <graph>")
        print("Example: python evaluator.py encroach random kings")
        sys.exit(1)
    name1, name2, graphName = sys.argv[1:]

    data = loadGraph(graphName)
    scores, players = playGame(loadStrategy(name1), loadStrategy(name2), data, name1 + " (P1)", name2 + " (P2)")

    print("Graph: " + data.get("title", graphName) + " (" + str(len(data["graph"])) + " vertices)")
    for player, score in zip(players, scores):
        print(player.name + ": " + str(score) + "  [" + format(player.timeUsed, ".2f") + "s]")


if __name__ == "__main__":
    main()
