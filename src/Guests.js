import React from "react";
//import "./App.css";
import axios from "axios";
class Guests extends React.Component {
    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            DataisLoaded: false,
        };
    }

    // ComponentDidMount is used to
    // execute the code
    componentDidMount() {
        axios.get(
            "https://hja6wvb9hc.execute-api.us-west-1.amazonaws.com/items" //"http://192.168.68.62:3956/guests"
        )
            .then((res) => {
                this.setState({
                    items: res.data,
                    DataisLoaded: true,
                });
            });
    }
    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded)
            return (
                <div>
                    <h1> Please wait.... </h1>
                </div>
            );

        return (
            <div className="App">
                <h1 className="geeks">Guests</h1>
                <h3>Fetch data from an api in react</h3>
                <div className="container">
                    {items.map((item) => (
                        <div className="item">
                            <ol key={item.id}>
                                <div>
                                    <strong>
                                        {"Name: "}
                                    </strong>
                                    {item.name},
                                </div>
                                <div>
                                    Date of birth: {item.dob},
                                </div>
                            </ol>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Guests;
