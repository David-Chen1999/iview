export default {
    methods: {
        alignCls (column, row = {}) {
            let cellClassName = '';
            if (row.cellClassName && column.key && row.cellClassName[column.key]) {
                cellClassName = row.cellClassName[column.key];
            }
            return [
                {
                    [`${cellClassName}`]: cellClassName,    // cell className
                    [`${column.className}`]: column.className,    // column className
                    [`${this.prefixCls}-column-${column.align}`]: column.align,
                    [`${this.prefixCls}-hidden`]: (this.fixed === 'left' && column.fixed !== 'left') || (this.fixed === 'right' && column.fixed !== 'right') || (!this.fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right'))
                }
            ];
        },
        isPopperShow (column) {
            return column.filters && ((!this.fixed && !column.fixed) || (this.fixed === 'left' && column.fixed === 'left') || (this.fixed === 'right' && column.fixed === 'right'));
        },
        setCellWidth (column, index, top) {
            let width = '';
            if (column.width) {
                width = column.width;
            } else if (this.columnsWidth[column._index]) {
                width = this.columnsWidth[column._index].width;
            }
            // when browser has scrollBar,set a width to resolve scroll position bug
            if (width && this.columns.length === index + 1 && top && this.$parent.bodyHeight !== 0 && column.fixed!=='left' && !this.fixed) {
                let scrollBarWidth = this.$parent.scrollBarWidth;
                if (!this.$parent.showVerticalScrollBar) scrollBarWidth = 0;
                width += scrollBarWidth;
            }
            // when fixed type,reset first right fixed column's width
            if (this.fixed === 'right' && top ) {
                //const firstFixedIndex = this.columns.lastIndexOf((col) => col.fixed === 'right');
                let lastFixedIndex = -1;
                for(let i=0;i<this.columns.length;i++){
                    if(this.columns[i].fixed==='right'){
                        lastFixedIndex = i;
                    }
                    else{
                        break;
                    }
                }
                if (lastFixedIndex === index) {
                    let scrollBarWidth = this.$parent.scrollBarWidth;
                    if (!this.$parent.showVerticalScrollBar) scrollBarWidth = 0;
                    width += scrollBarWidth;
                }
            }
            if (width === '0') width = '';
            return width;
        }
    }
};
