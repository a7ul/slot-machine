const url = require('url');
const {randomResultHandler, staticFileHandler, notFoundHandler} = require('./handlers');

const router = (req, res) => {
  const {pathname} = url.parse(req.url);
  const [blank, routeName, ...pathParams] = pathname.split('/'); //eslint-disable-line no-unused-vars

  switch (routeName) {
    case 'result':{
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify(randomResultHandler()));
    }
    case 'public':{
      const filePath = pathParams.join('/');
      return staticFileHandler(filePath).then((data)=>{
        res.statusCode = 200;
        res.end(data);
      }).catch((err) => {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(err));
      });
    }
    default:{
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify(notFoundHandler()));
    }
  }
};

module.exports = router;
