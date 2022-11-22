import { memo, useEffect, createElement, useCallback, useState, useRef } from "react"
import {
    Props, State, GetItemOffset, GetEstimatedTotalSize, GetItemSize,
    GetOffsetForIndexAndAlignment, GetStartIndexForOffset, GetStopIndexForStartIndex, InitInstanceProps,
    ValidateProps,
    ScrollEvent
} from "./types/list"
const IS_SCROLLING_DEBOUNCE_INTERVAL = 150;
const defaultItemKey = (index: number, data?: any) => index;
const createListComponent = ({
    getItemOffset,
    getEstimatedTotalSize,
    getItemSize,
    getOffsetForIndexAndAlignment,
    getStartIndexForOffset,
    getStopIndexForStartIndex,
    // initInstanceProps,
    shouldResetStyleCacheOnItemSizeChange,
    // validateProps,
}: {
    getItemOffset: GetItemOffset,
    getEstimatedTotalSize: GetEstimatedTotalSize,
    getItemSize: GetItemSize,
    getOffsetForIndexAndAlignment: GetOffsetForIndexAndAlignment,
    getStartIndexForOffset: GetStartIndexForOffset,
    getStopIndexForStartIndex: GetStopIndexForStartIndex,
    // initInstanceProps: InitInstanceProps,
    shouldResetStyleCacheOnItemSizeChange: boolean,
    // validateProps: ValidateProps,
}) => {
    function List<T>(props: Props<T>) {
        const {
            outerElementType = 'div',
            innerElementType = 'div',
            layout = 'vertical',
            direction = 'ltr',
            overscanCount = 2,
            itemCount,
            useIsScrolling = false,
            className,
            height,
            width,
            style,
            initialScrollOffset,
            itemData,
            itemKey = defaultItemKey,
            children,
        } = props;
        const [state, setState] = useState<State>({
            isScrolling: false,
            scrollDirection: 'forward',
            scrollOffset:
                typeof initialScrollOffset === 'number'
                    ? initialScrollOffset
                    : 0,
            scrollUpdateWasRequested: false
        });
        const { isScrolling, scrollDirection, scrollOffset, scrollUpdateWasRequested } = state;
        const ref = useRef<{
            itemStyleCache: any
            timeoutId: any
        }>({
            itemStyleCache: {},
            timeoutId: null
        })
        const isHorizontal = layout === 'horizontal';
        const onScrollHorizontal = (event: ScrollEvent) => {
            const { clientWidth, scrollLeft, scrollWidth } = event.currentTarget;
            setState(prevState => {
                if (prevState.scrollOffset === scrollLeft) {
                    return prevState;
                }
                const scrollOffset = Math.max(0, Math.min(scrollLeft, scrollWidth - clientWidth));
                return {
                    isScrolling: true,
                    scrollDirection: prevState.scrollOffset < scrollOffset ? 'forward' : 'backward',
                    scrollOffset,
                    scrollUpdateWasRequested: false
                }
            })
        };
        const onScrollVertical = (event: ScrollEvent) => {
            const { clientHeight, scrollTop, scrollHeight } = event.currentTarget;
            setState((prevState: State) => {
                if (prevState.scrollOffset === scrollTop) {
                    return prevState;
                }
                const scrollOffset = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight));
                return {
                    isScrolling: true,
                    scrollDirection: prevState.scrollOffset < scrollOffset ? 'forward' : 'backward',
                    scrollOffset,
                    scrollUpdateWasRequested: false
                }
            });
        };
        const getRangeToRender = () => {
            if (itemCount === 0) return [0, 0, 0, 0];
            const startIndex = getStartIndexForOffset(props, scrollOffset);
            const stopIndex = getStopIndexForStartIndex(props, startIndex, scrollOffset);
            const overscanBackward = !isScrolling || scrollDirection === 'backward' ? Math.max(1, overscanCount) : 1;
            const overscanForward = !isScrolling || scrollDirection === 'forward' ? Math.max(1, overscanCount) : 1;
            return [
                Math.max(0, startIndex - overscanBackward),
                Math.max(0, Math.min(itemCount - 1, stopIndex + overscanForward)),
                startIndex,
                stopIndex
            ];
        };
        const getItemStyle = (index: number) => {
            let style;
            if (ref.current.itemStyleCache.hasOwnProperty(index)) {
                style = ref.current.itemStyleCache[index];
            } else {
                const offset = getItemOffset(props, index);
                const size = getItemSize(props, index);
                const isRtl = direction === 'rtl';
                const offsetHorizontal = isHorizontal ? offset : 0;
                ref.current.itemStyleCache[index] = style = {
                    position: 'absolute',
                    left: isRtl ? undefined : offsetHorizontal,
                    right: isRtl ? offsetHorizontal : undefined,
                    top: !isHorizontal ? offset : 0,
                    height: !isHorizontal ? size : '100%',
                    width: isHorizontal ? size : '100%',
                };
            }
            return style;
        };

        useEffect(() => {
            if (state.isScrolling) {
                if (ref.current.timeoutId) clearTimeout(ref.current.timeoutId);
                ref.current.timeoutId = setTimeout(() => {
                    ref.current.timeoutId = null;
                    setState(state => ({
                        ...state,
                        isScrolling: false
                    }));
                }, IS_SCROLLING_DEBOUNCE_INTERVAL);
            }
        }, [state.isScrolling]);
        useEffect(() => {
            return () => {
                if (ref.current.timeoutId) clearTimeout(ref.current.timeoutId);
            }
        }, []);
        const onScroll = isHorizontal ? onScrollHorizontal : onScrollVertical;
        const items = [];
        const [startIndex, stopIndex] = getRangeToRender();
        if (itemCount > 0) {
            for (let index = startIndex; index <= stopIndex; index++) {
                items.push(
                    createElement(children, {
                        data: itemData as any,
                        key: itemKey(index, itemData),
                        index,
                        isScrolling: useIsScrolling ? isScrolling : undefined,
                        style: getItemStyle(index)
                    })
                )
            }
        }
        const estimatedTotalSize = getEstimatedTotalSize(props);
        return createElement(outerElementType, {
            className,
            onScroll,
            style: {
                position: 'relative',
                height,
                width,
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                willChange: 'transform',
                direction,
                ...style
            }
        },
            createElement(innerElementType, {
                children: items,
                style: {
                    height: isHorizontal ? '100%' : estimatedTotalSize,
                    pointerEvents: state.isScrolling ? 'none' : undefined,
                    width: isHorizontal ? estimatedTotalSize : '100%'
                }
            })
        );
    }
    return memo(List);
};
export default createListComponent;
