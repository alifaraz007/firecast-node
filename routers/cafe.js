const express = require('express');
const router = express.Router();
const db = require('../config');
const cafeCollection = db.collection('cafes');

router.get('/list', async (req, res, next) => {
    try {
        const cafesSnapshot = await cafeCollection.get();
        const cafes = [];
        cafesSnapshot.docs.forEach((doc) => {
            cafes.push({
                id: doc.id,
                data: doc.data()
            });
        });
        res.json(cafes);
    } catch (err) {
        next(err);
    }
})

router.post('/add', async (req, res, next) => {
    try {
        const name = req.body.name;
        const city = req.body.city;
        if (!name || !city) throw new Error('fill all fields');
        const data = {
            name,
            city
        };
        const ref = await cafeCollection.add(data);
        const cafes = await cafeCollection.doc(ref.id).get()
        if (!cafes.exists) res.json('something went wrong');
        res.json({
            data: cafes.data()
        });
    } catch (err) {
        next(err);
    }
})

router.get('/getById/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const cafes = await cafeCollection.doc(id).get()
        if (!cafes.exists) res.json('no doc found');
        res.json({
            data: cafes.data()
        })
    } catch (err) {
        next(err);
    }
})

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const availabeDoc = await cafeCollection.doc(id).get();
        if (!availabeDoc.exists) throw new Error('there is no such doc');
        await cafeCollection.doc(id).delete();
        const deleteDoc = await cafeCollection.doc(id).get();
        if (deleteDoc.exists) throw new Error('something went wrong');
        res.json(`deleted doc by id ${id}`);
    } catch (err) {
        next(err);
    }
})

router.put('/update/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const city = req.body.city;
        if (!name && !city) throw new Error('fill one field is required');
        const data = {
            name,
            city
        }
        const availabeDoc = await cafeCollection.doc(id).get();
        if (!availabeDoc.exists) throw new Error('there is no such doc');
        await cafeCollection.doc(id).update(data);
        const updatedDoc = await cafeCollection.doc(id).get();
        res.json({
            id,
            data: updatedDoc.data()
        })
    } catch (err) {
        next(err);
    }
})

module.exports = router;