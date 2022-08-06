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
        <div title="properties" className="psuedoDrawer">
            <div className="drawerRow">
                <span className="key">author</span>
                <span>Ian Shepard Pringle</span>
            </div>
            {
                Object.keys(properties).map(k => {
                    return (
                        <div key={k} className="drawerRow">
                            <span className="key">{k}</span>
                            <span>{properties[k]}</span>
                        </div>
                    )
                })
            }
            <div className="drawerRow">
                <span className="key">compiled</span>
                <span><span className="orgtime">{compDateText}</span></span>
            </div>
            <div className="drawerRow">
                <span className="key">made_with</span>
                <span>
                    <div className="linkList">
                        <a rel="noreferrer" target="_blank" title="Emacs 28.1" href="https://www.gnu.org/software/emacs/">Emacs</a>
                        <a rel=" noreferrer" target="_blank" title="Orgmode 9.5.2" href="https://orgmode.org">Orgmode</a>
                        <a rel="noreferrer" target="_blank" title={"NextJS " + process.env.NEXT_PUBLIC_NEXT_JS_VERSION} href="https://nextjs.org">NextJS</a>
                    </div>
                </span>
            </div>
        </div>

    )
}

export default PropertiesDrawer
