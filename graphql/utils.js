export const dbIdToNodeId = (tableName, dbId)=>{
    return `${tableName}:${dbId}`;
}