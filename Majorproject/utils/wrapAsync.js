/**
 * Async Error Handler Wrapper
 * Eliminates need for try/catch blocks in async route handlers
 */
module.exports = (fn) => {
  return (req, res, next) => {
    // Check if the function returns a promise
    const result = fn(req, res, next);
    
    // Handle async functions
    if (result instanceof Promise) {
      return result.catch((err) => {
        // Enhance error context
        err.request = {
          method: req.method,
          path: req.path,
          params: req.params,
          query: req.query
        };
        next(err);
      });
    }
    
    // Handle synchronous errors
    try {
      result;
    } catch (err) {
      next(err);
    }
  };
};