export function CursorToId(input){
    return new Buffer(input,'base64').toString("binary")
}
export function IdToCursor(input){
    return new Buffer(input,'binary').toString("base64")
}