import { Model } from '@vuex-orm/core'
import Page from './page'

export default class Grid extends Model {
  static entity = 'grids'

  static fields () {
    return {
      id: this.attr(null),
      x: this.attr(0),
      y: this.attr(0),
      width: this.attr(0),
      heigth: this.attr(0),
      page_id: this.attr(null),
      page: this.belongsTo(Page, 'page_id')
    }
  }
}