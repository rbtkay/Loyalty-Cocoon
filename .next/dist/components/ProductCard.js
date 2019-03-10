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

var _semanticUiReact = require('semantic-ui-react');

var _Layout = require('./Layout');

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'D:\\Senior\\Loyalty-Cocoon\\components\\ProductCard.js';


var ProductCard = function (_Component) {
    (0, _inherits3.default)(ProductCard, _Component);

    function ProductCard() {
        (0, _classCallCheck3.default)(this, ProductCard);

        return (0, _possibleConstructorReturn3.default)(this, (ProductCard.__proto__ || (0, _getPrototypeOf2.default)(ProductCard)).apply(this, arguments));
    }

    (0, _createClass3.default)(ProductCard, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                name = _props.name,
                description = _props.description,
                price = _props.price;

            return _react2.default.createElement(_semanticUiReact.Card, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 11
                }
            }, _react2.default.createElement(_semanticUiReact.Card.Content, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 12
                }
            }, _react2.default.createElement(_semanticUiReact.Card.Header, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 13
                }
            }, name), _react2.default.createElement(_semanticUiReact.Card.Meta, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 14
                }
            }, price), _react2.default.createElement(_semanticUiReact.Card.Description, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 15
                }
            }, description)), _react2.default.createElement(_semanticUiReact.Card.Content, { extra: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 17
                }
            }, _react2.default.createElement('div', { className: 'ui two buttons', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 18
                }
            }, _react2.default.createElement(_semanticUiReact.Button, { basic: true, color: 'green', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 19
                }
            }, 'Buy'))));
        }
    }]);

    return ProductCard;
}(_react.Component);

exports.default = ProductCard;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXFByb2R1Y3RDYXJkLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiQ2FyZCIsIkJ1dHRvbiIsIkxheW91dCIsIlByb2R1Y3RDYXJkIiwicHJvcHMiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJwcmljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVM7Ozs7QUFDaEIsQUFBUyxBQUFNOztBQUNmLEFBQU8sQUFBWTs7Ozs7Ozs7O0ksQUFFYjs7Ozs7Ozs7Ozs7aUNBRU87eUJBQ2dDLEtBRGhDLEFBQ3FDO2dCQURyQyxBQUNHLGNBREgsQUFDRztnQkFESCxBQUNTLHFCQURULEFBQ1M7Z0JBRFQsQUFDc0IsZUFEdEIsQUFDc0IsQUFFM0I7O21DQUNJLEFBQUM7OzhCQUFEO2dDQUFBLEFBQ0k7QUFESjtBQUFBLGFBQUEsa0JBQ0ssY0FBRCxzQkFBQSxBQUFNOzs4QkFBTjtnQ0FBQSxBQUNJO0FBREo7QUFBQSwrQkFDSyxjQUFELHNCQUFBLEFBQU07OzhCQUFOO2dDQUFBLEFBQWM7QUFBZDtBQUFBLGVBREosQUFDSSxBQUNBLHVCQUFDLGNBQUQsc0JBQUEsQUFBTTs7OEJBQU47Z0NBQUEsQUFBWTtBQUFaO0FBQUEsZUFGSixBQUVJLEFBQ0Esd0JBQUMsY0FBRCxzQkFBQSxBQUFNOzs4QkFBTjtnQ0FBQSxBQUFtQjtBQUFuQjtBQUFBLGVBSlIsQUFDSSxBQUdJLEFBRUosK0JBQUMsY0FBRCxzQkFBQSxBQUFNLFdBQVEsT0FBZDs4QkFBQTtnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksY0FBQSxTQUFLLFdBQUwsQUFBZTs4QkFBZjtnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksQUFBQyx5Q0FBTyxPQUFSLE1BQWMsT0FBZCxBQUFvQjs4QkFBcEI7Z0NBQUE7QUFBQTtlQVRoQixBQUNJLEFBTUksQUFDSSxBQUNJLEFBS25COzs7OztBQW5CcUIsQSxBQXNCMUI7O2tCQUFBLEFBQWUiLCJmaWxlIjoiUHJvZHVjdENhcmQuanMiLCJzb3VyY2VSb290IjoiRDovU2VuaW9yL0xveWFsdHktQ29jb29uIn0=