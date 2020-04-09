exports.success = (res, data, message = "Successfull") => {
  res.json({
    status: true,
    message,
    data,
  });
};

exports.failed = (res, code, message) => {
  res.status(code).json({
    status: false,
    message,
  });
};
