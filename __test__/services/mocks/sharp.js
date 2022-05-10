const Sharp = jest.fn().mockImplementation(() => ({
	resize: jest.fn().mockReturnThis(),
	toBuffer:jest.fn().mockReturnThis()
}));

module.exports = Sharp;