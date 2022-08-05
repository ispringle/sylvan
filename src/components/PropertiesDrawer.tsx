import { format, parseISO } from 'date-fns'

const timestampToOrgFormat = (timestamp: string) => {
    return format(parseISO(timestamp), "yyyy-MM-dd EEE HH:mm")
}

export interface PropertiesDrawerProps {
    properties: { [key: string]: string };
}

const PropertiesDrawer = ({ ...props }) => {
    const compDateText = timestampToOrgFormat(process.env.NEXT_PUBLIC_BUILD_TIME)
    const properties = props.properties
    delete properties["author"]
    return (
        <table title="properties" className="psuedoDrawer">
            <tbody>
                <tr>
                    <th>author</th>
                    <td>Ian Shepard Pringle</td>
                </tr>
                {
                    Object.keys(properties).map(k => {
                        return (
                            <tr key={k}>
                                <th>{k}</th>
                                <td>{properties[k]}</td>
                            </tr>
                        )
                    })
                }
                <tr>
                    <th>compiled</th>
                    <td><span className="orgtime">{compDateText}</span></td>
                </tr>
                <tr>
                    <th>made_with</th>
                    <td>
                        <div className="linkList">
                            <span>
                                <a rel="noreferrer" target="_blank" title="Emacs 28.1" href="https://www.gnu.org/software/emacs/">Emacs</a>
                            </span>
                            <span>
                                <a rel=" noreferrer" target="_blank" title="Orgmode 9.5.2" href="https://orgmode.org">Orgmode</a>
                            </span>
                            <span>
                                <a rel="noreferrer" target="_blank" title={"NextJS " + process.env.NEXT_PUBLIC_NEXT_JS_VERSION} href="https://nextjs.org">NextJS</a>
                            </span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table >

    )
}

export default PropertiesDrawer
