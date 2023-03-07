import datasource from "../lib/datasource"

export default class WilderService {
    // le constructeur qui charge db pour chaque instanciation (quand je le fais new)
    constructor() {
        this.db = datasource.getRepository("wilder");
    }

    async createWilder({ email, first_name, last_name }) {
        const wilder = this.db.create({ email, first_name, last_name });
        return await this.db.save(wilder);
    }
}