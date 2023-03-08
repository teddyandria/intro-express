//ce fichier permet la récuperation de données

import { DataSource } from "typeorm";
import WilderEntity from "../entity/Wilder.entity";
import LanguageEntity from "../entity/Language.entity";
import NoteEntity from "../entity/Note.entity";

export default new DataSource({
    type: "sqlite",
    database: "./wildersdb.sqlite",
    synchronize: true,
    entities: [WilderEntity, LanguageEntity, NoteEntity],
    logging: ["query", "error"],
})