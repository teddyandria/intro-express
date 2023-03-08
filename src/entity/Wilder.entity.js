import { EntitySchema } from "typeorm";


//création de la table Wilder avec les différents champs.
export default new EntitySchema({
    name: "Wilder",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        first_name: {
            type: "text",
        },
        last_name: {
            type: "text",
        },
        email: {
            type: "text",
            unique: true,
        },
    },
    relations: {
        note: {
            target: "Note",
            type: "one-to-many",
            inverseSide: "Wilder",
        }
    }
});