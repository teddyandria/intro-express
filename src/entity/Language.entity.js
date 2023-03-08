import { EntitySchema } from "typeorm";

export default new EntitySchema({
    name: "Language",
    tableName: "languages",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        label: {
            type: "text",
            unique: true,
        }
    },
    relations: {
        notes: {
            target: "Note",
            type: "one-to-many",
            inverseSide: "Language",
        }
    }
})