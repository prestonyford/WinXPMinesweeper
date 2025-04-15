export enum TileType {
	UNOPENED,
	FLAGGED,
	BOMB,
	NUMBER,
	LOSING_BOMB,
	FALSE_FLAG
}

export type Tile = 
	| { type: TileType.UNOPENED }
	| { type: TileType.FLAGGED }
	| { type: TileType.BOMB }
	| { type: TileType.FLAGGED }
	| { type: TileType.LOSING_BOMB }
	| { type: TileType.FALSE_FLAG }
	| { type: TileType.NUMBER; value: number };
