const router = require("express").Router();
const multer = require("multer"); 
const Uploads = require("../Models/Upload");
const { catchError, sendError } = require("../utils/helper.js");
const cloudinary = require("cloudinary").v2;
const upload = multer({ dest: 'uploads/' }); 
  
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


router.post("/addFile", upload.single('category_image'), async (req, res) => {
    try {
        const category_image = req.file;

        if (!category_image) {
            return sendError(res, "File Image is missing!");
        }

        const uploadResult = await cloudinary.uploader.upload(category_image.path)

        const uploadEntry  = new Uploads({
            postedById: req.body.userId,
            category_image:uploadResult.url
        })

        await uploadEntry.save()

        res.status(200).send({
            success: true,
            message: "Added File Successfully",
          });

    } catch (error) {
        console.error(error);
        catchError(res, "Error in Adding File", error);
    }
})


module.exports = router;