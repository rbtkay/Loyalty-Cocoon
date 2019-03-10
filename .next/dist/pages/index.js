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
                    lineNumber: 18
                }
            }, _react2.default.createElement(_Layout2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 20
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
                        lineNumber: 36
                    }
                });
            }
        }
    }]);

    return Loyalty;
}(_react.Component);

exports.default = Loyalty;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxpbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIkNhcmQiLCJCdXR0b24iLCJMYXlvdXQiLCJQcm9kdWN0Q2FyZCIsIlByb2R1Y3RSb3ciLCJMb3lhbHR5IiwicHJvcHMiLCJzdGF0ZSIsInByb2R1Y3REYXRhIiwicmVuZGVyUHJvZHVjdHMiLCJmZXRjaCIsInJlc3BvbnNlIiwianNvbiIsInNldFN0YXRlIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQVMsQUFBTTs7QUFDZixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFpQjs7OztBQUN4QixBQUFPLEFBQWdCOzs7Ozs7Ozs7SUFFakIsQTtxQ0FDRjs7cUJBQUEsQUFBWSxPQUFPOzRDQUFBOzs0SUFBQSxBQUNULEFBRU47O2NBQUEsQUFBSzt5QkFIVSxBQUdmLEFBQWEsQUFDSTtBQURKLEFBQ1Q7ZUFFUDs7Ozs7aUNBRVEsQUFDTDttQ0FDSSxjQUFBOzs4QkFBQTtnQ0FBQSxBQUVJO0FBRko7QUFBQSxhQUFBLGtCQUVJLEFBQUM7OzhCQUFEO2dDQUZKLEFBRUksQUFFQztBQUZEO0FBQUEscUJBSFIsQUFDSSxBQUlLLEFBQUssQUFJakI7Ozs7Ozs7Ozs7Ozt1Q0FHMEIsTTs7aUNBQWpCO0E7O3VDQUNvQixTLEFBQUEsQUFBUzs7aUNBQTdCO0EsdURBQ047O3FDQUFBLEFBQUssU0FBUyxFQUFFLGFBQWhCLEFBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5Q0FHRCxBQUNiO2dCQUFJLEtBQUEsQUFBSyxNQUFMLEFBQVcsWUFBWCxBQUF1QixTQUEzQixBQUFvQyxHQUFHLEFBQ25DO3VDQUFPLEFBQUMsc0NBQVcsVUFBVSxLQUFBLEFBQUssTUFBM0IsQUFBaUM7a0NBQWpDO29DQUFQLEFBQU8sQUFDVjtBQURVO2lCQUFBO0FBRWQ7Ozs7O0FBL0JpQixBLEFBa0N0Qjs7a0JBQUEsQUFBZSIsImZpbGUiOiJpbmRleC5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiJEOi9TZW5pb3IvTG95YWx0eS1Db2Nvb24ifQ==