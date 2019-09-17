export class AgendaClass {
    constructor(agenda) {
        this._agenda = agenda;
    }
    get agenda() {
        return this._agenda;
    }

    set agenda(newAgenda){
        if(newAgenda){
            this._agenda = newAgenda;
        }
    }
}
