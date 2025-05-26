import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import defaultData from "../../db.json";

const db = new Low(new JSONFile("db.json"), defaultData);

export default db;
