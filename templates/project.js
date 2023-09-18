

const GenerateProject = (name, description, Languages) => {
    let total = 0;
    Object.keys(Languages).forEach(x => {
        total+=Languages[x];
    });
    Object.keys(Languages).forEach(x => {
        Languages[x] = Math.round(Languages[x] / total * 100);
    });
    return `<div class="prj-card">
        <h3 class="prj-name">${name}</h3>
        <div class="prj-dsc">${description}</div>
        <div>${Object.keys(Languages).map(x => `<span class="">${x} ${Languages[x]}%</span>`)}</div>
    </div>`;
}


module.exports = GenerateProject;