<template>
	<div class="grid" :style="gridCssVariables">
		<!-- invisible -->
		<div 
			ref="clickCtrl" 
			class="click-ctrl" 
			v-on:click="toggleGrabbing(gridId)"
			v-if=" grid.grabbing">
		</div> 
		
		<div class="column-count-container" :class="{ bottom: cellCountersPosition.y == 'bottom'}">
			<div 
				class="cells-count"
				v-for="(column, key) in columns"
				:key="'column-'+key">
					<div
						v-for="(countElem, key) in column"
						:key="'count-elem-'+key">
						{{countElem}}
					</div>
			</div>
		</div>
		
		<div class="row-count-container" :class="{ right: cellCountersPosition.x == 'right'}">
			<div 
				class="cells-count-container"
				v-for="(row, key) in rows"
				:key="'row-'+key">

				<div
					v-for="(countElem, key) in row"
					:key="'count-elem-'+key">
					{{countElem}}
				</div>
			</div>
		</div>
		<div 
			class="cells-container"
			:class="{ 'no-divider-width': width <= 5, 'no-divider-height': height <= 5 }"
			:style="cellsContainerCss"
			v-on:mouseleave="clicked = false"
			>

			<div 
				class="cell"
				v-for="(cell, key) in (width*height)"
				:key="'cell-' + key"
				:style="{ 'background': cellBackgroundColor(key) }"
				v-on:click="toggleCell(key)"
				v-on:mouseover="checkClickAndToggleCell(key)"
				v-on:mousedown="clicked = true"
				v-on:mouseup="clicked = false"
				>
				{{cells[key]}}
			</div>
		</div>

		<div class="grid-options" v-if="grid.editable">
			<b v-on:click="toggleGrabbing(gridId)" class="option">Grab</b>
		</div>
	</div>
</template>

<script>

export default {
	data () {
		return {
			columns: [],
			rows: [],
			clicked: false
		}
	},
	watch: {
		mousePos(newValue) {
			if(this.grid.grabbing){
				this.$store.commit('book/updateGridPos', { grid: this.gridId, mousePos: newValue})
			}
		}
	},
	props: {
		grid: {
			type: Object,
			required: true,
		},
		gridId: {
			type: Number,
			required: true,
		}
	},
	methods: {
		cellBackgroundColor: function(key){
			var backgroundColor = null

			if(this.cells[key] != null)
				backgroundColor = this.cells[key]
			else {
				// console.log("this.grid.backgroundColor.style", this.grid.backgroundColor)
				if(this.grid.backgroundColor.style)
					backgroundColor = this.grid.backgroundColor.style
				else
					backgroundColor = "#000"
			}
			
			return backgroundColor
		}, 
		toggleGrabbing: function(gridIndex){
			this.$store.dispatch('book/toggleGrabbingOnGrid', gridIndex )
		},
		toggleCell: function(key){
			if(this.grid.editable){
				console.log("toggleCell")
				this.$store.dispatch('grid/clickedActiveGridCell', { cellId: key } )
				this.updateRowsAndColumnsCount();	
			}		
		},
		checkClickAndToggleCell: function(cellIndex){
			if(this.clicked){
				this.toggleCell(cellIndex);
			}
		},
		updateRowsAndColumnsCount: function(){
			this.columns = [];
			this.rows = [];
			
			var count = 0;

			for (let x = 0; x < this.height; x++) {
				this.rows.push([]);
				count = 0
				var lastColor = null
				for (let y = 0; y < this.width; y++) {
					var cellIndex = (x * this.width) + y
					var cell = this.cells[cellIndex];
					if(cell){
						//if cell is filled increment count
						if(!lastColor){
							count++;
							lastColor = cell
						}
						else{
							if(lastColor == cell){
								count++;
								lastColor = cell
							}
							else{
								this.rows[x].push(count);
								count = 0
								lastColor = null
								count++;
							}
						}
					}
				}

				if(!count && this.rows[x].length == 0){
					this.rows[x].push(0);
				}else if(count){
					this.rows[x].push(count);
				}
			}

			for (let x = 0; x < this.width; x++) {
				this.columns.push([]);
				count = 0
				lastColor = null
				
				for (let y = 0; y < this.height; y++) {
					cellIndex = (y * this.width) + x
					cell = this.cells[cellIndex];

					if(cell){
						//if cell is filled increment count
						if(lastColor == null){
							count++;
							lastColor = cell
						}
						else{
							if(lastColor == cell){
								count++;
								lastColor = cell
							}
							else{
								this.columns[x].push(count);
								count = 0
								lastColor = null
								count++;
							}
						}
					}
				}

				if(!count && this.columns[x].length == 0){
					this.columns[x].push(0);
				}else if(count){
					this.columns[x].push(count);
				}
			}
		}
	},
	computed: {
		initGridPos: function(){
			return this.$store.state.book.initGridPos;
		},
		tempDragPos: function(){
			return this.$store.state.book.tempDragPos;
		},
		cellSizeInCm: function(){
			return this.cellSize + "cm";
		},
		gridBorderWidth: function(){
			if(this.grid.border.visible)
				return this.grid.border.width
			else 
				return 0
		},
		gridCssVariables: function(){
			return {
				'--grid-cellsize': this.cellSizeInCm,
				'--grid-left': (this.gridPosition.x) + 'cm',
				'--grid-top': (this.gridPosition.y) + 'cm',
				'--grid-bg-color': this.grid.backgroundColor.style,
				'--grid-border-width': this.gridBorderWidth + 'px',
				'--grid-border-color': this.grid.border.visible ? this.grid.border.color.style : this.grid.backgroundColor.style,
				'--grid-cells-counter-color': this.grid.cellsCounter.color.style,
				'width': this.cellSize * this.width + 'cm',
			}
		},
		gridPosition: function(){
			var position = {x:0, y:0}
			var pageBorderWidth = this.$store.getters['book/selectedPageObj'].background.border.width;

			position.x = this.grid.position.x + ((pageBorderWidth/2 ) * 0.026458333)
			position.y = this.grid.position.y + ((pageBorderWidth/2 ) * 0.026458333)
			return position
		},
		cellsContainerCss: function(){
			return {
				'width': (this.cellSize * this.width + 0.01 + (this.gridBorderWidth * 0.026458333)) + "cm",
				'height': ((this.cellSize * this.height) + 0.01 + (this.gridBorderWidth * 0.026458333)) + "cm",
			}
		},
		cells: function(){
			return this.grid.cells;
		},
		cellSize: function(){
			return this.$store.getters.['book/selectedPageObj'].cellSize;
		},
		width: function(){
			return this.grid.width;
		},
		height: function(){
			return this.grid.height;
		},
		mousePos: function(){
			return this.$store.state.mousePosition;
		},
		cellCountersPosition: function(){
			if(this.grid.cellsCounter.position){
				return this.grid.cellsCounter.position
			}
			else {
				return {
					x: 'left',
					y: 'top'
				}
			}
		}
	},
	created: function(){
	},
	mounted () {
		this.updateRowsAndColumnsCount();
	},
}
</script>

