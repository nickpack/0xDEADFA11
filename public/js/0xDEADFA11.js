var DEADFA11 = DEADFA11 || {};

DEADFA11.namespace = function (ns_string) {
    var parts = ns_string.split('.'),
        parent = DEADFA11,
        i;

    if (parts[0] === "DEADFA11") {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i += 1) {
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }

    return parent;
};
