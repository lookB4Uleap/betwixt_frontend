"use client"

import React, { useEffect } from 'react';
import MenuSection from './MenuSection';
import { useMenu } from '../_hooks/useMenu';
import MenuContainerSkeleton from './MenuContainerSkeleton';

function MenuContainer() {
    const {menu, loading, error} = useMenu();

    if (loading)
        return <MenuContainerSkeleton />

    return (
        <div className='min-w-full flex-col'>
            {
                Object.keys(menu).map(
                    section => <MenuSection key={section} header={section} items={menu[section as keyof typeof menu]} />)
            }
            {/* <MenuSection header='Section' />
            <MenuSection header='Section' />
            <MenuSection header='Section' />
            <MenuSection header='Section' /> */}
        </div>
    );
};

export default MenuContainer;