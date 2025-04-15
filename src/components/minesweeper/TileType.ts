export enum TileType {
	UNOPENED,
	FLAGGED,
	BOMB,
	NUMBER
}

export type Tile = 
	| { type: TileType.UNOPENED }
	| { type: TileType.FLAGGED }
	| { type: TileType.BOMB }
	| { type: TileType.NUMBER; value: number };
