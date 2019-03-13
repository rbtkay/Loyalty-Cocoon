<<<<<<< HEAD
'use strict';
=======
"use strict";
>>>>>>> 5af67d5a5fd633ab502e7d785122a3953da60b8c

Object.defineProperty(exports, "__esModule", {
    value: true
});

<<<<<<< HEAD
var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _Layout = require('../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _ProductCard = require('../components/ProductCard');

var _ProductCard2 = _interopRequireDefault(_ProductCard);

var _ProductRow = require('../components/ProductRow');

var _ProductRow2 = _interopRequireDefault(_ProductRow);

var _NavigationBar = require('../components/NavigationBar');

var _NavigationBar2 = _interopRequireDefault(_NavigationBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'D:\\Senior\\Loyalty-Cocoon\\pages\\index.js';
=======
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
>>>>>>> 5af67d5a5fd633ab502e7d785122a3953da60b8c


var Loyalty = function (_Component) {
    (0, _inherits3.default)(Loyalty, _Component);

    function Loyalty(props) {
<<<<<<< HEAD
        var _this2 = this;

=======
>>>>>>> 5af67d5a5fd633ab502e7d785122a3953da60b8c
        (0, _classCallCheck3.default)(this, Loyalty);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Loyalty.__proto__ || (0, _getPrototypeOf2.default)(Loyalty)).call(this, props));

<<<<<<< HEAD
        _this.search = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var response, products;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return fetch('http://localhost:8000/api/product/search');

                        case 2:
                            response = _context.sent;
                            _context.next = 5;
                            return response.json();

                        case 5:
                            products = _context.sent;

                            _this.setState({ products: products });

                        case 7:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        }));

        _this.state = {
            products: []
=======
        _this.state = {
            data: [{}]
>>>>>>> 5af67d5a5fd633ab502e7d785122a3953da60b8c
        };
        return _this;
    }

    (0, _createClass3.default)(Loyalty, [{
<<<<<<< HEAD
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 19
                }
            }, _react2.default.createElement(_Layout2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 21
                }
            }), _react2.default.createElement(_NavigationBar2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 22
                }
            }), this.renderProducts());
        }
    }, {
        key: 'componentDidMount',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                var response, products;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return fetch('http://localhost:8000/api/product/all');

                            case 2:
                                response = _context2.sent;
                                _context2.next = 5;
                                return response.json();

                            case 5:
                                products = _context2.sent;

                                console.log("working");
                                this.setState({ products: products });

                            case 8:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function componentDidMount() {
                return _ref2.apply(this, arguments);
=======
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
>>>>>>> 5af67d5a5fd633ab502e7d785122a3953da60b8c
            }

            return componentDidMount;
        }()
    }, {
<<<<<<< HEAD
        key: 'renderProducts',
        value: function renderProducts() {
            if (this.state.products.length > 0) {
                return _react2.default.createElement(_ProductRow2.default, { products: this.state.products, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 44
                    }
                });
            }
=======
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
>>>>>>> 5af67d5a5fd633ab502e7d785122a3953da60b8c
        }
    }]);

    return Loyalty;
}(_react.Component);

