import React from 'react';
import styles from './Prism.css';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'

export default function Wheel({data, handleClick, ...otherProps}) {
    return (
        <List component="nav">
            <ListItem button onClick={() => {handleClick(1)}}>
                <ListItemIcon>
                    <Icon>check_circle</Icon>
                </ListItemIcon>
                <ListItemText className={styles.stepItem} inset primary="01 Design Goals" />
            </ListItem>
            <ListItem button onClick={() => {handleClick(2)}}>
                <ListItemIcon>
                    <Icon>check_circle</Icon>
                </ListItemIcon>
                <ListItemText className={styles.stepItem} inset primary="02 Feedstock" />
            </ListItem>
            <ListItem button onClick={() => {handleClick(3)}}>
                <ListItemIcon>
                    <Icon></Icon>
                </ListItemIcon>
                <ListItemText className={styles.stepItem} inset primary="03 Production" />
            </ListItem>
            <ListItem button onClick={() => {handleClick(4)}}>
                <ListItemIcon>
                    <Icon></Icon>
                </ListItemIcon>
                <ListItemText className={styles.stepItem} inset primary="04 Use" />
            </ListItem>
            <ListItem button onClick={() => {handleClick(5)}}>
                <ListItemIcon>
                    <Icon></Icon>
                </ListItemIcon>
                <ListItemText className={styles.stepItem} inset primary="05 End of Life" />
            </ListItem>
            <ListItem button onClick={() => {handleClick(6)}}>
                <ListItemIcon>
                    <Icon></Icon>
                </ListItemIcon>
                <ListItemText className={styles.stepItem} inset primary="06 Whole Product" />
            </ListItem>
            <ListItem button onClick={() => {handleClick(7)}}>
                <ListItemIcon>
                    <Icon></Icon>
                </ListItemIcon>
                <ListItemText className={styles.stepItem} inset primary="07 Evaluation & Optimization" />
            </ListItem>
        </List>
    );
}
