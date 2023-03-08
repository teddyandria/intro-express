import { EntitySchema } from "typeorm"

export default new EntitySchema({
    name: "Note",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        note: {
            type: "int",
        },
    },
    relations: {
        language: {
            target: "Language",
            type: "many-to-one",
            inverseSide: "Note",
            eager: true,
            onDelete: "CASCADE",
        },

        wilder: {
            target: "Wilder",
            type: "many-to-one",
            eager: true, //peupler/hydrater les données
            joinColumn: true, //  important pour récuperer la clé etrangère
            onDelete: "CASCADE",
        }
    }
})