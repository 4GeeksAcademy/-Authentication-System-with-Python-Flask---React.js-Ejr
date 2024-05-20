import React from "react";
import { Link } from "react-router-dom";
import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';


export const Cloudinary = () => {
    const cld = new Cloudinary({ cloud: { cloudName: 'ddfq21pdb' } });

    const { Router } = require("express");
    const router = Router();

    const Photo = requiere("../models/Photo");

    const cloudinary = require("cloudinary");
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const fs = require('fs-extra'); 

//  ------------  consultar almacenamiento de fotos------
    router.get('/', async (req, res) => {
        const photos = await Photo.find();
        print(photos)
        res.render('images');
    });

    router.get('/images/add', (req, res) => {
        res.render('image/form');
    });

    router.get('https://animated-space-rotary-phone-4jjrqv5q45xx2qvgw-3000.app.github.dev/images/add', async (req, res) => {
        const { title, description } = req.body;
        const result = await cloudinary.v2.uploader.uploas(req.file.path);
        const newPhoto = new Photo({
            title,
            description,
            imagesURL: result.url,
            public_id: result.public_id
        });
        await newPhoto.save();
        fs.unlink(req.fie.path);
        res.send('Received');
    });


    return (<AdvancedImage cldImg={img} />);






};




