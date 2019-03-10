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

var _jsxFileName = 'D:\\Senior\\Loyalty-Cocoon\\pages\\index.js?entry';


var Loyalty = function (_Component) {
    (0, _inherits3.default)(Loyalty, _Component);

    function Loyalty(props) {
        (0, _classCallCheck3.default)(this, Loyalty);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Loyalty.__proto__ || (0, _getPrototypeOf2.default)(Loyalty)).call(this, props));

        _this.state = {
            productData: []
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
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var response, productData;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return fetch('http://localhost:8000/api/product/all');

                            case 2:
                                response = _context.sent;
                                _context.next = 5;
                                return response.json();

                            case 5:
                                productData = _context.sent;

                                this.setState({ productData: productData });

                            case 7:
                            case 'end':
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
        key: 'renderProducts',
        value: function renderProducts() {
            if (this.state.productData.length > 0) {
                return _react2.default.createElement(_ProductRow2.default, { products: this.state.productData, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 37
                    }
                });
            }
        }
    }]);

    return Loyalty;
}(_react.Component);

exports.default = Loyalty;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxpbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIkNhcmQiLCJCdXR0b24iLCJMYXlvdXQiLCJQcm9kdWN0Q2FyZCIsIlByb2R1Y3RSb3ciLCJOYXZpZ2F0aW9uQmFyIiwiTG95YWx0eSIsInByb3BzIiwic3RhdGUiLCJwcm9kdWN0RGF0YSIsInJlbmRlclByb2R1Y3RzIiwiZmV0Y2giLCJyZXNwb25zZSIsImpzb24iLCJzZXRTdGF0ZSIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFTLEFBQU07O0FBQ2YsQUFBTyxBQUFZOzs7O0FBQ25CLEFBQU8sQUFBaUI7Ozs7QUFDeEIsQUFBTyxBQUFnQjs7OztBQUN2QixBQUFPLEFBQW1COzs7Ozs7Ozs7SUFFcEIsQTtxQ0FDRjs7cUJBQUEsQUFBWSxPQUFPOzRDQUFBOzs0SUFBQSxBQUNULEFBRU47O2NBQUEsQUFBSzt5QkFIVSxBQUdmLEFBQWEsQUFDSTtBQURKLEFBQ1Q7ZUFFUDs7Ozs7aUNBRVEsQUFDTDttQ0FDSSxjQUFBOzs4QkFBQTtnQ0FBQSxBQUVJO0FBRko7QUFBQSxhQUFBLGtCQUVJLEFBQUM7OzhCQUFEO2dDQUZKLEFBRUksQUFDQTtBQURBO0FBQUEsZ0NBQ0EsQUFBQzs7OEJBQUQ7Z0NBSEosQUFHSSxBQUNDO0FBREQ7QUFBQSxxQkFKUixBQUNJLEFBSUssQUFBSyxBQUlqQjs7Ozs7Ozs7Ozs7O3VDQUcwQixNOztpQ0FBakI7QTs7dUNBQ29CLFNBQVMsQSxBQUFUOztpQ0FBcEI7QSx1REFDTjs7cUNBQUEsQUFBSyxTQUFTLEVBQUUsYUFBaEIsQUFBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lDQUdELEFBQ2I7Z0JBQUksS0FBQSxBQUFLLE1BQUwsQUFBVyxZQUFYLEFBQXVCLFNBQTNCLEFBQW9DLEdBQUcsQUFDbkM7dUNBQU8sQUFBQyxzQ0FBVyxVQUFVLEtBQUEsQUFBSyxNQUEzQixBQUFpQztrQ0FBakM7b0NBQVAsQUFBTyxBQUNWO0FBRFU7aUJBQUE7QUFFZDs7Ozs7QUEvQmlCLEEsQUFrQ3RCOztrQkFBQSxBQUFlIiwiZmlsZSI6ImluZGV4LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6IkQ6L1Nlbmlvci9Mb3lhbHR5LUNvY29vbiJ9