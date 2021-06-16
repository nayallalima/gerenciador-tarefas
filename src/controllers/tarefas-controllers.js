const tarefaModel = require('../models/tarefas-models');
const helper = require('../helpers/helpers');

const getTarefas = (request, response) => {
    response.status(200).json(tarefaModel);
}

const getById = (request, response) => {
    const { id } = request.params;

    const tarefa = tarefaModel.find(tarefa => tarefa.id == id);

    response.status(200).json(tarefa);
}

const getByTitlle = (request, response) => {
    const { titulo } = request.query;

    const baseDados = tarefaModel.find(tarefa => tarefa.titulo == titulo);

    response.status(200).json(baseDados);
}

const addTarefas = (request, response) => {
    const { titulo, descricao, prazo, responsavel } = request.body;

    const novaTarefa = {
        id: helper.novoId(tarefaModel),
        titulo: titulo,
        descricao: descricao,
        prazo: prazo,
        responsavel: responsavel,
        concluido: false,
        dataCriacao: helper.novaData(tarefaModel)
    }

    tarefaModel.push(novaTarefa);

    response.status(201).json(novaTarefa);
}

const concluirTarefa = (request, response) => {
    const { id } = request.params;
    const tarefa = tarefaModel.filter(tarefa => {
        return tarefa.id == id;
    })[0];
    if(tarefa){
        tarefa.concluido=true;
        response.status(200).json({ mensagem: "Tarefa concluída com sucesso" });
    }
    else{
        response.status(400).json({ mensagem: "Tarefa não localizada" });
    }
}
        

const updateTarefa = (request, response) => {
    const { id } = request.params;
    const tarefasAtualizadas = tarefaModel.filter(tarefa => {
        return tarefa.id == id;
    })[0];
    const index = tarefaModel.indexOf(tarefasAtualizadas);

    const keys = Object.keys(request.body);

    keys.forEach(key => {
        tarefasAtualizadas[key] = request.body[key]
    })

    tarefaModel[index] = tarefasAtualizadas;

    response.status(200).json(tarefaModel[index]);
}

const updateCampoTarefa = (request, response) => {
    const { titulo } = request.body;
    const { id } = request.params;
    const tarefa = tarefaModel.find(tarefa => tarefa.id == id);

    tarefa.titulo = titulo; 
   
    response.status(200).json(tarefa);
}

const deleteTarefa = (request, response) => {
    const { id } = request.params;

    const tarefasFiltradas = tarefaModel.filter(tarefa => {
        return tarefa.id == id;
    })[0];

    const index = tarefaModel.indexOf(tarefasFiltradas);
    
    tarefaModel.splice(index, 1)

    response.status(200).json({ mensagem: "Tarefa deletada com sucesso" });
}

module.exports = {
    getTarefas,
    getById,
    getByTitlle,
    addTarefas,
    concluirTarefa,
    updateTarefa,
    updateCampoTarefa,
    deleteTarefa
}