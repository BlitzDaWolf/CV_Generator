// import { Octokit, App } from "octokit";
const { Octokit, App } = require("octokit");
const createBody = require("./templates/base");
const fs = require("fs");

const a = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title><link rel="stylesheet" href="mystyle.css"></head><body>$content</body></html>';

const octokit = new Octokit({
    // auth: '<TOKEN-HERE>',
    headers: {
        'X-GitHub-Api-Version': '2022-11-28'
    }
})

const mainLoop = async () => {
    const userData = (await octokit.request('GET /users/blitzdawolf', {})).data;
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

const t = [
    {
      name: 'InventorySystem',
      description: 'An Basic inventory system API Writen in C#',
      Languages: { 'C#': 100 },
      created_at: '2023-09-13T12:40:18Z',
      updated_at: '2023-09-18T22:06:12Z'
    },
    {
      name: 'CV_Generator',
      description: 'CV generator using nodejs with Octokit.',
      Languages: { JavaScript: 100 },
      created_at: '2023-09-18T16:26:37Z',
      updated_at: '2023-09-18T16:29:19Z'
    },
    {
      name: 'CalanderCSharp',
      description: 'Calander app using C# ASP.NET With EF',
      Languages: { 'C#': 98, Dockerfile: 2 },
      created_at: '2023-09-11T16:56:42Z',
      updated_at: '2023-09-12T14:28:53Z'
    },
    {
      name: 'LeetCode-Tests',
      description: 'My repository to test ',
      Languages: { Java: 51, 'C#': 49 },
      created_at: '2023-08-24T22:30:52Z',
      updated_at: '2023-08-30T21:57:00Z'
    },
    {
      name: 'MACDMulti',
      description: 'Trading strategy using the MACD indicator',
      Languages: { 'C#': 100 },
      created_at: '2023-04-20T12:19:55Z',
      updated_at: '2023-04-20T12:20:32Z'
    },
    {
      name: 'MerpEngine',
      description: 'Merpengine is a program first 2D game engine',
      Languages: { 'C#': 100 },
      created_at: '2020-01-05T01:30:16Z',
      updated_at: '2021-05-25T16:09:19Z'
    },
    {
      name: 'GroepQBI',
      description: 'Intro bi groep Q SSIS',
      Languages: {},
      created_at: '2020-12-02T14:58:55Z',
      updated_at: '2020-12-02T15:52:28Z'
    }
  ]

fs.copyFile("./use-style.css", "./out/mystyle.css");
fs.writeFile("./out/index.html", a.replace("$content", createBody(t)), e => {});
// mainLoop()
