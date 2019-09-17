import {AgendaClass} from "./AgendaClass";

const agendaClass = new AgendaClass({agenda :[]});

const getAgenda = (req,res) => {
  // let pictureFile = req.params.pictureFile;
  res.status(200).json({state : agendaClass.agenda});
}

const updateAgenda = (req,res) => {
  agendaClass.agenda = req.body;
  // let pictureFile = req.params.pictureFile;
  res.status(200).json({state : agendaClass.agenda});
}


export default {
  getAgenda,
  updateAgenda
}
