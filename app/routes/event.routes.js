module.exports = app => {
    const events = require('../controllers/event.controller');

    var router = require('express').Router();

    //cria um evento
    router.post('/', events.create);

    //busca todos os eventos
    router.get('/', events.findAll);

    //busca evento por id
    router.get('/:id', events.findOne);

    //edita um evento por id
    router.put('/:id', events.update);

    //deleta evento por id
    router.delete('/:id', events.delete);

    //deleta todos os eventos
    router.delete('/', events.deleteAll);

    app.use('/api/events', router);
}