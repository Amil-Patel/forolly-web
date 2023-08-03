const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/src/Assets/upload')
    },
    filename: (req, file, cb) => {
        const str = file.originalname;
        const replacedStr = str.replace(/ /g, "_");
        console.log(replacedStr);
        cb(null, file.fieldname + "_" + Date.now() + replacedStr);
    }
});

const uploads = multer({ storage: storage });

app.get("/", (req, res) => {
    return res.json("From Server Side");
});

//CONNECTION DATABASE
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "forolly"
});

// --------------------------------------------USERS TABLE---------------------------------------------------  //

//GET USERS DATA
app.get("/users", (req, res) => {
    let uname = req.query.uname;
    const sql = `SELECT * FROM user WHERE uname='${uname}'`;
    connection.query(sql, (error, result) => {
        if (error) {
            console.log("Error Getting Data from users Table in server.js" + error);
        }
        return res.json(result);
    });
});

// ----------------------------------------BOTTOM SLIDER TABLE----------------------------------------------  //

//GET BOTTOM SLIDER DATA
app.get("/bot-slider", (req, res) => {
    const sql = "SELECT * FROM bot_slider";
    connection.query(sql, (error, result) => {
        if (error) {
            console.log("Error Getting Data Top Slider Table in server.js" + error)
        }
        return res.json(result);
    })
});

//ADD BOTTOM SLIDER DATA
app.post('/bot-slider', uploads.single('image'), (req, res) => {
    try {
        const imagePath = req.file.filename;
        const sql = "INSERT INTO bot_slider (image) VALUES (?)";
        const data = [imagePath];

        connection.query(sql, data, (error) => {
            if (error) {
                console.log("Error Adding bottom slider Data in server.js: ", error);
                return res.status(500).send("Error adding bottom slider data");
            } else {
                return res.sendStatus(200);
            }
        });
    } catch (error) {
        console.log("Error in server.js: ", error);
        return res.status(500).send("Internal server error");
    }
});

//DELETE BOTTOM SLIDER DATA
app.delete("/bot-slider/:id", (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM bot_slider WHERE id=${id}`;
    connection.query(sql, (error) => {
        if (error) {
            console.log("Error Delete top slider Data in server.js" + error);
        }
        res.sendStatus(200);
    });
});

//EDIT BOTTOM SLIDER DATA
app.get("/bot-slider/:id", (req, res) => {
    let id = req.params.id;
    const sql = `SELECT * FROM bot_slider WHERE id=${id}`;
    connection.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.put('/bot-slider/:id', uploads.single('image'), (req, res) => {
    try {
        const id = req.params.id;
        let imagePath = ''
        if (req.file) {
            imagePath = req.file.filename;
            const sql = "UPDATE bot_slider SET image=? WHERE id=?";
            const data = [imagePath, id];

            connection.query(sql, data, (error) => {
                if (error) {
                    console.log("Error updating bottom slider data in server.js: ", error);
                    return res.status(500).send("Error updating bottom slider data");
                } else {
                    return res.sendStatus(200);
                }
            });

        }
    }
    catch (error) {
        console.log("Error in server.js: ", error);
        return res.status(500).send("Internal server error");
    }
})

// ----------------------------------------------BRAND TABLE-------------------------------------------------  //

//GET BRAND DATA
app.get("/brand", (req, res) => {
    const sql = "SELECT * FROM brand";
    connection.query(sql, (error, result) => {
        if (error) {
            console.log("Error Getting Data Brand Table in server.js" + error)
        }
        return res.json(result);
    })
});

//ADD BRAND DATA
app.post('/brand', uploads.single('image'), (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !req.file) {
            return res.status(400).send('Missing required fields');
        }

        const imagePath = req.file.filename;
        const sql = "INSERT INTO brand (name, image) VALUES (?, ?)";
        const data = [name, imagePath];

        connection.query(sql, data, (error) => {
            if (error) {
                console.log("Error Adding Brand Data in server.js: ", error);
                return res.status(500).send("Error adding Brand data"); // Sending an error response
            } else {
                return res.sendStatus(200); // Sending a success response
            }
        });
    } catch (error) {
        console.log("Error in server.js: ", error);
        return res.status(500).send("Internal server error");
    }
});

//DELETE BRAND DATA
app.delete("/brand/:id", (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM brand WHERE brand_id=${id}`;
    connection.query(sql, (error) => {
        if (error) {
            console.log("Error Delete Brand Data in server.js" + error);
        }
        res.sendStatus(200);
    });
});

