'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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


var Loyalty = function (_Component) {
    (0, _inherits3.default)(Loyalty, _Component);

    function Loyalty(props) {
        var _this2 = this;

        (0, _classCallCheck3.default)(this, Loyalty);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Loyalty.__proto__ || (0, _getPrototypeOf2.default)(Loyalty)).call(this, props));

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
        };
        return _this;
    }

    (0, _createClass3.default)(Loyalty, [{
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
            }

            return componentDidMount;
        }()
    }, {
        key: 'renderProducts',
        value: function renderProducts() {
            if (this.state.products.length > 0) {
                return _react2.default.createElement(_ProductRow2.default, { products: this.state.products, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 44
                    }
                });
            }
        }
    }]);

    return Loyalty;
}(_react.Component);

exports.default = Loyalty;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxpbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIkNhcmQiLCJCdXR0b24iLCJMYXlvdXQiLCJQcm9kdWN0Q2FyZCIsIlByb2R1Y3RSb3ciLCJOYXZpZ2F0aW9uQmFyIiwiTG95YWx0eSIsInByb3BzIiwic2VhcmNoIiwiZmV0Y2giLCJyZXNwb25zZSIsImpzb24iLCJwcm9kdWN0cyIsInNldFN0YXRlIiwic3RhdGUiLCJyZW5kZXJQcm9kdWN0cyIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBUyxBQUFNOztBQUNmLEFBQU8sQUFBWTs7OztBQUNuQixBQUFPLEFBQWlCOzs7O0FBQ3hCLEFBQU8sQUFBZ0I7Ozs7QUFDdkIsQUFBTyxBQUFtQjs7Ozs7Ozs7O0lBRXBCLEE7cUNBQ0Y7O3FCQUFBLEFBQVksT0FBTztxQkFBQTs7NENBQUE7OzRJQUFBLEFBQ1Q7O2NBRFMsQUEyQm5CLGtGQUFTLG1CQUFBOzBCQUFBOzBFQUFBOzBCQUFBO3FEQUFBOzZCQUFBOzRDQUFBO21DQUNrQixNQURsQjs7NkJBQ0M7QUFERCxnREFBQTs0Q0FBQTttQ0FFa0IsU0FGbEIsQUFFa0IsQUFBUzs7NkJBQTFCO0FBRkQsZ0RBR0w7O2tDQUFBLEFBQUssU0FBUyxFQUFFLFVBSFgsQUFHTCxBQUFjOzs2QkFIVDs2QkFBQTs0Q0FBQTs7QUFBQTt3QkFBQTtBQTNCVSxBQUdmOztjQUFBLEFBQUs7c0JBSFUsQUFHZixBQUFhLEFBQ0M7QUFERCxBQUNUO2VBRVA7Ozs7O2lDQUVRLEFBQ0w7bUNBQ0ksY0FBQTs7OEJBQUE7Z0NBQUEsQUFFSTtBQUZKO0FBQUEsYUFBQSxrQkFFSSxBQUFDOzs4QkFBRDtnQ0FGSixBQUVJLEFBQ0E7QUFEQTtBQUFBLGdDQUNBLEFBQUM7OzhCQUFEO2dDQUhKLEFBR0ksQUFDQztBQUREO0FBQUEscUJBSlIsQUFDSSxBQUlLLEFBQUssQUFJakI7Ozs7Ozs7Ozs7Ozt1Q0FHMEIsTTs7aUNBQWpCO0E7O3VDQUNpQixTQUFBLEFBQVMsQTs7aUNBQTFCO0EscURBQ047O3dDQUFBLEFBQVEsSUFBUixBQUFZLEFBQ1o7cUNBQUEsQUFBSyxTQUFTLEVBQUUsVUFBaEIsQUFBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lDQVNELEFBQ2I7Z0JBQUksS0FBQSxBQUFLLE1BQUwsQUFBVyxTQUFYLEFBQW9CLFNBQXhCLEFBQWlDLEdBQUcsQUFDaEM7dUNBQU8sQUFBQyxzQ0FBVyxVQUFVLEtBQUEsQUFBSyxNQUEzQixBQUFpQztrQ0FBakM7b0NBQVAsQUFBTyxBQUNWO0FBRFU7aUJBQUE7QUFFZDs7Ozs7QUF0Q2lCLEEsQUF5Q3RCOztrQkFBQSxBQUFlIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlUm9vdCI6IkQ6L1Nlbmlvci9Mb3lhbHR5LUNvY29vbiJ9