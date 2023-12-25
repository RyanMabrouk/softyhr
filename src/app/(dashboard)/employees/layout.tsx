import React, { ReactNode } from 'react'
import EmployeList from './components/EmployeList/EmployeList';

interface EmployeesPropsType {
    children: ReactNode ;
}

function layout({children}:EmployeesPropsType) {
 return children 
}

export default layout