//EDIT BRAND DATA
app.get("/brand/:id", (req, res) => {
    let id = req.params.id;
    const sql = `SELECT * FROM brand WHERE brand_id=${id}`;
    connection.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.put('/brand/:id', uploads.single('image'), (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;
        if (!name) {
            return res.status(400).send('Missing required fields');
        }
        let imagePath = ''
        if (req.file) {
            imagePath = req.file.filename;
            const sql = "UPDATE brand SET name=?, image=? WHERE brand_id=?";
            const data = [name, imagePath, id];

            connection.query(sql, data, (error) => {
                if (error) {
                    console.log("Error updating brand data in server.js: ", error);
                    return res.status(500).send("Error updating brand data");
                } else {
                    return res.sendStatus(200);
                }
            });

        }
        else {
            const sql = "UPDATE brand SET name=? WHERE brand_id=?";
            const data = [name, id];

            connection.query(sql, data, (error) => {
                if (error) {
                    console.log("Error updating brand data in server.js: ", error);
                    return res.status(500).send("Error updating brand data");
                } else {
                    return res.sendStatus(200);
                }
            });
        }
    }
    catch (error) {
        console.log("Error in server.js: ", error);
        return res.status(500).send("Internal server error");
    }
})

// --------------------------------------------CATEGORY TABLE-----------------------------------------------  //

//GET CATEGORY DATA
app.get("/category", (req, res) => {
    const sql = "SELECT * FROM category";
    connection.query(sql, (error, result) => {
        if (error) {
            console.log("Error Getting Data Brand Table in server.js" + error)
        }
        console.log(result)
        return res.json(result);
    })
});

//ADD CATEGORY DATA
app.post('/category', uploads.single('image'), (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description || !req.file) {
            return res.status(400).send('Missing required fields');
        }

        const imagePath = req.file.filename;
        const sql = "INSERT INTO category (name,description, image) VALUES (?,?, ?)";
        const data = [name, description, imagePath];

        connection.query(sql, data, (error) => {
            if (error) {
                console.log("Error Adding category Data in server.js: ", error);
                return res.status(500).send("Error adding category data");
            } else {
                return res.sendStatus(200);
            }
        });
    } catch (error) {
        console.log("Error in server.js: ", error);
        return res.status(500).send("Internal server error");
    }
});

//DELETE CATEGORY DATA
app.delete("/category/:id", (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM category WHERE cate_id=${id}`;
    connection.query(sql, (error) => {
        if (error) {
            console.log("Error Delete Category Data in server.js" + error);
        }
        res.sendStatus(200);
    });
});

//EDIT CATEGORY DATA
app.get("/category/:id", (req, res) => {
    let id = req.params.id;
    const sql = `SELECT * FROM category WHERE cate_id=${id}`;
    connection.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.put('/category/:id', uploads.single('image'), (req, res) => {
    try {
        const id = req.params.id;
        const { name, description } = req.body;
        if (!name && !description) {
            return res.status(400).send('Missing required fields');
        }
        let imagePath = ''
        if (req.file) {
            imagePath = req.file.filename;
            const sql = "UPDATE category SET name=?,description=?, image=? WHERE cate_id=?";
            const data = [name, description, imagePath, id];

            connection.query(sql, data, (error) => {
                if (error) {
                    console.log("Error updating category data in server.js: ", error);
                    return res.status(500).send("Error updating category data");
                } else {
                    return res.sendStatus(200);
                }
            });

        }
        else {
            const sql = "UPDATE category SET name=?,description=? WHERE cate_id=?";
            const data = [name, description, id];

            connection.query(sql, data, (error) => {
                if (error) {
                    console.log("Error updating category data in server.js: ", error);
                    return res.status(500).send("Error updating category data");
                } else {
                    return res.sendStatus(200);
                }
            });
        }
    }
    catch (error) {
        console.log("Error in server.js: ", error);
        return res.status(500).send("Internal server error");
    }
})

// --------------------------------------------PRODUCT TABLE-----------------------------------------------  //

//GET PRODUCT DATA
app.get("/product", (req, res) => {
    const sql = "SELECT * FROM product";
    connection.query(sql, (error, result) => {
        if (error) {
            console.log("Error Getting Data Product Table in server.js" + error)
        }
        return res.json(result);
    })
});

//ADD PRODUCT DATA
app.post('/product', uploads.single('image'), (req, res) => {
    try {
        const { brand_id, cate_id, title, short_desc, long_desc, status,slider,populer } = req.body;

        if (!brand_id || !cate_id || !title || !req.file) {
            return res.status(400).send('Missing required fields');
        }

        const imagePath = req.file.filename;
        const sql = "INSERT INTO product (brand_id, cate_id, title, short_desc, long_desc, image,status,slider,populer) VALUES (?,?,?,?,?,?,1,0,0)";
        const data = [brand_id, cate_id, title, short_desc, long_desc, imagePath, status,slider,populer];

        connection.query(sql, data, (error) => {
            if (error) {
                console.log("Error Adding product Data in server.js: ", error);
                return res.status(500).send("Error adding product data");
            } else {
                return res.sendStatus(200);
            }
        });
    } catch (error) {
        console.log("Error in server.js: ", error);
        return res.status(500).send("Internal server error");
    }
});

//DELETE PRODUCT DATA
app.delete("/product/:id", (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM product WHERE prod_id=${id}`;
    connection.query(sql, (error) => {
        if (error) {
            console.log("Error Delete Product Data in server.js" + error);
        }
        res.sendStatus(200);
    });
});

