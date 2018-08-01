const Participants = require('../models/user').Participants
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports=function(app){
    app.get('/impactbyte/participants', (req, res) => {
        Participants.find({}, (err, participants) => {
            if(err)
            return res.send(err)
            res.json(participants)
        })
    })
    app.get('/impactbyte/participants/:id', (req, res) => {
        Participants.find({'_id': req.params.id}, (err, participants) => {
            if(err)
            return res.send(err)
            res.json(participants)
        })
    })
    app.post('/impactbyte/participants/add', (req, res) => {
        const participants = new Participants()
        bcrypt.hash(req.body.Password, 12, function(err, hash) {
                
                participants.Name = req.body.Name
                participants.Email = req.body.Email
                participants.Phone = req.body.Phone
                participants.Address = req.body.Address
                participants.Batch = req.body.Batch
                participants.Username = req.body.Username
                participants.Password = hash
        
                console.log(req.body.Name)
                participants.save((err, participants) => {
                    if(err)
                    return res.send(err)
                    res.json({'status': 'OK!', data: participants})
                })
            })
        })
        
        
    app.post('/impactbyte/participants/auth', (req, res, next) => {
        Participants.findOne({Email : req.body.Email}, (err, participants) => {
            if(err){
                next(err)
            }
            else {
                if(bcrypt.compareSync(req.body.Password, participants.Password)){
                    const token = jwt.sign({id: participants._id}, req.app.get('impactbyte'), {expiresIn: '1h'})
                    res.json({'status': 'OK!', data: participants, token: token})
                }
                else {
                    res.json({status:'ERROR!'})
                }
            }
        })
            
        })
     
    app.put('/impactbyte/participants/edit', (req, res) => {
        Participants.findById(req.body.id, (err, participants) => {
            if(err)
            return res.send(err)
        participants.Name = req.body.Name
        participants.Email = req.body.Email
        participants.Phone = req.body.Phone
        participants.Address = req.body.Address
        participants.Batch = req.body.Batch
        participants.Username = req.body.Username
        participants.Password = req.body.Password

        participants.save((err, participants) => {
            if(err)
            return res.send(err)
            res.json({'status':'OK!', data: participants})
        })
        
        })
    })
    app.delete('/impactbyte/participants/delete/:id', (req, res)=> {
        Participants.findById(req.params.id, (err, participants) => {
            if(err)
            return res.send(err)
            participants.remove((err) => {
                if(err)
                return res.send(err)
                res.json({'status': 'OK!'})
            })
    })
})
}