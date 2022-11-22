import { FixedSizeList } from '../../react-window';
import './styles.css';
const Row = ({ index, style }: any) => (
    <div style={style} className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} >Row {index}</div>
);

const VerticalList = () => (
    <FixedSizeList
        className="List"
        height={150}
        itemCount={1000}
        itemSize={35}
        width={300}
        layout="vertical"
    >
        {Row}
    </FixedSizeList>
);
const Column = ({ index, style }: any) => (
    <div style={style} className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} >Column {index}</div>
);

const HorizontalList = () => (
    <FixedSizeList
        className="List"
        height={75}
        itemCount={1000}
        itemSize={100}
        layout="horizontal"
        width={300}
    >
        {Column}
    </FixedSizeList>
);
export default () => {
    return <div>
        <div>FixedSizeList</div>
        <VerticalList />
        <HorizontalList />
    </div>
};