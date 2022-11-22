import createListComponent from './createListComponent';
import { Props, ScrollToAlign } from './types/list';
const FixedSizeList = createListComponent({
    getItemOffset({ itemSize }: Props<any>, index) {
        return itemSize * index;
    },
    getItemSize({ itemSize }: Props<any>, index) {
        return itemSize;
    },
    /**
     * 获取开始位置的索引
     */
    getStartIndexForOffset({ itemCount, itemSize }: Props<any>, offset) {
        return Math.max(0, Math.min(itemCount - 1, Math.floor(offset / itemSize)));
    },
    /**
     * 获取结束位置的索引
     */
    getStopIndexForStartIndex({ layout, height, width, itemCount, itemSize }: Props<any>, startIndex, scrollOffset) {
        const isHorizontal = layout === 'horizontal';
        const offset = startIndex * itemSize;
        const size = isHorizontal ? width : height;
        const numVisibleItems = Math.ceil((size + scrollOffset - offset) / itemSize);
        return Math.max(0, Math.min(itemCount - 1, startIndex + numVisibleItems - 1));
    },
    /**
     * 获取总的高度或长度
     */
    getEstimatedTotalSize({ itemCount, itemSize }: Props<any>) {
        return itemCount * itemSize;
    },
    getOffsetForIndexAndAlignment({ layout, height, itemSize, itemCount, width }: Props<any>,
        index: number,
        align: ScrollToAlign,
        scrollOffset: number,
        scrollbarSize: number
    ) {
        const isHorizontal = layout === 'horizontal';
        const size = isHorizontal ? width : height;
        const lastItemOffset = Math.max(0, itemCount * itemSize - size);
        const maxOffset = Math.min(lastItemOffset, index * itemSize);
        const minOffset = Math.max(0, index * itemSize - size + itemSize + scrollbarSize);
        if (align === 'smart') {
            if (scrollOffset >= minOffset - size && scrollOffset <= maxOffset + size) {
                align = 'auto';
            } else {
                align = 'center';
            }
        }
        switch (align) {
            case 'start':
                return maxOffset;
            case 'end':
                return minOffset;
            case 'center': {
                // "Centered" offset is usually the average of the min and max.
                // But near the edges of the list, this doesn't hold true.
                const middleOffset = Math.round(
                    minOffset + (maxOffset - minOffset) / 2
                );
                if (middleOffset < Math.ceil(size / 2)) {
                    return 0; // near the beginning
                } else if (middleOffset > lastItemOffset + Math.floor(size / 2)) {
                    return lastItemOffset; // near the end
                } else {
                    return middleOffset;
                }
            }
            case 'auto':
            default:
                if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
                    return scrollOffset;
                } else if (scrollOffset < minOffset) {
                    return minOffset;
                } else {
                    return maxOffset;
                }
        }
    },
    shouldResetStyleCacheOnItemSizeChange: true
});
export default FixedSizeList;