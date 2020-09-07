import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

export default class Sidebar extends Component {
    constructor() {
        super();

        this.links = [
            { name: 'Dashboard', link: '/dashboard' },
            { name: 'My Profile', link: '/profile' },
            { name: 'Write Review', link: '/post' }
        ]

        this.renderMenu = this.renderMenu.bind(this);
        this.logout = this.logout.bind(this);
    }

    renderMenu(items) {
        const menu = [];

        for (let i = 0; i < items.length; i++) {
            let item = items[i];

            menu.push(
                <li key={i}>
                    <Link to={item.link}>{item.name}</Link>
                </li>
            )
        }

        return menu;
    }

    logout() {
        localStorage.setItem("user", "");
    }

    render() {
        const menuitems = this.renderMenu(this.links);

        return (
            <div className="travelog_sidebar_container">
                <div className="travelog_sidebar">
                    <ul>
                        { menuitems }
                        <li>
                            <Link to="/" onClick={ this.logout }>Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}