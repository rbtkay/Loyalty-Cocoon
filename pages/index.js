import React, { Component } from 'react';
import session from 'express-session';


class Loyalty extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [{}]
        };
    }

    async componentDidMount() {
        var response = await fetch(`http://localhost:8000/api/user/all`);
        var data = await response.json();
        this.setState({ data });
    }


    render() {
        return (
            <div>
                <h1>Hello, {this.state.data[0]["user_name"]}</h1>
                <h3>World this is a loyalty program based on blockchain!</h3>
                <span>Trust Us...</span>
                {/* <Link href={`/about`}>
                    <a>go to About Us</a>
                </Link> */}

                <form method="get" action="http://localhost:8000/api/user/ByEmail">
                    <input type="text" id="txt" name="userEmail" />
                    <br/>
                    <input type="password" name="userPassword" />
                    <input type="submit" value="submit" />
                </form>
            </div>
        );
    }
}

export default Loyalty;
