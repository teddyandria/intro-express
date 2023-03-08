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

    async getWilders() {
        return await this.db.find();
    }

    async findById(id) {
        const wilder = await this.db.findOneBy({ id }); //récupérer un wilder par son ID
        if (!wilder) { //si le wilder n'existe pas (! veut dire différent) alors on affiche l'erreur.
            throw new Error("Ce wilder n'existe pas");
        }
        return wilder;
    }

    async deleteById(id) {
        const result = await this.db.delete({ id }); // suppression par ID
        if (result.affected === 0) { // si l'ID ne correspond à aucun wilder alors alors on affiche une erreur
            throw new Error("Ce wilder n'existe pas");
        }
        return {
            success: true,
            message: `Le wilder ayant l'id ${id} à été supprimé`,
        };
    }

    async update({ id, ...other }) {
        //solution 1
        let wilder = await this.findById(id);
        Object.keys(other).forEach((value) => {
            if (other[value]) { //other.first_name équivaut à other["first_name"]
                wilder[value] = other[value];
            }
        })
        return await this.db.save(wilder); //sauvegarde des données dans la base de données.

        //solution 2 

        // let res = await this.db.update(wilder.id, other);
        // return res
    }
}