import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import logo from "../../assets/circles.png";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <section id="foot" className={classes.footer}>
      <MDBFooter color="unique-color-dark" className="font-small pt-4 mt-4">
        <MDBContainer className="text-center text-md-left">
          <MDBRow className="text-center text-md-left mt-3 pb-3">
            <MDBCol md="3" lg="3" xl="4" className="mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">
                <img src={logo} alt="Book Store App" height="50px" />
                <strong>BookStore</strong>
              </h6>
              <p>
                BookStore is an online React web application where the customer
                can order, upload and edit books online. Through this book store
                the users can search for a book by its title, isbn, author or
                genre and later and lastly to it can view the details of a book.
              </p>
            </MDBCol>
            <hr className="w-100 clearfix d-md-none" />
            <MDBCol md="2" lg="2" xl="2" className="mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">
                <strong>Products</strong>
              </h6>
              <p>
                <a href="">BookStore</a>
              </p>
              <p>
                <a href="https://github.com/fernandofanelli/frontend/">
                  Frontend
                </a>
              </p>
              <p>
                <a href="https://github.com/fernandofanelli/backend/">
                  Backend
                </a>
              </p>
            </MDBCol>

            <hr className="w-100 clearfix d-md-none" />
            <MDBCol md="4" lg="3" xl="3" className="mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">
                <strong>Contact</strong>
              </h6>
              <p>
                <i className="fa fa-envelope mr-3" /> grupo03leo@gmail.com
              </p>
              <p>
                <i className="fa fa-phone mr-3" /> +54 11-5567-2273
              </p>
              <p>
                <i className="fa fa-home mr-3" /> Arg. Buenos Aires, Vte Lopez
              </p>
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow className="d-flex align-items-center">
            <MDBCol md="8" lg="8">
              <p className="text-center text-md-left grey-text">
                &copy; {new Date().getFullYear()} Made by
                <a href=""> Grupo 03 </a>
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBFooter>
    </section>
  );
};

export default Footer;
