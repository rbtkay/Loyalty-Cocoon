"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/KevinBoghossian/Git/Loyalty-Cocoon/pages/index.js?entry";


var Loyalty = function (_Component) {
    (0, _inherits3.default)(Loyalty, _Component);

    function Loyalty(props) {
        (0, _classCallCheck3.default)(this, Loyalty);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Loyalty.__proto__ || (0, _getPrototypeOf2.default)(Loyalty)).call(this, props));

        _this.state = {
            data: [{}]
        };
        return _this;
    }

    (0, _createClass3.default)(Loyalty, [{
        key: "componentDidMount",
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var response, data;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return fetch("http://localhost:8000/api/userAll");

                            case 2:
                                response = _context.sent;
                                _context.next = 5;
                                return response.json();

                            case 5:
                                data = _context.sent;

                                this.setState({ data: data });

                            case 7:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function componentDidMount() {
                return _ref.apply(this, arguments);
            }

            return componentDidMount;
        }()
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement("div", {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 22
                }
            }, _react2.default.createElement("h1", {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 23
                }
            }, "Hello, ", this.state.data[0]["user_name"]), _react2.default.createElement("h3", {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 24
                }
            }, "World this is a loyalty program based on blockchain!"), _react2.default.createElement("span", {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 25
                }
            }, "Trust Us..."), _react2.default.createElement("form", { method: "get", action: "http://localhost:8000/api/getUserByEmail", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 30
                }
            }, _react2.default.createElement("input", { type: "text", id: "txt", name: "userEmail", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 31
                }
            }), _react2.default.createElement("br", {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 32
                }
            }), _react2.default.createElement("input", { type: "password", name: "userPassword", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 33
                }
            }), _react2.default.createElement("input", { type: "submit", value: "submit", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 34
                }
            })));
        }
    }]);

    return Loyalty;
}(_react.Component);

exports.default = Loyalty;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiTG95YWx0eSIsInByb3BzIiwic3RhdGUiLCJkYXRhIiwiZmV0Y2giLCJyZXNwb25zZSIsImpzb24iLCJzZXRTdGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7Ozs7Ozs7O0lBRVYsQTtxQ0FFRjs7cUJBQUEsQUFBWSxPQUFPOzRDQUFBOzs0SUFBQSxBQUNULEFBRU47O2NBQUEsQUFBSztrQkFDSyxDQUpLLEFBR2YsQUFBYSxBQUNILEFBQUM7QUFERSxBQUNUO2VBRVA7Ozs7Ozs7Ozs7Ozs7dUNBR3dCLE07O2lDQUFqQjtBOzt1Q0FDYSxTLEFBQUEsQUFBUzs7aUNBQXRCO0EsZ0RBQ0o7O3FDQUFBLEFBQUssU0FBUyxFQUFFLE1BQWhCLEFBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQ0FJVCxBQUNMO21DQUNJLGNBQUE7OzhCQUFBO2dDQUFBLEFBQ0k7QUFESjtBQUFBLGFBQUEsa0JBQ0ksY0FBQTs7OEJBQUE7Z0NBQUE7QUFBQTtBQUFBLGVBQVksZ0JBQUEsQUFBSyxNQUFMLEFBQVcsS0FBWCxBQUFnQixHQURoQyxBQUNJLEFBQVksQUFBbUIsQUFDL0IsK0JBQUEsY0FBQTs7OEJBQUE7Z0NBQUE7QUFBQTtBQUFBLGVBRkosQUFFSSxBQUNBLHlFQUFBLGNBQUE7OzhCQUFBO2dDQUFBO0FBQUE7QUFBQSxlQUhKLEFBR0ksQUFLQSxnQ0FBQSxjQUFBLFVBQU0sUUFBTixBQUFhLE9BQU0sUUFBbkIsQUFBMEI7OEJBQTFCO2dDQUFBLEFBQ0k7QUFESjt3REFDVyxNQUFQLEFBQVksUUFBTyxJQUFuQixBQUFzQixPQUFNLE1BQTVCLEFBQWlDOzhCQUFqQztnQ0FESixBQUNJLEFBQ0E7QUFEQTs7OzhCQUNBO2dDQUZKLEFBRUksQUFDQTtBQURBO0FBQUEseURBQ08sTUFBUCxBQUFZLFlBQVcsTUFBdkIsQUFBNEI7OEJBQTVCO2dDQUhKLEFBR0ksQUFDQTtBQURBO3lEQUNPLE1BQVAsQUFBWSxVQUFTLE9BQXJCLEFBQTJCOzhCQUEzQjtnQ0FiWixBQUNJLEFBUUksQUFJSSxBQUlmO0FBSmU7Ozs7OztBQS9CRSxBLEFBc0N0Qjs7a0JBQUEsQUFBZSIsImZpbGUiOiJpbmRleC5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiIvVXNlcnMvS2V2aW5Cb2dob3NzaWFuL0dpdC9Mb3lhbHR5LUNvY29vbiJ9