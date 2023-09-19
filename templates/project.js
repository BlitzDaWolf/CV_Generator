const GenerateProject = (name, description, Languages, gitlink) => {
    let total = 0;
    Object.keys(Languages).forEach(x => {
        total+=Languages[x];
    });
    Object.keys(Languages).forEach(x => {
        Languages[x] = Math.round(Languages[x] / total * 100);
    });
    return `<div class="prj-card">
        <a href="${gitlink}/${name}"><h3 class="prj-name">${name}</h3></a>
        <div class="prj-dsc">${description}</div>
        <div class="tags">${Object.keys(Languages).map(x => `<span class="">${Languages[x]}% ${x}</span>`).join("")}</div>
    </div>`;
}


module.exports = GenerateProject;