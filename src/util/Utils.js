const toTitleDate = d => {
    const w = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const date = new Date(d);
    return w[date.getDay()] + ", " + date.toLocaleDateString("de-DE");
}

let id = 0;
const generateID = function* () {
    yield id++;
}

export {toTitleDate, generateID}
