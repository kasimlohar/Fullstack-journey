// Higher-order function for better stack traces
module.exports = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      // Add additional context to errors
      err.route = {
        path: req.route?.path,
        stack: req.route?.stack?.map(layer => layer.name)
      };
      next(err);
    });
  };