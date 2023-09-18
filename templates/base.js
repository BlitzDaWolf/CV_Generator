const personalData = require("../extrainfo.json");
const GenerateProject = require("./project");

const createSkillLevel = (level) => {
    let r = "";
    for(let i = 0; i < level; i++){
        r+="<div class=\"filled\"></div>"
    }
    for(let i = 0; i < 5-level; i++){
        r+="<div class=\"un-filled\"/></div>"
    }
    return r;
}

const createSkils = () => {
    return personalData.Skils.map(x => {
        return `<div>${x.name} <div class="skill-level">${createSkillLevel(x.score)}</div></div>`;
    }).join("");
}

const createEducation = () => {

}

const createBody = (projects) => {
    const projectDiv = projects.map(x => GenerateProject(x.name, x.description, x.Languages)).join("");

    return `<div>
        <div>
            <h1>${personalData.lastName} ${personalData.firstName}</h1>
        </div>

        <h2>Education</h2>


        <h2>Skils</h2>
        <div>${createSkils()}</div>

        <h2>Projects</h2>
        ${projectDiv}
    </div>`;
}


module.exports = createBody;