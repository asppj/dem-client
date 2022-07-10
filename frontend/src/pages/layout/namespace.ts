

/// <reference path="index.ts"

export namespace Layout {
	export interface MenuRoute {
		name: string
		path: string
		svg?: React.FC
		children?: MenuRoute[]
	}
}
