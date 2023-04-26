import { h } from "hastscript";

export default {
    "verse-block": (org) => {
        const interleave = (a, e) => a.flatMap((x) => [x, e]).slice(0, -1);
        const verses = org.children.flatMap((n) =>
            n.type != "text"
                ? n
                : interleave(
                    n.value
                        .split("\n")
                        .map((v) => {
                            if (v != "") {
                                const value = "\uFEFF" + v.replaceAll(" ", "\u00A0");
                                return { type: "text", value };
                            }
                            return null;
                        })
                        .filter((v) => v != null),
                    h("br")
                )
        );
        return h("p.verse", verses);
    },
    // superscript parsing is broken in uniorg atm
    // "superscript": (org) => { console.log(org) },
}
