import { TileType, type Tile } from "./TileType";

export default class MinesweeperGame {
	private bombLocations: Set<string>;
	private flagLocations: Set<string>;
	private numOpenTiles: number;
	private numFlags: number;
	private board: Tile[][];

	public constructor(
		private rows: number,
		private cols: number,
		private numBombs: number,
		private onGameLose: () => void = () => {},
		private onGameWin: () => void = () => {},
	) {
		this.bombLocations = new Set();
		this.flagLocations = new Set();
		this.numOpenTiles = 0;
		this.numFlags = 0;

		if (numBombs > rows * cols) {
			throw new Error("More bombs than tiles");
		}
		this.board = this.generateBoard();
	}

	public static DebugGame(onGameLose: () => void = () => {}, onGameWin: () => void = () => {}): MinesweeperGame {
		return new MinesweeperGame(20, 20, 1, onGameLose, onGameWin);
	}

	public static BeginnerGame(onGameLose: () => void = () => {}, onGameWin: () => void = () => {}): MinesweeperGame {
		return new MinesweeperGame(9, 9, 10, onGameLose, onGameWin);
	}

	public static IntermediateGame(onGameLose: () => void = () => {}, onGameWin: () => void = () => {}): MinesweeperGame {
		return new MinesweeperGame(16, 16, 40, onGameLose, onGameWin);
	}
	
	public static HardGame(onGameLose: () => void = () => {}, onGameWin: () => void = () => {}): MinesweeperGame {
		return new MinesweeperGame(16, 30, 99, onGameLose, onGameWin);
	}

	public static ExtremeGame(onGameLose: () => void = () => {}, onGameWin: () => void = () => {}): MinesweeperGame {
		return new MinesweeperGame(32, 80, 320, onGameLose, onGameWin);
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

	private loseGame(row: number, col: number) {
		for (const bombCoord of this.bombLocations) {
			const [r, c] = bombCoord.split(',').map(num => parseInt(num));
			this.board[r][c] = { type: TileType.BOMB };
		}
		this.board[row][col] = { type: TileType.LOSING_BOMB };

		for (const flagCoord of this.flagLocations) {
			if (!this.bombLocations.has(flagCoord)) {
				const [r, c] = flagCoord.split(',').map(num => parseInt(num));
				this.board[r][c] = { type: TileType.FALSE_FLAG };
			}
		}

		this.onGameLose();
	}

	private checkWin() {
		if (
			this.numOpenTiles + this.numBombs === this.rows * this.cols
			&& this.flagLocations.size === this.bombLocations.size
			&& [...this.flagLocations].every(flag => this.bombLocations.has(flag))
		) {
			this.onGameWin();
		}
	}

	public chooseTile(row: number, col: number) {
		if (this.bombLocations.has(`${row},${col}`)) {
			this.loseGame(row, col);
			return;
		} else if (this.board[row][col].type === TileType.FLAGGED) {
			return;
		}
		const numNeighborBombs = this.countNeighborBombs(row, col);
		this.board[row][col] = { type: TileType.NUMBER, value: numNeighborBombs };
		++this.numOpenTiles;

		this.checkWin();

		// Perform a search on all neighboring 0-tiles
		if (numNeighborBombs === 0) {
			const stack: [number, number][] = this.getNeighbors(row, col);
			const visit = new Set<string>();

			while (stack.length) {
				const [r, c] = stack.pop()!;
				if (visit.has(`${r},${c}`)) {
					continue;
				}
				if (this.bombLocations.has(`${r},${c}`)) {
					continue;
				}
				visit.add(`${r},${c}`);

				const bombs = this.countNeighborBombs(r, c);
				if (bombs === 0) {
					stack.push(...this.getNeighbors(r, c));
				}
				if (
					this.board[r][c].type === TileType.UNOPENED
					|| (this.board[r][c].type === TileType.FLAGGED && !this.bombLocations.has(`${r},${c}`))
				) {
					this.board[r][c] = { type: TileType.NUMBER, value: bombs };
					++this.numOpenTiles;

					if (this.flagLocations.has(`${r},${c}`)){
						this.flagLocations.delete(`${r},${c}`);
						--this.numFlags;
					}
				}
			}
		}
	}

	public flagTile(row: number, col: number) {
		if (this.board[row][col].type === TileType.UNOPENED) {
			this.board[row][col] = { type: TileType.FLAGGED };
			this.flagLocations.add(`${row},${col}`);
			++this.numFlags;
			this.checkWin();
		}
	}

	public unflagTile(row: number, col: number) {
		if (this.board[row][col].type === TileType.FLAGGED) {
			this.board[row][col] = { type: TileType.UNOPENED };
			this.flagLocations.delete(`${row},${col}`);
			--this.numFlags;
			this.checkWin();
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
	public getNumFlags(): number {
		return this.numFlags;
	}
	public getNumOpenTiles(): number {
		return this.numOpenTiles;
	}
}
