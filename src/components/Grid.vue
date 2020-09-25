<template>
	<div class="grid" :style="gridCssVariables">
		<!-- invisible -->
		<div 
			ref="clickCtrl" 
			class="click-ctrl" 
			v-on:click="toggleGrabbing(gridId)"
			v-if=" grid.grabbing">
		</div> 

		<div class="column-count-container">
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
		
		<div class="row-count-container">
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
				:class="{ 'filled': cells[key] }"
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
				console.log("moving", this.gridId) 
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
		toggleGrabbing: function(gridIndex){
			this.$store.dispatch('book/toggleGrabbingOnGrid', gridIndex )
		},
		toggleCell: function(key){
			if(this.grid.editable){
				this.$store.commit('book/updateCellGrid', { gridId: this.gridId, cellId: key, value: 1 } )
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

				for (let y = 0; y < this.width; y++) {
					var cellIndex = (x * this.width) + y
					var cell = this.cells[cellIndex];
					
					if(cell){
						//if cell is filled increment count
						count++;
					}
					else if(count && !cell){
						this.rows[x].push(count);
						count = 0
						//else if count is more than zero and cell is not filled add to row
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

				for (let y = 0; y < this.height; y++) {
					cellIndex = (y * this.width) + x
					cell = this.cells[cellIndex];

					if(cell){
						count++;
					}
					else if(count && !cell){
						this.columns[x].push(count);
						count = 0
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
		gridCssVariables: function(){
			return {
				'--grid-cellsize': this.cellSizeInCm,
				'--grid-left': (this.grid.position.x) + 'cm',
				'--grid-top': (this.grid.position.y) + 'cm',
				'width': this.cellSize * this.width + 'cm',
			}
		},
		cellsContainerCss: function(){
			return {
				'width': (this.cellSize * this.width + 0.01) + "cm",
				'height': (this.cellSize * this.height + 0.01) + "cm",
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
				background-color: rgb(184, 175, 175);
				// border: solid black 2px;
				width: var(--grid-cellsize);
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				align-items: center;
			}

			.cells-count:nth-child(5n){
				border-right: solid black 4px;
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
				background-color: rgb(184, 175, 175);
				// border: solid black 2px;
				height: var(--grid-cellsize);
				min-width: var(--grid-cellsize);
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				align-items: center;
				padding-right: calc(var(--grid-cellsize)/4);
			}
		}
		
		.cells-container{
			display: flex;
			flex-wrap: wrap;
			// border-top: solid black 2px;
			// border-left: solid black 2px;

			.cell{  
				cursor: pointer;
				display: inline-block;	
				width: var(--grid-cellsize);
				height: var(--grid-cellsize);
				// border: solid black 2px;
				background-color: rgb(184, 175, 175);
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
			.filled{
				background: black;
			}
		}	

		.no-divider-width{
			.cell:nth-child(5n){
				border-right: 2px solid black;
			}
		}
	}
</style>
