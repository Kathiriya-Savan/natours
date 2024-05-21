const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};
/*************************************************************************************************/

exports.getAllTours = factory.getAll(Tour);

/*exports.getAllTours = catchAsync(async (req, res, next) => {
  // try {
    // const tours = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy'
    // })

    // const tours = await query
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    //console.log(req.query);

    // BUILD THE QUERY
    // // 1A) Filtering
    // const queryObj = { ...req.query };
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // excludedFields.forEach((el) => delete queryObj[el]);

    // //console.log(req.query , queryObj);

    // //1B) Advanced Filtering
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));

    // // { difficulty: 'easy' , duration: { $gte: 5 } }
    // // { difficulty: 'easy' , duration: { gte: '5'} }

    // // const query =  Tour.find(queryObj);

    // let query = Tour.find(JSON.parse(queryStr));

    //2) Sorting
    // if(req.query.sort){
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   query = query.sort(sortBy);
    // }else{
    //   query = query.sort('-createdAt')
    // }

    //3) Field limiting
    // if(req.query.fields){
    //   const fields = req.query.fields.split(',').join(' ');
    //   query = query.select(fields);
    // }else{
    //   query = query.select('-__v');
    // }

    //4) Pagination
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;

    //  query = Tour.find().skip(skip).limit(limit);
    //const data = await  Tour.find().skip(skip).limit(limit);

    // if(req.query.page){
    //   const numTours = await Tour.countDocuments();
    //   if( skip >= numTours) throw new Error('This page does not exists')
    // }

    // EXECUTE THE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'Success',
      results: tours.length,
      data: {
        tours,
      },
    });
  // } catch (err) {
  //   res.status(400).json({
  //     status: 'fail',
  //     message: err,
  //   });
  // }
});*/

/****************************************************************************************************/

exports.getTour = factory.getOne(Tour , { path: 'reviews' });

/*exports.getTour = catchAsync(async (req, res, next) => {
  // try {
    const tour = await Tour.findById(req.params.id).populate('reviews');
    //Tour.findOne( {_id: req.params.id} )

    if(!tour){
      return next(new AppError('No tour found with that Id' , 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  // } catch (err) {
  //   res.status(400).json({
  //     status: 'fail',
  //     message: err,
  //   });
  // }
});*/

// exports.getTourStats = async (req, res) => {
//   try {
//     const stats = await Tour.aggregate([
//       {
//         $match: { ratingsAverage: { $gte: 4.5 } },
//       },
//       {
//         $group: {
//           _id: null,
//           avgRating: { $avg: '$ratingsAverage' },
//           avgPrice: { $avg: '$price' },
//           minPrice: { $min: '$price' },
//           maxPrice: { $max: '$price' },
//         },
//       },
//     ]);
//     res.stats(200).json({
//       status: 'success',
//       data: {
//         stats
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// const catchAsync = fn => {
//   return (req, res , next) => {
//     fn(req,res,next).catch(next); // ahiya next lakhvathi automatic global error handling middleware ma jase
//   };
// };

/**********************************************************************************************/

exports.createTour = factory.createOne(Tour);

/*exports.createTour = catchAsync(async (req, res , next) => {

  const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tours: newTour,
      },
    });

  //console.log(req.body);

 // try {
    // const newTour = new Tour({})
    // newTour.save()

  //   const newTour = await Tour.create(req.body);

  //   res.status(201).json({
  //     status: 'success',
  //     data: {
  //       tours: newTour,
  //     },
  //   });
  // } catch (err) {
  //   console.log(err);
  //   res.status(400).json({
  //     status: 'fail',
  //     message: err,
  //   });
  // }
}); */
/****************************************************************************************/

  exports.updateTour = factory.updateOne(Tour);

/*exports.updateTour = catchAsync(async (req, res, next) => {
  // try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  // } catch (err) {
  //   res.status(400).json({
  //     status: 'fail',
  //     message: err,
  //   });
  // }
});*/
/********************************************************************************/

exports.deleteTour = factory.deleteOne(Tour);

/*
exports.deleteTour = catchAsync(async (req, res, next) => {
  // try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  // } catch (err) {
  //   res.status(400).json({
  //     status: 'fail',
  //     message: err,
  //   });
  // }
});
*/

/*********************************************************************************************/

exports.getTourStats = catchAsync(async (req, res, next) => {
  //try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingaAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      {
        $sort: { avgPrice: 1 }
      }
      // {
      //   $match: { _id: { $ne: 'EASY' } }
      // }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: err
  //   });
  // }
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  //try {
    const year = req.params.year * 1; // 2021

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' }
        }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: { numTourStarts: -1 }
      },
      {
        $limit: 12
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    });
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: err
  //   });
  // }
});
