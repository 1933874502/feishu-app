interface pushRetentionOperationsParams {
    roomVersion:number
    executor:VoidFunction
}

const rententionOperations:pushRetentionOperationsParams[] = []
let lock:boolean = false
let workInProgressRoomVersion:number|null = null

export const checkRoomVersion = (roomVersion:number)=>{
    if(roomVersion===workInProgressRoomVersion){
        //代表请求成功返回了
        lock = false
        workInProgressRoomVersion = null
    }
}

export const pushRetentionOperations =(operationObj:pushRetentionOperationsParams)=>{
    rententionOperations.push(operationObj)
}

export const getLatestRetentionOperation = ()=>{
    if(rententionOperations.length===0){
        return
    }
    const latestOperation = rententionOperations.shift()
    return latestOperation
}

export const excuteRetentionOperation=(operationGenerator:VoidFunction,roomVersion:number)=>{
    lock = true
    workInProgressRoomVersion = roomVersion
    operationGenerator()
    requestAnimationFrame(circleCheckRetentionOperations)
}

export const circleCheckRetentionOperations = ()=>{
    const lastestOperationObj = getLatestRetentionOperation()
    if(!lastestOperationObj||lock){
        requestAnimationFrame(circleCheckRetentionOperations)
    }else{
        excuteRetentionOperation(lastestOperationObj.executor,lastestOperationObj.roomVersion)
    }
}
export const enableSocketQueue=()=>{
    //客户端推送join room事件后触发
    circleCheckRetentionOperations()
}