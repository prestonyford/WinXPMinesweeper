import { TileType, type Tile } from "./TileType";

export default class MinesweeperGame {
	private bombLocations: Set<string>
	private board: Tile[][];

	public constructor(private rows: number, private cols: number, private numBombs: number) {
		this.bombLocations = new Set();
		this.board = this.generateBoard();
	}

	public static BeginnerGame(): MinesweeperGame {
		return new MinesweeperGame(9, 9, 10);
	}

	public static IntermediateGame(): MinesweeperGame {
		return new MinesweeperGame(9, 18, 20);
	}

	private generateBoard(): Tile[][] {
		const board: Tile[][] = [];
		this.bombLocations.clear();

		for (let i = 0; i < this.rows; ++i) {
			board[i] = Array<Tile>(this.cols).fill({ type: TileType.UNOPENED });
		}

		let bombsPlaced = 0;
		while (bombsPlaced < this.numBombs) {
			const row = Math.floor(Math.random() * this.rows);
			const col = Math.floor(Math.random() * this.cols);

			if (!this.bombLocations.has(`${row},${col}`)) {
				this.bombLocations.add(`${row},${col}`);
				++bombsPlaced;
			}
		}

		return board
	}

	private getNeighbors(row: number, col: number): [number, number][] {
		const directions: [number, number][] = [
			[row - 1, col - 1],
			[row - 1, col],
			[row - 1, col + 1],
			[row, col - 1],
			[row, col + 1],
			[row + 1, col - 1],
			[row + 1, col],
			[row + 1, col + 1],
		];

		return directions.filter(([r, c]) => {
			return r >= 0 && r < this.rows && c >= 0 && c < this.cols;
		});
	}
	
	private countNeighborBombs(row: number, col: number): number {
		const neighbors = this.getNeighbors(row, col);
		let bombs = 0;
		for (const [r, c] of neighbors) {
			if (this.bombLocations.has(`${r},${c}`)) {
				++bombs;
			}
		}
		return bombs;
	}

	public chooseTile(row: number, col: number) {
		if (this.bombLocations.has(`${row},${col}`)) {
			console.log("Bomb selected");
			return;
		} else if (this.board[row][col].type === TileType.FLAGGED) {
			return;
		}
		const numNeighborBombs = this.countNeighborBombs(row, col);
		this.board[row][col] = { type: TileType.NUMBER, value: numNeighborBombs };

		// Perform a search on all neighboring 0-tiles
		if (numNeighborBombs === 0) {
			const queue: [number, number][] = [ ...this.getNeighbors(row, col) ];
			const visit = new Set<string>();

			while (queue.length) {
				const [r, c] = queue.pop()!;
				if (visit.has(`${r},${c}`)) {
					continue;
				}
				if (this.bombLocations.has(`${r},${c}`)) {
					continue;
				}
				visit.add(`${r},${c}`);

				const bombs = this.countNeighborBombs(r, c);
				if (bombs === 0) {
					queue.push(...this.getNeighbors(r, c));
				}
				this.board[r][c] = { type: TileType.NUMBER, value: bombs };
			}
		}
	}

	public flagTile(row: number, col: number) {
		if (this.board[row][col].type === TileType.UNOPENED) {
			this.board[row][col] = { type: TileType.FLAGGED };
		}
	}

	public unflagTile(row: number, col: number) {
		if (this.board[row][col].type === TileType.FLAGGED) {
			this.board[row][col] = { type: TileType.UNOPENED };
		}
	}

	public getRows(): number {
		return this.rows;
	}
	public getCols(): number {
		return this.cols;
	}
	public getBoard(): Tile[][] {
		return this.board;
	}
	public getNumBombs(): number {
		return this.numBombs;
	}
}
