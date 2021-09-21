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

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM lolchampions WHERE id=$1', [id]);

            return new Champion(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * from lolchampions');

        return rows.map((row) => new Champion(row));
    }

    static async updateById(id, { name, title, quote, region, position }) {
        const existingChampion = await Champion.getById(id);
        const newName = name ?? existingChampion.name;
        const newTitle = title ?? existingChampion.title;
        const newQuote = quote ?? existingChampion.quote;
        const newRegion = region ?? existingChampion.region;
        const newPosition = position ?? existingChampion.position;

        const { rows } = await pool.query(
            'UPDATE lolchampions SET name=$1, title=$2, quote=$3, region=$4, position=$5 WHERE id=$6 RETURNING *',
            [newName, newTitle, newQuote, newRegion, newPosition, id]
            );

        return new Champion(rows[0]);
    }
}