exports.default = Loyalty;
<<<<<<< HEAD
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxpbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIkNhcmQiLCJCdXR0b24iLCJMYXlvdXQiLCJQcm9kdWN0Q2FyZCIsIlByb2R1Y3RSb3ciLCJOYXZpZ2F0aW9uQmFyIiwiTG95YWx0eSIsInByb3BzIiwic2VhcmNoIiwiZmV0Y2giLCJyZXNwb25zZSIsImpzb24iLCJwcm9kdWN0cyIsInNldFN0YXRlIiwic3RhdGUiLCJyZW5kZXJQcm9kdWN0cyIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBUyxBQUFNOztBQUNmLEFBQU8sQUFBWTs7OztBQUNuQixBQUFPLEFBQWlCOzs7O0FBQ3hCLEFBQU8sQUFBZ0I7Ozs7QUFDdkIsQUFBTyxBQUFtQjs7Ozs7Ozs7O0lBRXBCLEE7cUNBQ0Y7O3FCQUFBLEFBQVksT0FBTztxQkFBQTs7NENBQUE7OzRJQUFBLEFBQ1Q7O2NBRFMsQUEyQm5CLGtGQUFTLG1CQUFBOzBCQUFBOzBFQUFBOzBCQUFBO3FEQUFBOzZCQUFBOzRDQUFBO21DQUNrQixNQURsQjs7NkJBQ0M7QUFERCxnREFBQTs0Q0FBQTttQ0FFa0IsU0FGbEIsQUFFa0IsQUFBUzs7NkJBQTFCO0FBRkQsZ0RBR0w7O2tDQUFBLEFBQUssU0FBUyxFQUFFLFVBSFgsQUFHTCxBQUFjOzs2QkFIVDs2QkFBQTs0Q0FBQTs7QUFBQTt3QkFBQTtBQTNCVSxBQUdmOztjQUFBLEFBQUs7c0JBSFUsQUFHZixBQUFhLEFBQ0M7QUFERCxBQUNUO2VBRVA7Ozs7O2lDQUVRLEFBQ0w7bUNBQ0ksY0FBQTs7OEJBQUE7Z0NBQUEsQUFFSTtBQUZKO0FBQUEsYUFBQSxrQkFFSSxBQUFDOzs4QkFBRDtnQ0FGSixBQUVJLEFBQ0E7QUFEQTtBQUFBLGdDQUNBLEFBQUM7OzhCQUFEO2dDQUhKLEFBR0ksQUFDQztBQUREO0FBQUEscUJBSlIsQUFDSSxBQUlLLEFBQUssQUFJakI7Ozs7Ozs7Ozs7Ozt1Q0FHMEIsTTs7aUNBQWpCO0E7O3VDQUNpQixTQUFBLEFBQVMsQTs7aUNBQTFCO0EscURBQ047O3dDQUFBLEFBQVEsSUFBUixBQUFZLEFBQ1o7cUNBQUEsQUFBSyxTQUFTLEVBQUUsVUFBaEIsQUFBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lDQVNELEFBQ2I7Z0JBQUksS0FBQSxBQUFLLE1BQUwsQUFBVyxTQUFYLEFBQW9CLFNBQXhCLEFBQWlDLEdBQUcsQUFDaEM7dUNBQU8sQUFBQyxzQ0FBVyxVQUFVLEtBQUEsQUFBSyxNQUEzQixBQUFpQztrQ0FBakM7b0NBQVAsQUFBTyxBQUNWO0FBRFU7aUJBQUE7QUFFZDs7Ozs7QUF0Q2lCLEEsQUF5Q3RCOztrQkFBQSxBQUFlIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlUm9vdCI6IkQ6L1Nlbmlvci9Mb3lhbHR5LUNvY29vbiJ9
=======
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiTG95YWx0eSIsInByb3BzIiwic3RhdGUiLCJkYXRhIiwiZmV0Y2giLCJyZXNwb25zZSIsImpzb24iLCJzZXRTdGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7Ozs7Ozs7O0lBRVYsQTtxQ0FFRjs7cUJBQUEsQUFBWSxPQUFPOzRDQUFBOzs0SUFBQSxBQUNULEFBRU47O2NBQUEsQUFBSztrQkFDSyxDQUpLLEFBR2YsQUFBYSxBQUNILEFBQUM7QUFERSxBQUNUO2VBRVA7Ozs7Ozs7Ozs7Ozs7dUNBR3dCLE07O2lDQUFqQjtBOzt1Q0FDYSxTLEFBQUEsQUFBUzs7aUNBQXRCO0EsZ0RBQ0o7O3FDQUFBLEFBQUssU0FBUyxFQUFFLE1BQWhCLEFBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQ0FJVCxBQUNMO21DQUNJLGNBQUE7OzhCQUFBO2dDQUFBLEFBQ0k7QUFESjtBQUFBLGFBQUEsa0JBQ0ksY0FBQTs7OEJBQUE7Z0NBQUE7QUFBQTtBQUFBLGVBQVksZ0JBQUEsQUFBSyxNQUFMLEFBQVcsS0FBWCxBQUFnQixHQURoQyxBQUNJLEFBQVksQUFBbUIsQUFDL0IsK0JBQUEsY0FBQTs7OEJBQUE7Z0NBQUE7QUFBQTtBQUFBLGVBRkosQUFFSSxBQUNBLHlFQUFBLGNBQUE7OzhCQUFBO2dDQUFBO0FBQUE7QUFBQSxlQUhKLEFBR0ksQUFLQSxnQ0FBQSxjQUFBLFVBQU0sUUFBTixBQUFhLE9BQU0sUUFBbkIsQUFBMEI7OEJBQTFCO2dDQUFBLEFBQ0k7QUFESjt3REFDVyxNQUFQLEFBQVksUUFBTyxJQUFuQixBQUFzQixPQUFNLE1BQTVCLEFBQWlDOzhCQUFqQztnQ0FESixBQUNJLEFBQ0E7QUFEQTs7OzhCQUNBO2dDQUZKLEFBRUksQUFDQTtBQURBO0FBQUEseURBQ08sTUFBUCxBQUFZLFlBQVcsTUFBdkIsQUFBNEI7OEJBQTVCO2dDQUhKLEFBR0ksQUFDQTtBQURBO3lEQUNPLE1BQVAsQUFBWSxVQUFTLE9BQXJCLEFBQTJCOzhCQUEzQjtnQ0FiWixBQUNJLEFBUUksQUFJSSxBQUlmO0FBSmU7Ozs7OztBQS9CRSxBLEFBc0N0Qjs7a0JBQUEsQUFBZSIsImZpbGUiOiJpbmRleC5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiIvVXNlcnMvS2V2aW5Cb2dob3NzaWFuL0dpdC9Mb3lhbHR5LUNvY29vbiJ9
>>>>>>> 5af67d5a5fd633ab502e7d785122a3953da60b8c