//EDIT PRODUCT STATUS
app.get('/product/:id/:number', uploads.single('image'), (req, res) => {
    let { id, number } = req.params;
    if (number === "1") {
        const sql = 'SELECT * FROM product WHERE status=1';
        connection.query(sql, (err, data) => {
            if (err) return res.json(err);
            return res.json(data);
        });
    }
    else if (number === "12") {
        const sql = `SELECT * FROM product WHERE status=1 LIMIT ${parseInt(number)}`;
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error fetching product data:', err);
                return res.json(err);
            }
            return res.json(data);
        })
    }
    else if (number === "2") {
        const sql = `SELECT * FROM product WHERE slider=1`;
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error fetching product data:', err);
                return res.json(err);
            }
            return res.json(data);
        })
    }
    else if (number === "4") {
        const sql = `SELECT * FROM product WHERE populer=1 LIMIT ${parseInt(number)}`;
        connection.query(sql, (err, data) => {
            if (err) {
                console.error('Error fetching product data:', err);
                return res.json(err);
            }
            return res.json(data);
        })
    }
    else {
        const sql = `SELECT * FROM product WHERE prod_id=${id}`;
        connection.query(sql, (err, data) => {
            if (err) return res.json(err);
            return res.json(data);
        });
    }
});
app.put('/product/:prodId/:num', uploads.single('image'), (req, res) => {
    const { prodId, num } = req.params;
    const { status,slider,populer } = req.body;

    if (num == 0) {
        const query = 'UPDATE product SET status=? WHERE prod_id=?';
        connection.query(query, [status, prodId, num], (error) => {
            if (error) {
                console.log('Error updating product status:', error);
                res.status(500).send('Error updating product status');
            } else {
                res.sendStatus(200);
            }
        });
    }
    else if (num == 1) {
        console.log(slider)
        const query = 'UPDATE product SET slider=? WHERE prod_id=?';
        connection.query(query, [slider, prodId, num], (error) => {
            if (error) {
                console.log('Error updating product slider:', error);
                res.status(500).send('Error updating product slider');
            } else {
                res.sendStatus(200);
            }
        });
    }
    else if (num == 2) {
        const query = 'UPDATE product SET populer=? WHERE prod_id=?';
        connection.query(query, [populer, prodId, num], (error) => {
            if (error) {
                console.log('Error updating product populer:', error);
                res.status(500).send('Error updating product populer');
            } else {
                res.sendStatus(200);
            }
        });
    }
    else {
        try {
            const { brand_id, cate_id, title, short_desc, long_desc } = req.body;
            if (!brand_id && !cate_id && !title && !short_desc && !long_desc) {
                return res.status(400).send("Missing required fields");
            }

            let imagePath = '';
            if (req.file) {
                imagePath = req.file.filename;
                const sql = "UPDATE product SET brand_id=?, cate_id=?, title=?, short_desc=?, long_desc=?, image=? WHERE prod_id=?";
                const data = [brand_id, cate_id, title, short_desc, long_desc, imagePath, prodId];
                connection.query(sql, data, (error) => {
                    if (error) {
                        console.log("Error updating product data in server.js: ", error);
                        return res.status(500).send("Error updating data");
                    } else {
                        return res.sendStatus(200);
                    }
                });
            }
            else {
                const sql = "UPDATE product SET brand_id=?, cate_id=?, title=?, short_desc=?, long_desc=? WHERE prod_id=?";
                const data = [brand_id, cate_id, title, short_desc, long_desc, prodId];
                connection.query(sql, data, (error) => {
                    if (error) {
                        console.log("Error updating product data in server.js: ", error);
                        return res.status(500).send("Error updating data");
                    } else {
                        return res.sendStatus(200);
                    }
                });
            }
        }
        catch (error) {
            console.log("Error in server.js: ", error);
            return res.status(500).send("Internal server error");
        }
    }
});


// --------------------------------------------NUTRITION TABLE-----------------------------------------------  //

