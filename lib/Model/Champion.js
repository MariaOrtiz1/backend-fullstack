import pool from "../utils/pool.js";

export default class Champion {
    id;
    name;
    title;
    quote;
    region;
    position;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.title = row.title;
        this.quote = row.quote;
        this.region = row.region;
        this.position = row.position;
    }

    static async insert({ name, title, quote, region, position }) {
        const { rows } = await pool.query(
            'INSERT INTO lolchampions (name, title, quote, region, position) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, title, quote, region, position]
        );

        return new Champion(rows[0]);
    }
}