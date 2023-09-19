const personalData = require("../extrainfo.json");
const GenerateProject = require("./project");

const createSkillLevel = (level) => {
    let r = "";
    for(let i = 0; i < level; i++){
        r+="<div class=\"filled tag\"></div>"
    }
    for(let i = 0; i < 5-level; i++){
        r+="<div class=\"un-filled tag\"/></div>"
    }
    return r;
}

const createSkils = () => {
    return personalData.Skils.sort((a, b) => b.score - a.score).map(x => {
        return `<div class="skill"><p>${x.name}</p> <div class="skill-level">${createSkillLevel(x.score)}</div></div>`;
    }).join("");
}

const createEducation = () => {
    return personalData.education.sort((a,b) => new Date(b.startDate) - new Date(a.startDate)).map(x => {
        return `<div class="experience">
            <div>${(new Date(x.startDate)).getFullYear()} - ${(new Date(x.endDate)).getFullYear()}</div>
            <div>
                <div>${x.school}</div>
                <div>${x.degree}</div>
                <div>${x.finished?"Finished":"Not finished"}</div>
            </div>
        </div>`
    }).join("");
}

const createExperience = () => {
    return personalData.experience.sort((a,b) => new Date(b.startDate) - new Date(a.startDate)).map(x => {
        return `<div class="experience">
            <div>${(new Date(x.startDate)).getFullYear()} - ${(new Date(x.endDate)).getFullYear()}</div>
            <div>
                <div>${x.location}</div>
                <div>${x.type}</div>
                <div>${x.description}</div>
            </div>
        </div>`
    }).join("");
}

const createLinks = () => {
    return Object.keys(personalData.links).map(x => {
        return `<div><img class="logo" src="${x}.svg" alt="${x} logo"/><p class="link-p">${personalData.links[x]}</p></div>`
    }).join("") + `<div><img class="logo" src="car.svg" alt="car logo"/><p class="link-p">${personalData.driving.join(", ")}</p></div>`;
}

const createBody = (projects) => {
    const projectDiv = projects.map(x => GenerateProject(x.name, x.description, x.Languages, personalData.links.github)).join("");

    return `<div>
        <div>
            <h1>${personalData.lastName} ${personalData.firstName}</h1>
            <div class="links">${createLinks()}</div>
        </div>

        <h2>Education</h2>
        <div>${createEducation()}</div>
        <h2>Experience</h2>
        <div>${createExperience()}</div>

        <h2>Skils</h2>
        <div class="skills">${createSkils()}</div>

        <h2>Personal projects</h2>
        ${projectDiv}
    </div>`;
}


module.exports = createBody;