<style lang="scss" scoped>
	.click-ctrl{
		cursor: grab;
		position: absolute;
		left: 0; top: 0;
		width: 100vw; height: 100vh;
		// background: red;
		// border: solid grey 1px;
		z-index: 10;
	}

	.grid-options{
		background: lemonchiffon;
		position: absolute;
		padding: var(--cell-size);
		left: calc(100% + var(--cell-size));
		top: 0;
		// right: -150%; top:0;
		// text-align: left;

		.option{
			cursor: pointer;
		}
	}

	.grid{
		position: absolute;
		left: var(--grid-left);
		top: var(--grid-top);

		font-family: 'pixel';
		font-size: var(--grid-cellsize);

		.column-count-container{
			position: absolute;
			height: 150px;
			top: -150px;
			left: 0;

			display: flex;
			flex-direction: row;
			justify-content: flex-start;

			align-items: stretch;

			.cells-count{
				width: var(--grid-cellsize);
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				align-items: center;
			}

			&.bottom{
				top: unset;
				bottom: -150px;
				.cells-count{
					justify-content: flex-start;
					align-items: center;
				}
			}
		}

		.grid-bottom{
			position: relative;
		}

		.row-count-container{
			position: absolute;
			width: 150px;
			left: -150px; top: 0;
			display: flex;
			justify-content: flex-start;
			align-items: stretch;
			flex-direction: column;

			.cells-count-container{
				height: var(--grid-cellsize);
				min-width: var(--grid-cellsize);
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				align-items: center;
				> div{
					width: var(--grid-cellsize);
				}
			}

			
			&.right{
				left: unset;
				right: -150px;
				.cells-count-container{
					justify-content: flex-start;
					align-items: center;
				}
			}
		}
		
		.cells-container{
			// background: var(--grid-bg-color);
			display: flex;
			flex-wrap: wrap;
			// border-top: solid black 2px;
			// border-left: solid black 2px;
			border-top: solid var(--grid-border-color) var(--grid-border-width);
			border-left: solid var(--grid-border-color) var(--grid-border-width);
			// border-right: unset; border-bottom: unset; border-left: unset;
			// box-sizing: border-box;

			.cell{  
				cursor: pointer;
				display: inline-block;	
				width: var(--grid-cellsize);
				height: var(--grid-cellsize);
				border: solid var(--grid-border-color) var(--grid-border-width);
				border-left: unset; border-top: unset;
				// background-color: rgb(184, 175, 175);
				box-sizing: border-box;
				color: rgba($color: #000000, $alpha: 0);

				-webkit-user-select: none; /* Safari */        
				-moz-user-select: none; /* Firefox */
				-ms-user-select: none; /* IE10+/Edge */
				user-select: none; /* Standard */
			}
			
			.cell:nth-child(5n){
				// border-right: 4px solid black;
			}
			// .filled{
			// 	background: black;
			// }
		}	

		.no-divider-width{
			.cell:nth-child(5n){
				border-right: 2px solid black;
			}
		}
	}
</style>
