export type TimeCheck = {
    startDuration: number,
    startEpoch: number
}

export type AppState = {
    isOn: boolean,
    duration: number,
    targetDuration: number,
    timeCheck: TimeCheck,
    currentProject: Project,
    currentBlock: string,
    userActionTimestamp: number,
    // blockHistory: Array<BlockType>,
    // projects: Array<Project>
}

export type AppStateResponse = {
    success: boolean,
    state: AppState
}

export type BlockType = {
    id: string,
    duration: number | null,
    endTimestamp: number,
    projectName?: string,
    projectId?: string,
    name?: string
}

export type TimeObject = {
    hours: string,
    minutes: string,
    seconds: string
}

export type TimerOpts = {
    isBroadcast?: boolean,
    data?: object
}

export type Project = {
    id: string,
    name: string
}