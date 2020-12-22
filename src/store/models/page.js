import { Model } from '@vuex-orm/core'
import Grid from './grid'

export default class Page extends Model {
  static entity = 'pages'

  static fields () {
    return {
      id: this.attr(null),
      title: this.attr(null),
      grids: this.hasMany(Grid, 'page_id'),
    }
  }
}