const express = require("express");
const router = express.Router();

const User=require('../controllers/UserController');
const Team=require('../controllers/TeamController');



router.get('/api/users',User.UserPagination)
router.get('/api/users/:id',User.getUserById)
router.post('/api/users',User.createNewUser)
router.put('/api/users/:id',User.updateUser)
router.delete('/api/users/:id',User.deleteUser)


router.post('/api/team',Team.CreateTeam)
router.get('/api/team/:id',Team.getTeamById)
router.get('/api/teams',Team.getAllTeams)

router.put('/api/teams/:id',Team.UpdateUsersList)





router.get('/test-me', function (req, res) {
    res.json('My First ever api!')
});




module.exports = router;