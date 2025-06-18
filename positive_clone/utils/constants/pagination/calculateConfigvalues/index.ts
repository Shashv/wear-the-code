import { limitValue } from "..";
function calculateConfig(page: number) {
    return { skipOffset: (page - 1) * limitValue, limitValue }
}
export default calculateConfig;