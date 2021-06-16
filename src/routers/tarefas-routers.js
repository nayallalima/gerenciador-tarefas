const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefas-controllers');

router.get('/tarefas', tarefaController.getTarefas);
router.get('/tarefas/titulo', tarefaController.getByTitlle);
router.get('/tarefas/:id', tarefaController.getById);

router.post('/tarefas', tarefaController.addTarefas);
router.post('/tarefas/:id', tarefaController.concluirTarefa);

router.put('/tarefas/:id', tarefaController.updateTarefa);

router.patch('/tarefas/:id', tarefaController.updateCampoTarefa);

router.delete('/tarefas/:id', tarefaController.deleteTarefa);

module.exports = router;