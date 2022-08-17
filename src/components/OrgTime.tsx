import { format, parseISO } from 'date-fns'

const timestampToOrgFormat = (timestamp: string) => {
    const isoTime = parseISO(timestamp)
    if (isoTime.getUTCHours() === 0 && isoTime.getUTCMinutes() === 0 || isoTime.getHours() === 0 && isoTime.getMinutes() === 0) {
        return format(isoTime, "yyyy-MM-dd EEE")
    } else {
        return format(isoTime, "yyyy-MM-dd EEE HH:mm")
    }
}

const OrgTime = ({ dateStr }) => {
    const compDateText = timestampToOrgFormat(dateStr)
    return (
        <span className="orgtime">{compDateText}</span>
    )
}

export default OrgTime
