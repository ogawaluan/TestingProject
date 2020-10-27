const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json())

const projects = [];

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if(!isUuid(id)) {
    return response.status(400).json({ error: "invalid project ID" });
  }

  return next();
}

app.use('/projects/:id', validateProjectId)

app.get('/projects', (request, response) => {
  // const { title } = request.query;

  // const results = title ? projects.filter(project => project.title.includes(title)) : projects;
  
  return response.json(projects);
});

app.post('/projects', (request, response) => {
  const { title, name } = request.body;

  const project = { id: uuid(), title, name };

  projects.push(project);
  
  return response.json(project);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, name } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "project not found" })
  }

  const project = {
    id,
    title,
    name,
  };

  projects[projectIndex] = project

  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "project not found" })
  }
  
  projects.splice(projectIndex, 1);

  return response.status(204).send()
})

app.listen(3333, () => {
  console.log('backend started!')
});