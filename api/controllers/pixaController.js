const sendLog = require('../myEvents.js');
const axios = require("axios");
const consts = require('../constants.js' );
const { send } = require('express/lib/response');
const KEY = consts.PIXA_KEY;
const url = `https://pixabay.com/api/?key=${KEY}&q=`
const sortByDate = `&order=latest` // sort the images by date (newest first).
const pagination = `&per_page=9&page=` // only the first 9 elements from the array.

exports.pixaController = {
    getByCategory(req, res) {
        const pageNum = parseInt(req.params.page) //page number received as a request parameter
        const category = req.params.category //category received as a request parameter
        if (!(pageNum<1)) { 
            axios({
                method: "Get",
                url: `${url}${category}${sortByDate}${pagination}${pageNum}`,
            })
                .then((response) => {
                    sendLog.successGET(); //save logs using pre-defined events
                    res.json(response.data.hits).status(200);
                })
                .catch(err => console.log(err));
        }
        else{
            sendLog.failGET(); //save logs using pre-defined events
            res.status(404).send("Error! Wrong query parameter inserted");
        }
    }
};
