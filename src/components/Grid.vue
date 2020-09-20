<template>
	<div class="grid" :style="gridCssVariables">
		clicked = {{clicked}}
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

		<div class="bottom-grid">
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
		</div>
	</div>
</template>

<script>

export default {
	data () {
		return {
			cells:[
				1,0,0,0,0,1,0,0,0,0,
				1,0,0,0,0,1,0,0,0,0,
				1,0,0,0,0,1,0,0,0,0,
				1,0,0,0,0,1,0,0,0,0,
				1,0,0,0,0,1,0,0,0,0,
				1,0,0,0,0,1,0,0,0,0,
				1,0,0,0,0,1,0,0,0,0,
			],
			columns: [],
			rows: [],
			clicked: false
		}
	},
	props: {
		cellSize: {
			type: Number,
			default: 16,
		},
		width:{
			type: Number,
			default: 10,
		},
		height:{
			type: Number,
			default: 10,
		}
	},
	methods: {
		toggleCell: function(key){
			this.cells[key] == 0 ? this.$set(this.cells, key, 1) : this.$set(this.cells, key, 0);
			this.updateRowsAndColumnsCount();			
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
					cellIndex = (y * this.height) + x
					cell = this.cells[cellIndex];

					console.log(cell)

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
		cellSizeInPx: function(){
			return this.cellSize + "px";
		},
		gridCssVariables: function(){
			return {
				'--grid-cellsize': this.cellSizeInPx
			}
		},
		cellsContainerCss: function(){
			return {
				'width': (this.cellSize * this.width) + "px",
				'height': (this.cellSize * this.height) + "px",
			}
		}
	},
	mounted () {
		this.updateRowsAndColumnsCount();
	},
}
</script>

<style lang="scss" scoped>

	.grid{
		display: flex;
		flex-direction: column;
		justify-content: center;

		.column-count-container{
			display: flex;
			justify-content: end;
			align-items: end;

			.cells-count{
				border-right: solid black 2px;
				width: var(--grid-cellsize);
				box-sizing: border-box;
			}
		}


		.bottom-grid{
			display: flex;
			justify-content: flex-end;
			align-items: flex-start;
			.row-count-container{
				display: flex;
				justify-content: start;
				align-items: end;
				flex-direction: column;

				.cells-count-container{
					border-top: solid black 2px;
					height: var(--grid-cellsize);
					min-width: var(--grid-cellsize);
					box-sizing: border-box;
					display: flex;
					flex-direction: row;
					justify-content: end;
					align-items: center;
					padding-right: calc(var(--grid-cellsize)/4);
				}
			}
		}

		.cells-container{
			border-top: solid black 2px;
			border-left: solid black 2px;

			.cell{  
				cursor: pointer;
				display: inline-block;	
				width: var(--grid-cellsize);
				height: var(--grid-cellsize);
				border-right: solid black 2px;
				border-bottom: solid black 2px;
				box-sizing: border-box;
				color: rgba($color: #000000, $alpha: 0);
				-webkit-user-select: none; /* Safari */        
				-moz-user-select: none; /* Firefox */
				-ms-user-select: none; /* IE10+/Edge */
				user-select: none; /* Standard */
			}
			
			.cell:nth-child(5n){
				border-right: 4px solid black;
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
