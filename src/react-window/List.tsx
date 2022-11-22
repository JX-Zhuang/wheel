import { memo, useEffect } from "react"
import { Props } from "./types/list"

function List<T>(props: Props<T>) {
    useEffect(() => {
        console.log(9)
    }, []);
    return <div>9</div>
}
export default List;
