import {AgendaClass} from "./AgendaClass";

const agendaClass = new AgendaClass([]);

const getAgenda = (req,res) => {
  // let pictureFile = req.params.pictureFile;
  res.status(200).json({message : agendaClass.agenda});
}

const updateAgenda = (req,res) => {
  agendaClass.agenda = req.body;
  // let pictureFile = req.params.pictureFile;
  res.status(200).json({message : agendaClass.agenda});
}


export default {
  getAgenda,
  updateAgenda
}
