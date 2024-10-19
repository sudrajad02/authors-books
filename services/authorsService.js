const Authors = require("../models/authors.js");
const response = require("../utils/response.js");

class authorsService {   
    static async getAuthors(req, res) {
        try {
            const [author] = await Authors.getAllAuthors({ id: req.params.id })

            if (author.length <= 0 && req.params.id) {
                throw {
                    message: "Data tidak ditemukan!"
                }
            } else if (author == 0) {
                throw {
                    message: "Data masih kosong!"
                }
            }

            return response(res, 200, "success", req.params.id ? author[0]:author)
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }

    static async createAuthors(req, res) {
        try {
            const [author] = await Authors.createAuthors(req.body);
            
            const tmp = {
                id: author.insertId 
            }
    
            return response(res, 200, "success", tmp)
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }

    static async updateAuthors(req, res) {
        try {
            const [author] = await Authors.updateAuthors({ ...req.body, id: req.params.id });
            
            const tmp = {
                change_row: author.changedRows 
            }
    
            return response(res, 200, "success", tmp)
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }

    static async deleteAuthors(req, res) {
        try {
            const [author] = await Authors.deleteAuthors(req.params.id);
            
            const tmp = {
                affected_row: author.affectedRows 
            }
    
            return response(res, 200, "success", tmp)
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }
}

module.exports = authorsService