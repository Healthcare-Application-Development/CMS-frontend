import React from 'react';

function SidebarItem(props) {
    return (
        <div className='sidebar-item p-3 m-3 flex gap-3 h-[54px] justify-start align-middle'>
            <img src={`/${props.imgName}.png`} className="sidebar-img fa fa-icon w-6 h-6" alt={props.alt}></img>
            <span className='sidebar-text'>{props.sidebarText}</span>
        </div>
    );
}

export default SidebarItem;