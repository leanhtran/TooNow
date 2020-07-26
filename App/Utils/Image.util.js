
import { URLBase } from "../Constants";

const getImageFromPath = (path) => {
    if (path === null) return null
    return `${URLBase}${path}`;
}
export {
    getImageFromPath
}