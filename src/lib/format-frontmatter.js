import { DateTime } from "luxon";

export const formatFrontmatter = frontmatter => {
    const { created: createdStr, modified: modifiedStr, filetags } = frontmatter
    const created = createdStr ? orgTimeToDateTime(createdStr) : undefined
    const modified = modifiedStr ? orgTimeToDateTime(modifiedStr) : undefined
    const tags = formatTags(filetags)
    return {
        ...frontmatter, ...{
            created,
            modified,
            tags
        }
    }
}

/**
 * Potential timestamp formats:
 * [1900-01-31 Mon 2:55]
 * <1900-01-31 Mon 2:55>
 * <1900-01-31 Mon>
 * <1900-01-31>
 *
 * And I might be missing a few...
*/
const orgTimeToDateTime = str => {
    // Day is irrelevant to creating a dt object
    const [date, _, time] = str.slice(1, -1).split(" ")
    const [year, month, day] = date ? date.split("-") : []
    const [hour, minute] = time ? time.split(":") : []
    return DateTime.fromObject({ year, month, day, hour, minute }).toString()
}

const formatTags = tagsStr => {
    return tagsStr
        ? tagsStr.slice(1, -1).split(":")
        : []
}
