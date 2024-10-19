const dbPool = require("../utils/db.js");

class Authors {
    static getAllAuthors(data = {}){
        const sql ={
            query: `
                SELECT 
                    id,
                    name,
                    bio,
                    birth_date
                FROM authors
                WHERE 1`,
            params: []
        }

        if (data.id) {
            sql.query += ` AND id = ?`;
            sql.params.push(data.id);
        }

        return dbPool.query(sql.query, sql.params);
    }

    static createAuthors(data){
        const sql = {
            query: `INSERT INTO authors (name, bio, birth_date) VALUE(?, ?, ?)`,
            params: [data.name, data.bio, data.birth_date],
        };

        return dbPool.query(sql.query, sql.params);
    }

    static updateAuthors(data){
        const sql = {
            query: `UPDATE authors SET name = ?, bio = ?, birth_date = ? WHERE id = ?`,
            params: [data.name, data.bio, data.birth_date, data.id],
        };

        return dbPool.query(sql.query, sql.params);
    }

    static deleteAuthors(id){
        const sql = {
            query: `DELETE FROM authors WHERE id = ?`,
            params: [id],
        };

        return dbPool.query(sql.query, sql.params);
    }
}

module.exports = Authors;