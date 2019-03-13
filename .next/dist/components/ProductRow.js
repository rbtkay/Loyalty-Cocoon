'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _ProductCard = require('./ProductCard');

var _ProductCard2 = _interopRequireDefault(_ProductCard);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'D:\\Senior\\Loyalty-Cocoon\\components\\ProductRow.js';


var ProductRow = function (_Component) {
    (0, _inherits3.default)(ProductRow, _Component);

    function ProductRow() {
        (0, _classCallCheck3.default)(this, ProductRow);

        return (0, _possibleConstructorReturn3.default)(this, (ProductRow.__proto__ || (0, _getPrototypeOf2.default)(ProductRow)).apply(this, arguments));
    }

    (0, _createClass3.default)(ProductRow, [{
        key: 'render',
        value: function render() {
            var products = this.props.products;

            if (products) {
                return _react2.default.createElement(_semanticUiReact.Card.Group, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 11
                    }
                }, this.renderProducts(products));
            } else {
                return _react2.default.createElement('div', {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 16
                    }
                }, 'Loading Products...');
            }
        }
    }, {
        key: 'renderProducts',
        value: function renderProducts(products) {
            if (products) {
                console.log(products);
                return products.map(function (object) {
                    return _react2.default.createElement(_ProductCard2.default, {
                        key: object["product_id"],
                        name: object["product_name"],
                        description: object["vendor_username"],
                        price: object["product_price"] + " Loco",
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 25
                        }
                    });
                });
            }
        }
    }]);

    return ProductRow;
}(_react.Component);

exports.default = ProductRow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXFByb2R1Y3RSb3cuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJQcm9kdWN0Q2FyZCIsIkNhcmQiLCJQcm9kdWN0Um93IiwicHJvZHVjdHMiLCJwcm9wcyIsInJlbmRlclByb2R1Y3RzIiwiY29uc29sZSIsImxvZyIsIm1hcCIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBTyxBQUFpQjs7OztBQUN4QixBQUFTOzs7Ozs7O0ksQUFFSDs7Ozs7Ozs7Ozs7aUNBRU87Z0JBQUEsQUFDRyxXQUFhLEtBRGhCLEFBQ3FCLE1BRHJCLEFBQ0csQUFDUjs7Z0JBQUEsQUFBSSxVQUFVLEFBQ1Y7dUNBQ0ssY0FBRCxzQkFBQSxBQUFNOztrQ0FBTjtvQ0FBQSxBQUNLO0FBREw7QUFBQSxpQkFBQSxPQUNLLEFBQUssZUFGZCxBQUNJLEFBQ0ssQUFBb0IsQUFHaEM7QUFORCxtQkFNTyxBQUNIO3VDQUFPLGNBQUE7O2tDQUFBO29DQUFBO0FBQUE7QUFBQSxpQkFBQSxFQUFQLEFBQU8sQUFDVjtBQUNKOzs7O3VDLEFBRWMsVUFBVSxBQUNyQjtnQkFBQSxBQUFJLFVBQVUsQUFDVjt3QkFBQSxBQUFRLElBQVIsQUFBWSxBQUNaO2dDQUFPLEFBQVMsSUFBSSxVQUFBLEFBQUMsUUFBVyxBQUM1QjsyQ0FDSSxBQUFDOzZCQUNRLE9BRFQsQUFDUyxBQUFPLEFBQ1o7OEJBQU0sT0FGVixBQUVVLEFBQU8sQUFDYjtxQ0FBYSxPQUhqQixBQUdpQixBQUFPLEFBQ3BCOytCQUFPLE9BQUEsQUFBTyxtQkFKbEIsQUFJcUM7O3NDQUpyQzt3Q0FESixBQUNJLEFBT1A7QUFQTztBQUNJLHFCQURKO0FBRlIsQUFBTyxBQVVWLGlCQVZVO0FBV2Q7Ozs7O0FBN0JvQixBLEFBZ0N6Qjs7a0JBQUEsQUFBZSIsImZpbGUiOiJQcm9kdWN0Um93LmpzIiwic291cmNlUm9vdCI6IkQ6L1Nlbmlvci9Mb3lhbHR5LUNvY29vbiJ9