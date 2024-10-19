const dbPool = require("../utils/db.js");

class AuthorsBooks {
    static getAllAuthorsBooks(data = {}){
        const sql ={
            query: `
                SELECT 
                    aut.id,
                    aut.name,
                    aut.bio,
                    aut.birth_date,
                    bok.id,
                    bok.title,
                    bok.description,
                    bok.publish_date
                FROM authors aut
                JOIN books bok ON aut.id = bok.author_id
                WHERE 1`,
            params: []
        }

        if (data.id) {
            sql.query += ` AND aut.id = ?`;
            sql.params.push(data.id);
        }

        return dbPool.query(sql.query, sql.params);
    }
}

module.exports = AuthorsBooks;