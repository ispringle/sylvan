import { h } from "hastscript";

export default {
    "verse-block": (org) => {
        const interleave = (a, e) => a.flatMap((x) => [x, e]).slice(0, -1);

        // Split content by double newlines to get stanzas
        const text = org.children
            .filter(n => n.type === "text")
            .map(n => n.value)
            .join("");

        const stanzas = text.split(/\n\n+/).filter(s => s.trim());

        // Process each stanza
        const stanzaDivs = stanzas.map(stanza => {
            const lines = stanza.split("\n").map(line => {
                const value = "﻿" + line.replaceAll(" ", " ");
                return { type: "text", value };
            });

            return h("div.stanza", interleave(lines, h("br")));
        });

        return h("div.verse", stanzaDivs);
    },
    // superscript parsing is broken in uniorg atm
    // "footnote": (org) => { console.log(org) },
}
