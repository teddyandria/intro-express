import datasource from "../lib/datasource";

export default class LanguageService {

    constructor() {
        this.db = datasource.getRepository("language");
    }

    async createLanguage({ label }) {
        const language = this.db.create({ label });
        return await this.db.save(language);
    }

    async listLanguage() {
        return await this.db.find();
    }

    async findById(id) {
        const language = await this.db.findOneBy({ id });
        if (!language) {
            throw new Error("Ce langage n'existe pas");
        }
        return language;
    }

    async deleteById(id) {
        const resultLanguage = await this.db.delete({ id }); // suppression par ID
        if (resultLanguage.affected === 0) { // si l'ID ne correspond à aucun wilder alors alors on affiche une erreur
            throw new Error("Ce wilder n'existe pas");
        }
        return {
            success: true,
            message: 'Langage supprimé',
        };
    }

    async update({ id, ...other }) {
        let language = await this.findById(id);
        Object.keys(other).forEach((value) => {
            if (other[value]) {
                language[value] = other[value];
            }
        })
        return await this.db.save(language);
    }
}