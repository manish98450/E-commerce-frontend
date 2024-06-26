import React from "react";
import axios from "axios";
import url from "./url";
import Header from "./Header";

export default class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            status: "",
            user: null,
            products: [],
            cart: [],
            total: 0,
        };
    }

    componentDidMount() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            this.setState({
                login: true,
                user: user
            }, this.fetchCart);
        }

        axios.get(url + "/fetch")
            .then((posRes) => {
                this.setState({
                    products: posRes.data
                });
            }, (errRes) => {
                console.log(errRes);
            });
    }

    render() {
        return (
            <div style={{ marginLeft: '40px', marginRight: '40px' }}>
                <div className="container mt-5" hidden={this.state.login}>
                    <form onSubmit={this.login} className='btn btn-outline-dark text-white w-75'>
                        <div className='form-group my-2 btn btn-outline-info p-3 w-100'>
                            <label className='float-left'>Username</label>
                            <input type='text' placeholder='Enter User name' className='form-control' name='username' />
                        </div>
                        <div className='form-group my-2 btn btn-outline-info p-3 w-100'>
                            <label className='float-left'>Password</label>
                            <input type='password' placeholder='Enter Password' className='form-control' name='password' />
                        </div>
                        <div className='form-group my-2 w-100 mx-auto' align='center'>
                            <input type='submit' className='btn btn-outline-success' value='Login' />
                        </div>
                    </form>
                </div>

                <div hidden={!this.state.login}>
                    <button onClick={this.logout} className='btn btn-outline-danger float-right mt-4 mr-5'>Logout</button>
                    <Header user={this.state.user} />
                    <div className='h4 text-info mb-2' align="right">
                        Total amount: ₹{this.state.total}
                        <button onClick={() => { this.buyNow() }} className='btn btn-outline-success mx-5'>Buy Now</button>
                    </div>
                    <div className='row'>
                        <div className='col-10'>
                            <div className='row row-cols-3'>
                                {this.state.products.map((e) => (
                                    <div className='col-12 col-sm-6 col-md-4 col-lg-3 my-3' key={e.p_id}>
                                    <div className='card'>
                                        <div className='card-header'>
                                            <img src={e.p_img} className='card-img-top img-fluid' alt={e.p_name} />
                                        </div>
                                        <div className='card-body'>
                                            <div className='h2 card-title'>{e.p_name}</div>
                                            <div className='h4 card-subtitle text-muted'>₹{e.p_cost}</div>
                                        </div>
                                        <div className='card-footer'>
                                            <button onClick={() => { alert(e.p_desc) }}
                                                className="btn btn-outline-info btn-block btn-sm"
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                title={e.p_desc}>Learn More</button>
                                            <button onClick={() => { this.addToCart(e) }} className="btn btn-outline-success btn-block btn-sm">Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                                
                                ))}
                            </div>
                        </div>
                        <div className='col'>
                            <div className='row my-3'>
                                {this.state.cart.map((e) => (
                                    <div className='col my-3' key={e.p_id}>
                                        <div className='card'>
                                            <div className='card-header'>
                                                <img src={e.p_img} className='card-img-top' alt={e.p_name} />
                                            </div>
                                            <div className='card-body'>
                                                <div className='h2 card-title'>{e.p_name}</div>
                                                <div className='h4 card-subtitle text-muted'>Qty: {e.qty}</div>
                                            </div>
                                            <div className='card-footer'>
                                                <button onClick={() => { this.reduce(e) }} className="btn btn-outline-success btn-block btn-sm">Reduce</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    login = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        axios.post(`${url}/find_user`, {
            params: {
                u_name: username,
                u_pwd: password
            }
        }).then(
            (response) => {
                if (response.data.auth === 'success') {
                    const userData = {
                        username: response.data.username,
                        token: response.data.token
                    };
                    sessionStorage.setItem('user', JSON.stringify(userData));
                    this.setState({
                        login: true,
                        status: "Login successful!",
                        user: userData,
                    }, this.fetchCart);
                } else {
                    this.setState({
                        status: "Invalid username or password",
                    });
                }
            },
            (error) => {
                console.log("An error occurred:", error);
                this.setState({
                    status: "An error occurred. Please try again.",
                });
            }
        );
    };

    addToCart = (item) => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            return;
        }
    
        let present = false;
        let i;
        for (i = 0; i < this.state.cart.length; i++) {
            if (item.p_id === this.state.cart[i].p_id && this.state.cart[i].u_name === user.username) {
                present = true;
                break;
            }
        }
        if (present) {
            let myObj = this.state.cart[i];
            let obj = {
                "u_name": user.username,
                "p_id": myObj.p_id,
                "qty": parseInt(myObj.qty) + 1,
            };
            axios.put(url + "/cart_update", obj)
                .then((posRes) => {
                    let updatedCart = this.state.cart.map(cartItem =>
                        cartItem.p_id === obj.p_id && cartItem.u_name === user.username ? { ...cartItem, qty: obj.qty } : cartItem
                    );
                    this.setState({
                        cart: updatedCart,
                        status: 'Update ' + posRes.statusText,
                        total: this.calculateTotal(updatedCart)
                    });
                }, (errRes) => {
                    this.setState({
                        status: errRes.message
                    });
                });
        } else {
            let obj = {
                "u_name": user.username,
                "p_name": item.p_name,
                "p_id": item.p_id,
                "qty": 1,
                "p_cost": item.p_cost,
                "p_img": item.p_img
            };
            axios.post(url + "/cart_insert", obj)
                .then((posRes) => {
                    let updatedCart = [...this.state.cart, obj];
                    this.setState({
                        cart: updatedCart,
                        status: 'Record ' + posRes.statusText,
                        total: this.calculateTotal(updatedCart)
                    });
                }, (errRes) => {
                    this.setState({
                        status: errRes.message
                    });
                });
        }
    };
    

    
    reduce = (item) => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            return;
        }
    
        if (item.qty === 1) {
            let obj = {
                data: {
                    "u_name": user.username,
                    "p_id": item.p_id
                }
            };
            axios.delete(url + "/cart_delete", obj)
                .then((posRes) => {
                    let updatedCart = this.state.cart.filter(cartItem => cartItem.p_id !== item.p_id || cartItem.u_name !== user.username);
                    this.setState({
                        cart: updatedCart,
                        status: 'Delete ' + posRes.statusText,
                        total: this.calculateTotal(updatedCart)
                    });
                }, (errRes) => {
                    this.setState({
                        status: errRes.message
                    });
                });
        } else {
            let obj = {
                "u_name": user.username,
                "p_id": item.p_id,
                "qty": parseInt(item.qty) - 1,
            };
            axios.put(url + "/cart_update", obj)
                .then((posRes) => {
                    let updatedCart = this.state.cart.map(cartItem =>
                        cartItem.p_id === obj.p_id && cartItem.u_name === user.username ? { ...cartItem, qty: obj.qty } : cartItem
                    );
                    this.setState({
                        cart: updatedCart,
                        status: 'Update ' + posRes.statusText,
                        total: this.calculateTotal(updatedCart)
                    });
                }, (errRes) => {
                    this.setState({
                        status: errRes.message
                    });
                });
        }
    };
    
    
    buyNow = () => {
        alert('Thank you for doing business with us! Total amount: ₹' + this.state.total);
    
        Promise.all(this.state.cart.map(item => {
            let obj = {
                data: {
                    "u_name": this.state.user.username,
                    "p_id": item.p_id
                }
            };
    
            return axios.delete(url + "/cart_delete", obj);
        })).then(() => {
            this.setState({
                cart: [],
                total: 0,
                status: 'All items purchased and cart cleared'
            });
        }).catch((err) => {
            this.setState({
                status: 'Error: ' + err.message
            });
        });
    };
    
    fetchCart = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            return;
        }
    
        axios.get(url + "/cart_fetch", { params: { u_name: user.username } }).then(
            (posRes) => {
                const filteredCart = posRes.data.filter(item => item.u_name === user.username);
                this.setState({
                    cart: filteredCart,
                    status: '',
                    total: this.calculateTotal(filteredCart)
                });
            },
            (errRes) => {
                console.log(errRes);
            }
        );
    };
    
    calculateTotal = (cart) => {
        let total = 0;
        cart.forEach((e) => {
            total += e.qty * e.p_cost;
        });
        return total;
    };

    logout = () => {
        this.setState({
            login: false,
            user: null,
            total: 0,
            cart: []
        });
        sessionStorage.removeItem('user');
    };
}
