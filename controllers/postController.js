const Post = require('../models/Post');
const Op = require('../databases/database').Op;


//Insert Post
exports.create = async function (req, res, next) {
    const {title, created_at, updated_at, post_typ, description, fee, fee_typ, city, quarter, status, rating, useremail, categorieid, phone_number} = req.body;
    try {
        let newPost = await Post.create({
            title,
            created_at,
            updated_at,
            post_typ,
            description,
            fee,
            fee_typ,
            city,
            quarter,
            status: "active",
            rating: 5,
            useremail,
            categorieid,
            phone_number,
            count_view: 0
        }, {
            fields: ["title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quarter", "status", "rating", "useremail", "categorieid", "phone_number", "count_view"]
        });
        if (newPost) {
            res.send({
                result: 'ok',
                data: newPost
            });
        } else {
            res.send({
                result: 'failed',
                data: null,
                message: `Insert a new Post failed`
            });
        }
    } catch (error) {
        res.send({
            result: 'failed',
            data: null,
            message: `Insert a new Post failed. Error: ${error}`
        });
    }
};

//Query all Posts from DB
exports.readAll = async function (req, res, next) {
    try {
        await Post.findAll({
            attributes: ["id", "title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quarter", "status", "rating", "useremail", "categorieid", "phone_number", "count_view"],
        }).then(posts => {
            res.json({
                result: 'ok',
                data: posts,
                length: posts.length,
                message: "Query list of Posts successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: null,
            length: 0,
            message: `Query list of Posts failed. Error ${error}`
        });
    }
};

//Query all active Posts from DB
exports.readAllActive = async function (req, res, next) {
    try {
        await Post.findAll({
            attributes: ["id", "title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quarter", "status", "rating", "useremail", "categorieid", "phone_number", "count_view"],

            where: {
                status: 'active'
            },

        }).then(posts => {
            res.json({
                result: 'ok',
                data: posts,
                length: posts.length,
                message: "Query list of Posts successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: null,
            length: 0,
            message: `Query list of Posts failed. Error ${error}`
        });
    }
};

//Query all created Posts from DB
exports.readAllCreated = async function (req, res, next) {
    try {
        await Post.findAll({
            attributes: ["id", "title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quarter", "status", "rating", "useremail", "categorieid", "phone_number", "count_view"],

            where: {
                status: 'created'
            },

        }).then(posts => {
            res.json({
                result: 'ok',
                data: posts,
                length: posts.length,
                message: "Query list of Posts successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: null,
            length: 0,
            message: `Query list of Posts failed. Error ${error}`
        });
    }
};

//Query all deleted Posts from DB
exports.readAllDeleted = async function (req, res, next) {
    try {
        await Post.findAll({
            attributes: ["id", "title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quarter", "status", "rating", "useremail", "categorieid", "phone_number", "count_view"],

            where: {
                status: 'deleted'
            },

        }).then(posts => {
            res.json({
                result: 'ok',
                data: posts,
                length: posts.length,
                message: "Query list of Posts successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: null,
            length: 0,
            message: `Query list of Posts failed. Error ${error}`
        });
    }
};


//Query all archivated Posts from DB
exports.readAllArchivated = async function (req, res, next) {
    try {
        await Post.findAll({
            attributes: ["id", "title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quarter", "status", "rating", "useremail", "categorieid", "phone_number", "count_view"],

            where: {
                status: 'archivated'
            },

        }).then(posts => {
            res.json({
                result: 'ok',
                data: posts,
                length: posts.length,
                message: "Query list of Posts successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: null,
            length: 0,
            message: `Query list of Posts failed. Error ${error}`
        });
    }
};

//Query Post by given id
exports.findById = async function (req, res, next) {
    const {id} = req.params;
    try {
        await Post.findOne({
            attributes: ["id", "title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quarter", "status", "rating", "useremail", "categorieid", "phone_number", "count_view"],
            where: {
                id: id
            },
        }).then(post => {
            res.json({
                result: 'ok',
                data: post,
                message: "Query Post by id successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: null,
            message: `Query Post by id failed. Error ${error}`
        });
    }
};

//Query Posts by given useremail
exports.findByUsermail = async function (req, res, next) {
    const {useremail} = req.params;
    try {
        await Post.findAll({
            attributes: ["id", "title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quarter", "status", "rating", "useremail", "categorieid", "phone_number", "count_view"],
            where: {
                useremail: useremail,
                status: {
                    [Op.ne]: 'deleted'
                }
            },
        }).then(posts => {
            res.json({
                result: 'ok',
                data: posts,
                message: "Query Post by useremail successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Post by useremail failed. Error ${error}`
        });
    }
};

//Query Posts by given categorieid
exports.findByCategorieId = async function (req, res, next) {
    const {categorieid} = req.params;
    try {
        await Post.findAll({
            attributes: ["id", "title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quarter", "status", "rating", "useremail", "categorieid", "phone_number", "count_view"],
            where: {
                categorieid: categorieid,
                status: {
                    [Op.ne]: 'deleted'
                }
            },
        }).then(posts => {
            res.json({
                result: 'ok',
                data: posts,
                message: "Query Categorie by categorieid successfully"
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Query Categorie by categorieid failed. Error ${error}`
        });
    }
};

//Update Post
exports.update = async function (req, res, next) {
    const {id} = req.params;
    const {title, created_at, updated_at, post_typ, description, fee, fee_typ, city, quarter, status, rating, useremail, categorieid, phone_number, count_view} = req.body;
    try {
        await Post.findOne({
            where: {id: id},
            attributes: ["id", "title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quarter", "status", "rating", "useremail", "categorieid", "phone_number", "count_view"],
        }).then(async post => {
            await post.update({
                title: title ? title : post.title,
                created_at: created_at ? created_at : post.created_at,
                updated_at: updated_at ? updated_at : post.updated_at,
                post_typ: post_typ ? post_typ : post.post_typ,
                description: description ? description : post.description,
                fee: fee ? fee : post.fee,
                fee_typ: fee_typ ? fee_typ : post.fee_typ,
                city: city ? city : post.city,
                quarter: quarter ? quarter : post.quarter,
                status: status ? status : post.status,
                rating: rating ? rating : post.rating,
                useremail: useremail ? useremail : post.useremail,
                categorieid: categorieid ? categorieid : post.categorieid,
                phone_number: phone_number ? phone_number : post.phone_number,
                count_view: count_view ? count_view : post.count_view
            });

            res.json({
                result: 'ok',
                data: post,
                message: 'Update post successfully'
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: null,
            message: `Cannot find post to update. Error: ${error}`
        });
    }
};

//Update Post
exports.updateViewCount = async function (req, res, next) {
    const {id} = req.params;
    console.log('PostView-ID: ' + id);
    try {
        await Post.findOne({
            where: {id: id},
            attributes: ["id", "title", "created_at", "updated_at", "post_typ", "description", "fee", "fee_typ", "city", "quarter", "status", "rating", "useremail", "categorieid", "phone_number", "count_view"],
        }).then(async post => {
            console.log('PostView: ' + JSON.stringify(post));

            let viewCount = post.count_view + 1;
            let newPost = await post.update({
                title: post.title,
                created_at: post.created_at,
                updated_at: post.updated_at,
                post_typ: post.post_typ,
                description: post.description,
                fee: post.fee,
                fee_typ: post.fee_typ,
                city: post.city,
                quarter: post.quarter,
                status: post.status,
                rating: post.rating,
                useremail: post.useremail,
                categorieid: post.categorieid,
                phone_number: post.phone_number,
                count_view: viewCount
            });
            if(newPost) {
                res.json({
                    result: 'ok',
                    data: newPost,
                    message: 'Update post successfully'
                });
            }else{
                res.json({
                    result: 'failed',
                    data: null,
                    message: `Cannot find post to update. Error: ${error}`
                });
            }
        });
    } catch (error) {
        res.json({
            result: 'failed',
            data: null,
            message: `Cannot find post to update. Error: ${error}`
        });
    }
};

//Delete a Post
exports.delete = async function (req, res, next) {
    const {id} = req.params;
    try {
        await Post.destroy({
            where: {
                id
            }
        }).then(numberOfdeletedRows => {
            res.json({
                result: 'ok',
                message: 'Delete a Post successfully',
                count: numberOfdeletedRows
            });
        });
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Delete a Post failed. Error ${error}`,
            count: 0
        });
    }
};