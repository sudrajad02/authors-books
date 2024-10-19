const dbPool = require("../utils/db.js");

class Books {
    static getAllBooks(data = {}){
        const sql ={
            query: `
                SELECT 
                    bok.id,
                    bok.title,
                    bok.description,
                    bok.publish_date,
                    bok.author_id,
                    aut.name,
                    aut.bio,
                    aut.birth_date
                FROM books bok
                JOIN authors aut ON bok.author_id = aut.id
                WHERE 1`,
            params: []
        }

        if (data.id) {
            sql.query += ` AND bok.id = ?`;
            sql.params.push(data.id);
        }

        return dbPool.query(sql.query, sql.params);
    }

    static createBooks(data){
        const sql = {
            query: `INSERT INTO books (title, description, publish_date, author_id) VALUE(?, ?, ?, ?)`,
            params: [data.title, data.description, data.publish_date, data.author_id],
        };

        return dbPool.query(sql.query, sql.params);
    }

    static updateBooks(data){
        const sql = {
            query: `UPDATE books SET title = ?, description = ?, publish_date = ?, author_id = ? WHERE id = ?`,
            params: [data.title, data.description, data.publish_date, data.author_id, data.id],
        };

        return dbPool.query(sql.query, sql.params);
    }

    static deleteBooks(id){
        const sql = {
            query: `DELETE FROM books WHERE id = ?`,
            params: [id],
        };

        return dbPool.query(sql.query, sql.params);
    }
}

module.exports = Books;