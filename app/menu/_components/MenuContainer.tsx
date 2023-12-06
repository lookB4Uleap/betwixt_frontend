"use client"

import React from 'react';
import MenuSection from './MenuSection';

function MenuContainer() {
    return (
        <div className='min-w-full flex-col'>
            <MenuSection />
            <MenuSection />
            <MenuSection />
            <MenuSection />
        </div>
    );
};

export default MenuContainer;