const toTitleDate = d => {
    const w = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const date = new Date(d);
    return w[date.getDay()] + ", " + date.toLocaleDateString();
}
const toMonthName = d => {
    const m = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return m[d.getMonth()];
}

export {toTitleDate, toMonthName}
