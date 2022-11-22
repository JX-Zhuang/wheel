export type Direction = 'ltr' | 'rtl';
export type ScrollToAlign = 'auto' | 'smart' | 'center' | 'start' | 'end';
export type itemSize = number | ((index: number) => number);
export type RenderComponentProps<T> = {
    columnIndex: number,
    data: T,
    isScrolling?: boolean,
    rowIndex: number,
    style: Object,
};
export type RenderComponent<T> = React.ComponentType<RenderComponentProps<T>>;
export type ScrollDirection = 'forward' | 'backward';
export type OnItemsRenderedCallback = (event: {
    overscanColumnStartIndex: number,
    overscanColumnStopIndex: number,
    overscanRowStartIndex: number,
    overscanRowStopIndex: number,
    visibleColumnStartIndex: number,
    visibleColumnStopIndex: number,
    visibleRowStartIndex: number,
    visibleRowStopIndex: number,
}) => void;
export type OnScrollCallback = (event: {
    horizontalScrollDirection: ScrollDirection,
    scrollLeft: number,
    scrollTop: number,
    scrollUpdateWasRequested: boolean,
    verticalScrollDirection: ScrollDirection,
}) => void;

type ScrollEvent = React.SyntheticEvent<HTMLDivElement>;
type ItemStyleCache = { [key: string]: Object };

export type OuterProps = {
    children: React.ReactNode,
    className: string | void,
    onScroll: (event: ScrollEvent) => void,
    style: {
        [x: string]: any;
    },
};

export type InnerProps = {
    children: React.ReactNode,
    style: {
        [x: string]: any,
    },
};

export type Props<T> = {
    children: RenderComponent<T>,
    className?: string,
    columnCount: number,
    columnWidth: itemSize,
    direction: Direction,
    height: number,
    initialScrollLeft?: number,
    initialScrollTop?: number,
    innerRef?: any,
    innerElementType?: string;//| React$AbstractComponent<InnerProps, any>,
    innerTagName?: string, // deprecated
    itemData: T,
    itemKey?: (params: {
        columnIndex: number,
        data: T,
        rowIndex: number,
    }) => any,
    onItemsRendered?: OnItemsRenderedCallback,
    onScroll?: OnScrollCallback,
    outerRef?: any,
    outerElementType?: string;// | React$AbstractComponent<OuterProps, any>,
    outerTagName?: string, // deprecated
    overscanColumnCount?: number,
    overscanColumnsCount?: number, // deprecated
    overscanCount?: number, // deprecated
    overscanRowCount?: number,
    overscanRowsCount?: number, // deprecated
    rowCount: number,
    rowHeight: itemSize,
    style?: Object,
    useIsScrolling: boolean,
    width: number,
};

export type State = {
    instance: any,
    isScrolling: boolean,
    horizontalScrollDirection: ScrollDirection,
    scrollLeft: number,
    scrollTop: number,
    scrollUpdateWasRequested: boolean,
    verticalScrollDirection: ScrollDirection,
};

export type getItemOffset = (
    props: Props<any>,
    index: number,
    instanceProps: any
) => number;
export type getItemSize = (
    props: Props<any>,
    index: number,
    instanceProps: any
) => number;
export type getEstimatedTotalSize = (props: Props<any>, instanceProps: any) => number;
export type GetOffsetForItemAndAlignment = (
    props: Props<any>,
    index: number,
    align: ScrollToAlign,
    scrollOffset: number,
    instanceProps: any,
    scrollbarSize: number
) => number;
export type GetStartIndexForOffset = (
    props: Props<any>,
    offset: number,
    instanceProps: any
) => number;
export type GetStopIndexForStartIndex = (
    props: Props<any>,
    startIndex: number,
    scrollOffset: number,
    instanceProps: any
) => number;
export type InitInstanceProps = (props: Props<any>, instance: any) => any;
export type ValidateProps = (props: Props<any>) => void;