import React from 'react';
import './style.css'; // Import your CSS file for additional styling

export default class Aboutus extends React.Component {
    render() {
        return (
            <div className='container mt-5'>
                
                <div className='jumbotron text-center'>
                    <h1 className='display-4 text-warning' text-white>About Us</h1>
                </div>
                
                <div className='row mt-4'>
                    <div className='col-md-6'>
                        <h2 className='text-white'>Our Mission</h2>
                        <p className='text-white'>
                            Our mission is to provide the best online shopping experience
                            by offering a wide variety of high-quality products at competitive
                            prices, ensuring customer satisfaction through excellent service.
                        </p>
                    </div>
                    <div className='col-md-6'>
                        <h2 className='text-white'>Our Vision</h2>
                        <p className='text-white'>
                            Our vision is to become the leading e-commerce platform globally,
                            connecting millions of customers with their favorite brands and
                            products in a seamless and enjoyable shopping environment.
                        </p>
                    </div>
                </div>
                
                <div className='row mt-4'>
                    <div className='col-md-12'>
                        <h2 className='text-white'>Our Values</h2>
                        <ul>
                            <li className="text-white">Customer Satisfaction</li>
                            <li className="text-white">Integrity</li>
                            <li className="text-white">Innovation</li>
                            <li className="text-white">Teamwork</li>
                            <li className="text-white">Sustainability</li>
                        </ul>
                    </div>
                </div>
                
                <div className='row mt-5'>
                    <div className='col-md-12'>
                        <h2 className='text-white'>Meet Our Team</h2>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3'>
                        <div className='card team-card'>
                            <img src='https://media.licdn.com/dms/image/D5603AQF0JA9-rAJCoA/profile-displayphoto-shrink_100_100/0/1684328227507?e=1724889600&v=beta&t=62PNdWGS3jUHRGUysyVvaS6KvcgkoJcZvQT2whuWcdo' className='card-img-top' alt='Team Member 1' />
                            <div className='card-body'>
                                <h5 className='card-title text-white'>Manish Pandey</h5>
                                <p className='card-text text-white'>CEO</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card team-card'>
                            <img src='https://media.licdn.com/dms/image/D5603AQGZd3M-_4hxcA/profile-displayphoto-shrink_100_100/0/1714874201176?e=1724889600&v=beta&t=yzjCNNQgKXVZcrjE8wtKTp2-MHiXxnlSmHR9ejc2OD0' className='card-img-top' alt='Team Member 2' />
                            <div className='card-body'>
                                <h5 className='card-title text-white'>Nageshwar Yadav</h5>
                                <p className='card-text text-white'>CTO</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card team-card'>
                            <img src='https://www.shutterstock.com/image-photo/confident-successful-ceo-business-woman-600nw-1088049656.jpg' className='card-img-top' alt='Team Member 3' />
                            <div className='card-body'>
                                <h5 className='card-title text-white'>Emily Johnson</h5>
                                <p className='card-text text-white'>CFO</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='card team-card'>
                            <img src='https://t3.ftcdn.net/jpg/01/80/80/28/360_F_180802852_C3Zm4g9avBz5osPEA769dF0KKp5cQZYT.jpg' className='card-img-top' alt='Team Member 4' />
                            <div className='card-body'>
                                <h5 className='card-title text-white'>Michael Brown</h5>
                                <p className='card-text text-white'>COO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
