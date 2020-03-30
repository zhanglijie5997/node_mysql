import React from 'react'
import styles from './NotFound.scss'
import { RouteComponentProps } from 'react-router'
const NotFound = (props: RouteComponentProps) => {
    return (
        <div className={styles.notFound}>
            <div className={styles.container} data-word="404">
                    
                <div className={styles.white}/>
            </div>
        </div>
    )
}

export default NotFound;