//GET NUTRITION DATA
app.get('/nutrition', (req, res) => {
    const sql = "SELECT * FROM nutrition";
    connection.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

//ADD NUTRITION DATA
app.post('/nutrition/:prodId', (req, res) => {
    const { prodId } = req.params;
    const { energy, total_fat, saturated_fat, trans_fat, cholesterol, sodium, total_carbohydrates, protien } = req.body;
    const sql = "INSERT INTO nutrition (prod_id, energy, total_fat, saturated_fat, trans_fat, cholesterol, sodium, total_carbohydrates, protien) VALUES (?,?,?,?,?,?,?,?,?)";
    const data = [prodId, energy, total_fat, saturated_fat, trans_fat, cholesterol, sodium, total_carbohydrates, protien];
    connection.query(sql, data, (err, result) => {
        if (err) {
            console.error("Error adding record:", err);
            res.status(500).json({ error: "Error adding record" });
        } else {
            console.log("Records added: " + result.affectedRows);
            res.sendStatus(200);
        }
    });
});

//GET NUTRITION WITH ID 
app.get("/nutrition/:id", (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM nutrition WHERE prod_id=${id}`;
    connection.query(sql, (error, result) => {
        if (error) {
            console.error("Error adding record:", error);
            res.status(500).json({ error: "Error adding record" });
        }
        return res.json(result);
    });
})

//DELETE NUTRITION DATA
app.delete("/nutrition/:id", (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM nutrition WHERE prod_id=${id}`;
    connection.query(sql, (error) => {
        if (error) {
            console.log("Error Delete Product Data in server.js" + error);
        }
        res.sendStatus(200);
    });
});

//EDIT NUTRITION DATA
app.put("/nutrition/:id", (req, res) => {
    let id = req.params.id;
    const { energy, total_fat, saturated_fat, trans_fat, cholesterol, sodium, total_carbohydrates, protien } = req.body;
    let sql = `UPDATE nutrition SET energy=?, total_fat=?, saturated_fat=?, trans_fat=?, cholesterol=?, sodium=?, total_carbohydrates=?, protien=? WHERE prod_id=?`;
    const data = [energy, total_fat, saturated_fat, trans_fat, cholesterol, sodium, total_carbohydrates, protien, id];
    connection.query(sql, data, (error) => {
        if (error) {
            console.log("Error Updating category data in server.js" + error);
        }
        res.sendStatus(200);
    })
})

//CONTACT PAGE

app.get("/contact", (req, res) => {
    const sql = "SELECT * FROM contact";
    connection.query(sql, (error, result) => {
        if (error) {
            console.log("Error Getting Data Product Table in server.js" + error)
        }
        return res.json(result);
    })
});


app.post('/contact', (req, res) => {
    const { name, password, email, subject, message } = req.body;
    const sql = "INSERT INTO contact (name, password, email, subject, message) VALUES (?,?,?,?,?)";
    const data = [name, password, email, subject, message];
    connection.query(sql, data, (err, result) => {
        if (err) {
            console.error("Error adding record:", err);
            res.status(500).json({ error: "Error adding record" });
        } else {
            console.log("Records added: " + result.affectedRows);
            res.sendStatus(200);
        }
    });
});

//DELETE PRODUCT DATA
app.delete("/contact/:id", (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM contact WHERE id=${id}`;
    connection.query(sql, (error) => {
        if (error) {
            console.log("Error Delete Product Data in server.js" + error);
        }
        res.sendStatus(200);
    });
});


//GET INQUIRY DATA

app.get("/inquiry", (req, res) => {
    const sql = "SELECT * FROM inquiry";
    connection.query(sql, (error, result) => {
        if (error) {
            console.log("Error Getting Data Product Table in server.js" + error)
        }
        return res.json(result);
    })
});
app.post('/inquiry', (req, res) => {
    const { name, role, compeny_name, email, mobile_no, address, country, state, city, inquiry_type, message } = req.body;
    const sql = "INSERT INTO inquiry (name, role, compeny_name, email, mobile_no, address, country, state, city, inquiry_type, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const data = [name, role, compeny_name, email, mobile_no, address, country, state, city, inquiry_type, message];
    connection.query(sql, data, (err, result) => {
        if (err) {
            console.error("Error adding record:", err);
            res.status(500).json({ error: "Error adding record" });
        } else {
            console.log("Records added: " + result.affectedRows);
            res.sendStatus(200);
        }
    });
});




app.delete("/inquiry/:id", (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM inquiry WHERE id=${id}`;
    connection.query(sql, (error) => {
        if (error) {
            console.log("Error Delete Product Data in server.js" + error);
        }
        res.sendStatus(200);
    });
});




app.listen(1005, () => {
    console.log("Server Listening on port 1005");
});