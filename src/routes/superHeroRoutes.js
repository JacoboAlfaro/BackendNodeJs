const express = require('express')
const superheroController = require('../controllers/SuperheroController')
const router = express.Router()

router.post('/new-superhero', superheroController.createSuperhero)
router.get('/', superheroController.getSuperheroes)
router.get('/:id', superheroController.getSuperheroById)
router.patch('/edit/:id', superheroController.updateSuperheroById)
router.delete('/remove/:id', superheroController.deleteSuperheroById)

module.exports = router;
