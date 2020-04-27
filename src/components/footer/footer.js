import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
const footer = () => {
  return (
    <footer className="footer">
      <div className="footer-area">
        <div className="footer-container">
          <div className="footer-row">
            <div className="footer-column-1">
              <div className="single-footer-widget">
                <h4 className="footer_title">About Us</h4>
                <p>
                  At Scrumptious, we believe that a recipe has no soul. You, as
                  the cook, must bring soul to the recipe.
                </p>
                <p>
                  All rights reserved | © scrumptious.com | Designed by Susan
                  Subedi
                </p>
              </div>
            </div>
            <div className="footer-column-1 second-column">
              <div className="single-footer-widget">
                <h4 className="footer_title">Quick Links</h4>
                <ul className="footer-list">
                  <li>
                    <Link to="/">Landing</Link>
                  </li>
                  <li>
                    <Link to="/auth">Login</Link>
                  </li>
                  <li>
                    <Link to="/my-recipes">Recipes</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-column-1 third-column">
              <div className="single-footer-widget">
                <h4 className="footer_title">Contact Us</h4>
                <div className="ml-5">
                  <p className="sm-head">
                    <span className="fa fa-location-arrow"></span> Head Office
                  </p>
                  <p>1802 Jackson Ave W, Oxford MS 38655</p>

                  <p className="sm-head">
                    <span className="fa fa-phone"></span> Phone Number
                  </p>
                  <p>+682 251 8746</p>

                  <p className="sm-head">
                    <span className="fa fa-envelope"></span> Email
                  </p>
                  <p>info@scrumptious.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default footer;
