import React from 'react'
import './PageController.css'
export default function PageController(props) {
    let pageCount = props.pageCount;
    let selectedPage = props.page
    let pageItems = []
    for (let i = 1; i <= pageCount; i++) {
        let itemClass = props.page == i ? "page-item page-item-selected" : "page-item"
        pageItems.push(
            <div className={itemClass} onClick={() => props.onPageChanged(i)}>
                <span className="page-item-text">{i}</span>
            </div>
        )
    }
    return (
        <div className="page-list">
            {pageItems}
        </div>
    )
}