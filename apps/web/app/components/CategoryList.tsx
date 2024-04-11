import React, { useState } from "react";
import "./CategoryList.scss";
import "boxicons/css/boxicons.min.css";

function CategoryList() {
    return (
        <div className="card-list">
            <a href="#" className="card-item applied">
                <div className="counter">300</div>
                <div className="text">Applied jobs</div>
                <div className="icon">
                    <i className="bx bxs-briefcase"></i>
                </div>
            </a>
            <a href="#" className="card-item alert">
                <div className="counter">300</div>
                <div className="text">Alert jobs</div>
                <div className="icon">
                    <i className="bx bxs-bookmark"></i>
                </div>
            </a>
            <a href="#" className="card-item rejected">
                <div className="counter">300</div>
                <div className="text">Rejected jobs</div>
                <div className="icon">
                    <i className="bx bxs-error-circle"></i>
                </div>
            </a>
        </div>
    );
}

export default CategoryList;