// const catchAsync = fn => {
//   return (req, res , next) => {
//     fn(req,res,next).catch(next); // ahiya next lakhvathi automatic global error handling middleware ma jase
//   };
// };

module.exports = fn => {
  return (req, res , next) => {
    fn(req,res,next).catch(next); // ahiya next lakhvathi automatic global error handling middleware ma jase
  };
};