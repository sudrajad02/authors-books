const Books = require("../models/books.js");
const response = require("../utils/response.js");

class booksService {   
    static async getBooks(req, res) {
        try {
            const [author] = await Books.getAllBooks({ id: req.params.id })

            if (author.length <= 0 && req.params.id) {
                throw {
                    message: "Data tidak ditemukan!"
                }
            } else if (author == 0) {
                throw {
                    message: "Data masih kosong!"
                }
            }

            const tmp = []

            for (const item of author) {
                tmp.push({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    publish_date: item.publish_date,
                    author: {
                        id: item.author_id,
                        name: item.name,
                        bio: item.bio,
                        birth_date: item.birth_date
                    },
                })
            }

            return response(res, 200, "success", req.params.id ? tmp[0]:tmp)
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }

    static async createBooks(req, res) {
        try {
            const [author] = await Books.createBooks(req.body);
            
            const tmp = {
                id: author.insertId 
            }
    
            return response(res, 200, "success", tmp)
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }

    static async updateBooks(req, res) {
        try {
            const [author] = await Books.updateBooks({ ...req.body, id: req.params.id });
            
            const tmp = {
                change_row: author.changedRows 
            }
    
            return response(res, 200, "success", tmp)
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }

    static async deleteBooks(req, res) {
        try {
            const [author] = await Books.deleteBooks(req.params.id);
            
            const tmp = {
                affected_row: author.affectedRows 
            }
    
            return response(res, 200, "success", tmp)
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }
}

module.exports = booksService;