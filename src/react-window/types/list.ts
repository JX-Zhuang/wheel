import React from "react";
export type OnItemsRenderedCallback = (event: {
    overscanStartIndex: number,
    overscanStopIndex: number,
    visibleStartIndex: number,
    visibleStopIndex: number,
}) => void;
export type OnScrollCallback = (event: {
    scrollDirection: ScrollDirection,
    scrollOffset: number,
    scrollUpdateWasRequested: boolean,
}) => void;
export type ScrollToAlign = 'auto' | 'smart' | 'center' | 'start' | 'end';
export type ItemSize = number; //| ((index: number) => number);
export type Direction = 'ltr' | 'rtl' | 'horizontal' | 'vertical';
export type Layout = 'horizontal' | 'vertical';
export type ScrollDirection = 'forward' | 'backward';
export type ScrollEvent = React.SyntheticEvent<HTMLDivElement>;
export type ItemStyleCache = { [index: number]: Object };
export type OuterProps = {
    children: React.ReactNode;
    className: string | void;
    onScroll: (event: ScrollEvent) => void;
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
export type RenderComponentProps<T> = {
    data: T,
    index: number,
    isScrolling?: boolean,
    style: Object,
};
export type RenderComponent<T> = React.ComponentType<RenderComponentProps<T>>;
export type Props<T> = {
    children: RenderComponent<T>;
    className?: string;
    direction?: Direction;
    //容器的高度
    height: number;
    //初始化滚动偏移
    initialScrollOffset?: number;
    //高级功能
    // innerRef?: any;
    //高级功能，通常是div
    innerElementType?: string;// | React.AbstractView
    //列表的项目数量
    itemCount: number;
    itemData?: T;
    //列表的每一项的key
    itemKey?: (index: number, data?: T) => any;
    //如果是垂直方向的列表，每一行的高度；如果是水平方向的列表，每一列的宽度
    itemSize: ItemSize;
    //垂直或水平布局
    layout: Layout;
    //当列表呈现的项范围更改时调用。
    //仅当项索引更改时才会调用此回调。如果由于其他原因（例如isScrolling或数据参数的更改）重新呈现项目，则不会调用它。
    onItemsRendered?: OnItemsRenderedCallback;
    //滚动时触发
    onScroll?: OnScrollCallback;
    //高级属性
    // outerRef?: any;
    // 高级属性，通常是div
    outerElementType?: string; //| React$AbstractComponent<OuterProps, any>,
    overscanCount?: number;
    style?: Object;
    useIsScrolling?: boolean;
    width: number;
};
export type State = {
    // instance: any;
    isScrolling: boolean;
    scrollDirection: ScrollDirection;
    scrollOffset: number;
    scrollUpdateWasRequested: boolean;
};
export type GetItemOffset = (
    props: Props<any>,
    index: number,
    instanceProps?: any
) => number;
export type GetItemSize = (
    props: Props<any>,
    index: number,
    instanceProps?: any
) => number;
export type GetEstimatedTotalSize = (props: Props<any>) => number;
export type GetOffsetForIndexAndAlignment = (
    props: Props<any>,
    index: number,
    align: ScrollToAlign,
    scrollOffset: number,
    scrollbarSize: number,
    instanceProps?: any
) => number;
export type GetStartIndexForOffset = (
    props: Props<any>,
    offset: number,
    instanceProps?: any
) => number;
export type GetStopIndexForStartIndex = (
    props: Props<any>,
    startIndex: number,
    scrollOffset: number,
    instanceProps?: any
) => number;
export type InitInstanceProps = (props: Props<any>, instance: any) => any;
export type ValidateProps = (props: Props<any>) => void;