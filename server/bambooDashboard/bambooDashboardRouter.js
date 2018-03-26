'use strict';
const router = require('express').Router();
const bambooDashboardCtrl = require('./bambooDashboardController');

router.get('/getTools/:username/:rigletName', (req, res) => {
  let { username, rigletName} = req.params;
  try {
    bambooDashboardCtrl.getTools(
      req.params.username,
      req.params.rigletName ,
      (result) => {
        res.status(200).send(result);
      },
      (err) => {
        res.status(500).json({
          error: 'retrieving tool(s) failed'
        });
      }
    );
  } catch(err) {
    res.status(500).json({
      error: 'internal server error'
    });
  }
});



// router.get('/getProjects',bambooDashboardCtrl.getProjects);
// router.post('/getPlanDetails',bambooDashboardCtrl.getPlanDetails);
// router.post('/getPlans',bambooDashboardCtrl.getPlans);

module.exports = router;
