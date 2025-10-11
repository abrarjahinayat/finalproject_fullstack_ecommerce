const addbannerControllers = (req, res) => {
  res.send(req.files);
  res.send(req.body);
}


module.exports = addbannerControllers;