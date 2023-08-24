import { visit } from "unist-util-visit";

export const linkAttachments = () => (tree, file) => {
    visit(tree, "link", (node) => {
        const isAttachment = node.linkType === "attachment";
        if (!isAttachment) { return }

        const fileID = file.data.astro.frontmatter?.id
        if (!fileID) { return }

        const [first, rem] = [fileID.slice(0, 2), fileID.slice(2)]
        const path = `/.attach/${first}/${rem}/${node.path}`
        node.linkType = 'file'
        node.path = path
        node.rawLink = "file:" + path
        return node
    })
}
