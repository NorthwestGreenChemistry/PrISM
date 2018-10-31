import React from 'react';
import styles from './Prism.css'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'

export default function ProgressItem({step, stepCounter, handleClick, ...otherProps}) {
    return (
        <ListItem button onClick={() => {handleClick(stepCounter)}}>
            <ListItemIcon>
                <Icon>
                    {step.completed ? 'check_circle' : ''}
                </Icon>
            </ListItemIcon>
            <ListItemText className={styles.stepItem} inset primary={step.title} />
        </ListItem>
    )
}
