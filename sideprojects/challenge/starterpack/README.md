# Claims Starter Pack

## What's in here

```
claimer.py        The Claimer base class your bot extends
evaluator.py      Plays one game between two bots and prints the scores
strategies/       Bots: put yours here
  random.py         Claims a random legal vertex
  encroach.py       Claims the legal vertex closest to the opponent
graphs/           Example graphs, as JSON
```

## Writing a bot

Make a new file in `strategies/`, for example `strategies/mybot.py`, containing one subclass of `Claimer`:

```python
from claimer import Claimer

class MyClaimer(Claimer):
    def getNextMove(self):
        # Return an unclaimed vertex adjacent to one of yours,
        # or None to skip your turn.
        ...
```

The class can have any name. You get:

- `__init__(self, graph, myVertices, oppVertices)` is called once per game.
  - `graph` is a dict mapping each vertex to a list of its neighbors. Edges go both ways.
  - `myVertices` and `oppVertices` are sets of each side's starting vertices.
  - The base class stores these as `self.graph`, `self.myVertices` and `self.oppVertices`.
- `getNextMove(self)` is called on each of your turns.
- `claimed(self, vertex)` is called after each of your valid moves.
- `enemyClaimed(self, vertex)` is called after each of your opponent's valid moves. It is not called when they skip.

By default, `claimed` and `enemyClaimed` add the vertex to `self.myVertices` and `self.oppVertices`.
If you override them, call `super()` or keep track yourself.

Vertices are strings in all the example graphs, but your bot should work with any hashable value.

## Testing

From this folder, run:

```
python evaluator.py <strategy1> <strategy2> <graph>
```

Strategy names are file names in `strategies/` and the graph name is a file name in `graphs/`, all without the extension.
Strategy 1 moves first and starts on the graph's `p1start` vertices. For example:

```
python evaluator.py encroach random states
```

```
Graph: states (48 vertices)
encroach (P1): 31  [0.00s]
random (P2): 17  [0.00s]
```

The time in brackets is how long each bot spent computing.
If a bot goes over 10 seconds in one game, or raises an exception, the evaluator makes random moves for it for the rest of the game.

## Example graphs

| Graph | Vertices | What it is |
|---|---|---|
| `northeast` | 11 | US states from Maryland and Pennsylvania northeast. Small enough to follow by hand. |
| `karate` | 34 | Zachary's karate club, a classic social network. |
| `states` | 48 | The 48 contiguous US states, adjacent if they share a land border. |
| `kings` | 64 | An 8x8 chessboard, adjacent if a king's move apart. |
| `wordlinks` | 143 | English words, adjacent if one is the other with a letter deleted. |
| `squares` | 400 | The integers 1-400, linked to n±1, n², and √n. |
| `binarytree` | 511 | A complete binary tree of depth 8. Vertices are named by their path from the root, like `LRL`. |
| `kingslarge` | 900 | A 30x30 king's-move board. Useful for stress-testing your bot against time constraints. |

Each graph file holds `title`, `description`, `p1start`, `p2start` and `graph`.
To make your own test graph, copy one and edit it. Every edge must be listed from both ends.
