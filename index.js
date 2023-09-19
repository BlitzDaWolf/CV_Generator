// import { Octokit, App } from "octokit";
const { Octokit, App } = require("octokit");
const createBody = require("./templates/base");
const fs = require("fs");
const personalData = require("./extrainfo.json");
const githubUser = personalData.links.github.split("/").slice(-1);

const a = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title><link rel="stylesheet" href="mystyle.css"></head><body>$content</body></html>';

const octokit = new Octokit({
    // auth: '<TOKEN-HERE>',
    headers: {
        'X-GitHub-Api-Version': '2022-11-28'
    }
})

const mainLoop = async () => {
    const userData = (await octokit.request(`GET /users/${githubUser}`, {})).data;
    const repoData = (await octokit.request(`GET ${userData.repos_url}`, {})).data;
    console.log(repoData.map(x => x.name));
    const filtered = repoData.filter(x => x.owner.login == userData.login
        && x.private == false
        && x.fork == false
        && x.description != null)
        .sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 7);



    for (let i = 0; i < filtered.length; i++){
        filtered[i].Languages = (await octokit.request(`GET ${filtered[i].languages_url}`, {})).data
    }
    // console.log(userData)
    // console.log(repoData.length)
    // console.log(filtered.length);

    const final_projects = filtered.map(x => {
        return {
            "name": x.name,
            "description": x.description,
            "Languages": x.Languages,
            "created_at": x.created_at,
            "updated_at": x.updated_at
        }
    });
    fs.writeFile("./out/index.html", a.replace("$content", createBody(final_projects)), e => {});
    console.log(final_projects);
    // console.log(GenerateProject(final_projects[0].name, final_projects[0].description, final_projects[0].Languages));
    // console.log(final_projects.map(x => GenerateProject(x.name, x.description, x.Languages)).join(""));
}

fs.copyFile("./use-style.css", "./out/mystyle.css", e => {});
mainLoop()
