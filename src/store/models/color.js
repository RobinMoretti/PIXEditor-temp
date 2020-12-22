import { Model } from '@vuex-orm/core'

export default class Color extends Model {
	static entity = 'grids'

	static fields () {
		return {
			red: this.attr(150),
			green: this.attr(150),
			blue: this.attr(150),
			alpha: this.attr(1),
			style: this.attr('rgb(255,255,255)'),
			colorable_id: this.attr(null),
			colorable_type: this.attr(null),
		}
	}
}