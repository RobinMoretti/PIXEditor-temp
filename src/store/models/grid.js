import { Model } from '@vuex-orm/core'
// import Page from './page'
import Color from './color'

export default class Grid extends Model {
	static entity = 'grids'

	static fields () {
		return {
			id: this.uid(),

			x: this.attr(0),
			y: this.attr(0),

			width: this.attr(0),
			heigth: this.attr(0),
			
			page_id: this.attr(null),

			dragging: this.attr(false),
			editable: this.attr(false),
			visibility: this.attr(true),
			multicolor: this.attr(false),

			cells: this.attr([]),

			background_color: this.morphOne(Color, 'colorable_id', 'colorable_type'),

			boder_visibility: this.attr(true),
			boder_color: this.morphOne(Color, 'colorable_id', 'colorable_type'),

			cells_counters_color: this.morphOne(Color, 'colorable_id', 'colorable_type'),
			cells_counters_position: this.attr({ x: 'left', y: 'top' }),
		}
	}
}