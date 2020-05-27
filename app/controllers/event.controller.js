const db = require('../models');
const Event = db.Event;

exports.create = (req, res) => {
    //valida a requisição
    if(!req.body.title) {
        res.status(400).send({ message: 'Conteudo nao pode estar vazio!' });
    }

    //cria um novo evento
    const event = new Event({
        title: req.body.title,
        description: req.body.description,
        evt_date: req.body.evt_date
    });

    //salva um novo evento
    event
    .save(event)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || 'Ocorreu algum erro enquanto criava um evento' });
    });
}

exports.findAll = (req, res) => {
    //busca todos os eventos no banco de dados
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: 'i' } } : {};

    Event.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500)
        .send({ message: err.message || 'Ocorreu um erro ao buscar um evento' });
    });
}

exports.findOne = (req, res) => {
    //busca apenas um evendo no banco de dados
    const id = req.params.id;

    Event.findById(id)
    .then(data => {
        if(!data)
            res.status(404).send({ message: 'Event not found' });
        else 
            res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({ message: 'Ocorreu um erro ao buscar um evento por este id' });
    })
}

exports.update = (req, res) => {
    //edita um evento
    if(!req.body) {
        return res.status(400).send({ message: 'Evento para ser atualizado não pode estar em branco' });
    }

    const id = req.params.id;

    Event.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if(!data){
            res.status(404).send({ message: `Impossível atualizar evento com id: ${id}` });
        } else{
            res.send({ message: 'Evento atualizado com sucesso' });
        }
    })
    .catch(err => {
        res.status(500).send({ message: `Erro ao atualizar evendo com id: ${id}` });
    });
}

exports.delete = (req, res) => {
    //deleta um evento
    const id = req.params.id;

    Event.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                message: `Não foi possível excluir o evendo: ${id}`
            });
        } else {
            res.send({ message: 'Evento excluído com sucesso' });
        }
    })
    .catch(err => {
        res.status(500).send({ message: `Não foi possível excluir o evendo: ${id}` });
    });
}

exports.deleteAll = (req, res) => {
    //deleta todos os eventos
    Event.deleteMany({})
    .then(data => {
        res.send({ message: `${data.deletedCount} eventos foram excluídos` });
    })
    .catch(err => {
        res.status(500).send({ message: err.message || 'Ocorreram erros ao tentar excluir os eventos' })
    })
}

/*
exports.findAllPublished = (req, res) => {
    //busca todos os eventos que ainda não aconteceram
    Event.find({ to_happen: true })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Ocorreram erros ao buscar os eventos'
        });
    });
}
*/