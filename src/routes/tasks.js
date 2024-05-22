const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const tasks = [
    {
        "id": "e198b375-bf4b-40ea-b80f-3478522fe7fb",
        "title": "M295 Test",
        "description": "Ace the backend coding test.",
        "doneAt": "2024-05-22", 
        "creator": "example1@example.com",
    },
    {
        "id": "241830d1-098a-43fb-a679-3b7984a3d825",
        "title": "Project Meeting",
        "description": "Discuss project milestones with the team.",
        "doneAt": "2024-05-20", 
        "creator": "example2@example.com",
    },
    {
        "id": "0cf9d984-f16a-4728-ab86-022f3e7e852a",
        "title": "Code Review",
        "description": "Review the latest code commits from the dev team.",
        "doneAt": "2024-05-18", 
        "creator": "example3@example.com",
    },
    {
        "id": "32b10fe4-4648-4b67-9285-443c1e691702",
        "title": "Design Mockups",
        "description": "Create design mockups for the new feature.",
        "doneAt": "2024-05-15", 
        "creator": "example4@example.com",
    },
    {
        "id": "1e5c3968-c92d-4cb7-819c-b7c59de35ba6",
        "title": "Client Presentation",
        "description": "Present the project update to the client.",
        "doneAt": "2024-05-21", 
        "creator": "example5@example.com",
    },
];


router.get('/tasks', (request, response) => {
    if (request.session.email) {
        response.status(200).send(tasks)
    } else {
        response.status(401).send('Not logged in.')
    }
})

router.get('/tasks/:id', (request, response) => {
    if (request.session.email) {
        const taskId = request.params.id
        const foundTask = tasks.findIndex(task => task.id === taskId)
    
        if (foundTask === -1) {
            response.status(404).send(`Task with Id ${lendID} doesn't exist.`)
            return
        }

        response.status(200).send(tasks[foundTask])
    } else {
        response.status(401).send('Not logged in.')
    }
})

router.post('/tasks', (request, response) => {
    if (request.session.email) {
        const newTask = request.body;
    
        if (!newTask || !newTask.title) {
            response.status(400).send('Invalid task data. Missing title.');
            return;
        }

        const newTaskWithId = {
            id: uuidv4(),
            title: newTask.title,
            description: newTask.description,
            doneAt: newTask.doneAt,
            creator: newTask.creator
        } 
        
        tasks.push(newTaskWithId);
        
        response.status(201).json({
            message: 'New task added successfully: ',
            task: newTaskWithId
        });
    } else {
        response.status(401).send('Not logged in.')
    }
})

router.put('/tasks/:id', (request, response) => {
    if (request.session.email) {
        const taskId = request.params.id
        const foundTask = tasks.findIndex(task => task.id === taskId)
    
        if (foundTask === -1) {
            response.status(404).send(`Task with Id ${TaskId} doesn't exist.`)
            return
        }
    
        tasks[foundTask] = { ...tasks[foundTask], ...request.body };
        response.status(200).json(tasks[foundTask]);
    } else {
        response.status(401).send('Not logged in.')
    }
})

router.delete('/tasks/:id', (request, response) => {  
    if (request.session.email) {
        const taskId = request.params.id
        const foundTask = tasks.findIndex(task => task.id === taskId)
      
        if (foundTask === -1) {
          response.status(404).send(`Task with Id ${taskId} doesn't exist.`)
          return
        }

        tasks[foundTask].doneAt = new Date
      
        const deletedTask = tasks.splice(foundTask, 1)[0];
      
        response.status(200).send(`Task deleted ${JSON.stringify(deletedTask)}!`)
    } else {
        response.status(401).send('Not logged in.')
    }
})

module.exports = router