import React from 'react';
import './style.css'; // Import your CSS file for additional styling

export default class ContactUs extends React.Component {
    render() {
        return (
            <div className='container mt-5'>
                <div className='jumbotron text-center'>
                    <h1 className='display-4 text-warning'>Contact Us</h1>
                </div>

                <div className='row mt-4'>
                    <div className='col-md-6'>
                        <h2 className='text-white'>Get in Touch</h2>
                        <p className='text-white'>
                            We are here to help you with any questions or concerns you may have. 
                            Please feel free to reach out to us using any of the methods below.
                        </p>
                    </div>
                    <div className='col-md-6'>
                        <h2 className='text-white'>Contact Information</h2>
                        <p className='text-white'>
                            <strong>Email:</strong> support@ecommerce.com<br/>
                            <strong>Phone:</strong> +1 (123) 456-7890<br/>
                            <strong>Address:</strong> 123 E-commerce St, Shopsville, USA
                        </p>
                    </div>
                </div>

                <div className='row mt-5'>
                    <div className='col-md-12'>
                        <h2 className='text-white'>Product Locations</h2>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='map-container'>
                            <img src='https://img.freepik.com/free-vector/hand-drawn-world-map-illustration_23-2150261859.jpg?size=626&ext=jpg&ga=GA1.1.2116175301.1719360000&semt=ais_user' className='img-fluid' alt='Cartoon Map' />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
