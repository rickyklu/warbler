/* errorHandler if user went to the wrong route */
function errorHandler(error, request, response, next) {
	return response.status(error.status || 500).json({
		error: {
			message: error.message || 'Reached error, Something went wrong.'
		}
	});
}

module.exports = errorHandler;
