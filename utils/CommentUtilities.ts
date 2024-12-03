let showLogs = false;

export function setShowLogs(show: boolean) {
    showLogs = show;
}

export function superLog(comment: any) {
    // @ts-ignore
    if (typeof showLogs !== "undefined" && showLogs) {
        console.log(comment)
    }
}