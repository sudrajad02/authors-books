const AuthorsBooks = require("../models/authorBooks.js");
const response = require("../utils/response.js");

class booksService {   
    static async getAllAuthorsBooks(req, res) {
        try {
            const [author] = await AuthorsBooks.getAllAuthorsBooks({ id: req.params.id })

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
                const indexAutBok = tmp.findIndex(x => x.id == item.author_id)

                if (indexAutBok == -1) {
                    tmp.push({
                        id: item.author_id,
                        name: item.name,
                        bio: item.bio,
                        birth_date: item.birth_date,
                        books: [{
                            id: item.id,
                            title: item.title,
                            description: item.description,
                            publish_date: item.publish_date,
                        }]
                    })
                } else {
                    tmp[indexAutBok].books.push({
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        publish_date: item.publish_date,
                    })
                }
            }

            return response(res, 200, "success", req.params.id ? tmp[0]:tmp)
        } catch (error) {
            return response(res, 400, "error", error)
        }
    }
}

module.exports = booksService;