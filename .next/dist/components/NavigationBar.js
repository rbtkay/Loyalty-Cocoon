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

var _index = require('../pages/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'D:\\Senior\\Loyalty-Cocoon\\components\\NavigationBar.js';


var NavigationBar = function (_Component) {
    (0, _inherits3.default)(NavigationBar, _Component);

    function NavigationBar() {
        (0, _classCallCheck3.default)(this, NavigationBar);

        return (0, _possibleConstructorReturn3.default)(this, (NavigationBar.__proto__ || (0, _getPrototypeOf2.default)(NavigationBar)).apply(this, arguments));
    }

    (0, _createClass3.default)(NavigationBar, [{
        key: 'render',
        value: function render() {
            var categories = ['Electronics', 'Food', 'Clothing', 'Toys', 'Groceries'];
            return _react2.default.createElement(_semanticUiReact.Menu, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 9
                }
            }, _react2.default.createElement(_semanticUiReact.MenuItem, { name: 'Loyalty Cocoon', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 10
                }
            }), _react2.default.createElement(_semanticUiReact.MenuItem, { name: 'Purchases', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 12
                }
            }), _react2.default.createElement(_semanticUiReact.Dropdown, { text: 'Categories', pointing: true, className: 'link item', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 14
                }
            }, _react2.default.createElement(_semanticUiReact.Dropdown.Menu, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 15
                }
            }, _react2.default.createElement(_semanticUiReact.Dropdown.Item, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 16
                }
            }, categories[0]), _react2.default.createElement(_semanticUiReact.Dropdown.Item, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 17
                }
            }, categories[1]), _react2.default.createElement(_semanticUiReact.Dropdown.Item, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 18
                }
            }, categories[2]), _react2.default.createElement(_semanticUiReact.Dropdown.Item, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 19
                }
            }, categories[3]), _react2.default.createElement(_semanticUiReact.Dropdown.Item, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 20
                }
            }, categories[4]))), _react2.default.createElement(_semanticUiReact.Menu.Menu, { position: 'right', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 24
                }
            }, _react2.default.createElement(_semanticUiReact.MenuItem, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 26
                }
            }, _react2.default.createElement(_semanticUiReact.Input, { icon: 'search', placeholder: 'Search...', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 27
                }
            })), _react2.default.createElement(_semanticUiReact.MenuItem, { name: 'Logout', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 30
                }
            })));
        }
    }]);

    return NavigationBar;
}(_react.Component);

exports.default = NavigationBar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXE5hdmlnYXRpb25CYXIuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJJbnB1dCIsIk1lbnUiLCJNZW51SXRlbSIsIkRyb3Bkb3duIiwiRHJvcGRvd25JdGVtIiwiaW5kZXhQYWdlIiwiTmF2aWdhdGlvbkJhciIsImNhdGVnb3JpZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQVMsQUFBTyxBQUFNLEFBQVUsQUFBVTs7QUFDMUMsQUFBTyxBQUFlOzs7Ozs7Ozs7SUFFaEIsQTs7Ozs7Ozs7Ozs7aUNBQ08sQUFDTDtnQkFBTSxhQUFhLENBQUEsQUFBQyxlQUFELEFBQWdCLFFBQWhCLEFBQXdCLFlBQXhCLEFBQW9DLFFBQXZELEFBQW1CLEFBQTRDLEFBQy9EO21DQUNJLEFBQUM7OzhCQUFEO2dDQUFBLEFBQ0k7QUFESjtBQUFBLGFBQUEsa0JBQ0ksQUFBQywyQ0FBUyxNQUFWLEFBQWU7OEJBQWY7Z0NBREosQUFDSSxBQUVBO0FBRkE7Z0NBRUEsQUFBQywyQ0FBUyxNQUFWLEFBQWU7OEJBQWY7Z0NBSEosQUFHSSxBQUVBO0FBRkE7Z0NBRUEsQUFBQywyQ0FBUyxNQUFWLEFBQWUsY0FBYSxVQUE1QixNQUFxQyxXQUFyQyxBQUErQzs4QkFBL0M7Z0NBQUEsQUFDSTtBQURKOytCQUNLLGNBQUQsMEJBQUEsQUFBVTs7OEJBQVY7Z0NBQUEsQUFDSTtBQURKO0FBQUEsK0JBQ0ssY0FBRCwwQkFBQSxBQUFVOzs4QkFBVjtnQ0FBQSxBQUFnQjtBQUFoQjtBQUFBLDBCQURKLEFBQ0ksQUFBZ0IsQUFBVyxBQUMzQixxQkFBQyxjQUFELDBCQUFBLEFBQVU7OzhCQUFWO2dDQUFBLEFBQWdCO0FBQWhCO0FBQUEsMEJBRkosQUFFSSxBQUFnQixBQUFXLEFBQzNCLHFCQUFDLGNBQUQsMEJBQUEsQUFBVTs7OEJBQVY7Z0NBQUEsQUFBZ0I7QUFBaEI7QUFBQSwwQkFISixBQUdJLEFBQWdCLEFBQVcsQUFDM0IscUJBQUMsY0FBRCwwQkFBQSxBQUFVOzs4QkFBVjtnQ0FBQSxBQUFnQjtBQUFoQjtBQUFBLDBCQUpKLEFBSUksQUFBZ0IsQUFBVyxBQUMzQixxQkFBQyxjQUFELDBCQUFBLEFBQVU7OzhCQUFWO2dDQUFBLEFBQWdCO0FBQWhCO0FBQUEsMEJBWFosQUFLSSxBQUNJLEFBS0ksQUFBZ0IsQUFBVyxBQUluQyx1QkFBQyxjQUFELHNCQUFBLEFBQU0sUUFBSyxVQUFYLEFBQW9COzhCQUFwQjtnQ0FBQSxBQUVJO0FBRko7K0JBRUksQUFBQzs7OEJBQUQ7Z0NBQUEsQUFDSTtBQURKO0FBQUEsK0JBQ0ksQUFBQyx3Q0FBTSxNQUFQLEFBQVksVUFBUyxhQUFyQixBQUFpQzs4QkFBakM7Z0NBSFIsQUFFSSxBQUNJLEFBR0o7QUFISTtpQ0FHSixBQUFDLDJDQUFTLE1BQVYsQUFBZTs4QkFBZjtnQ0F0QlosQUFDSSxBQWVJLEFBTUksQUFLZjtBQUxlOzs7Ozs7QUF6QlEsQSxBQWlDNUI7O2tCQUFBLEFBQWUiLCJmaWxlIjoiTmF2aWdhdGlvbkJhci5qcyIsInNvdXJjZVJvb3QiOiJEOi9TZW5pb3IvTG95YWx0eS1Db2Nvb24ifQ==