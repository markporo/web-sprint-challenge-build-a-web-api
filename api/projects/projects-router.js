// Write your "projects" router here!
const router = require('express').Router();
const projectsModel = require("./projects-model")
const { validateProject, validateProjectId } = require("./projects-middleware")

router.get('/', (req, res) => {
    projectsModel
        .get()
        .then((projects) => {
            return res.status(200).json(projects)
        })
        .catch(() => {
            res.status(500).json({ message: "server error" })
        })
});

router.get('/:id', validateProjectId, async (req, res) => {
    try {
        const found = await projectsModel.get(req.params.id)
        res.status(200).json(found)
    } catch {
        res.status(500).json({ message: "The project information could not be retrieved" })
    }
});

router.post("/", validateProject, (req, res) => {
    projectsModel
        .insert(req.body)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(() => {
            res.status(500).json({ message: "The project could not be added." })
        })
})

router.delete('/:id', validateProjectId, async (req, res) => {
    //const project = await projectsModel.get(req.params.id)
    projectsModel
        .remove(req.params.id)
        .then((result) => {
            console.log(result, "number of projects deleted")

            res.status(200).json({ message: "successfully deleted" });
        })
        .catch(() => {
            res.status(500).json({ message: "The user could not be deleted" })
        })
});

router.get('/:id/actions', validateProjectId, async (req, res) => {
    try {
        const foundActions = await projectsModel.getProjectActions(req.params.id)
        res.status(200).json(foundActions)
    } catch {
        res.status(500).json({ message: "The project information could not be retrieved" })
    }
});

router.put("/:id", validateProjectId, validateProject, (req, res) => {
    console.log("update projects", req.body)
    projectsModel
        .update(req.params.id, req.body)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(() => {
            res.status(500).json({ message: "The project could not be updated" })
        })
})

module.exports = router;
