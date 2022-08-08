import { format, parseISO } from 'date-fns'

const timestampToOrgFormat = (timestamp: string) => {
    return format(parseISO(timestamp), "yyyy-MM-dd EEE HH:mm")
}

const OrgTime = ({ dateStr }) => {
    const compDateText = timestampToOrgFormat(dateStr)
    return (
        <span><span className="orgtime">{compDateText}</span></span>
    )
}

export default OrgTime
