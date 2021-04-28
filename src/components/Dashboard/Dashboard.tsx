import React, {useState} from 'react';
// Imports for what we need from material-ui
import { Drawer as MUIDrawer,
    ListItem,
    List,
    ListItemIcon,
    ListItemText, 
    Theme,
    useTheme,
    makeStyles,
    createStyles,
    AppBar, 
    Toolbar,
    IconButton,
    Divider,
    Button,
    Typography
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import { RouteComponentProps, withRouter, Switch, Route } from 'react-router-dom';

import { DataTable } from '../../components';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
      display: 'flex',
    },

    // manipulating margin and width, create an empty object, and defining parameters for the object
    // easing is how long it takes to enter and leave the screen
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            // The ease transition is how the menu slides open
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        // the 2 means 2 pixels spacing on the Right
        marginRight: theme.spacing(2)
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },

    drawerPaper:{
        width: drawerWidth
    },
    drawerHeader:{
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // ..spread operator is necessary for content to be shown below app bar
        // gives the theme of all the mixins that are available for the toolbar
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
    },
    toolbar: {
        display: 'flex'
    },
    toolbar_button: {
        marginLeft: 'auto',
        color: 'white'
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    }
})
);

interface DashProps{
    history: RouteComponentProps['history'];
    location: RouteComponentProps['location'];
    match: RouteComponentProps['match'];
}


export const Dashboard = withRouter( (props:DashProps) => {

    console.log(props)
    
    // Deconstruct the history value from the props ojects
    const { history } = props;
    
    console.log(history)
    const classes = useStyles();
    const theme = useTheme();

    // state value for opening/closing of our side bar
    // Need to add {useState} to React import at top of page. It's not a default value, so it needs to be accessed using {}
    // setOpen is a "setter" - setting 
    // useState allows us to create a variable (setOpen is a function, open is a variable)
    // Initial state of open is set to false (menu is closed)
    const [open, setOpen] = useState(false)

    // handDrawerOpen and Close communication with const [open, setOpen] = useState(false) above
    // When the hamburger button is clicked, open the side menu
    const handleDrawerOpen = () => {
        setOpen(true)
    }

    // This closes the side menu
    const handleDrawerClose = () => {
        setOpen(false)
    }

    // This array will contain a bunch of objects
    const itemsList = [
        {
            text: 'Home', 
            // Moving things from one place to another inside our side bar
            onClick: () => history.push('/')
        },
        { 
            text: 'Sign In', 
            onClick: () => history.push('/signin')
        }

    ]

    return (
        <div className={classes.root}>
            {/* css baseline helps keep things from overlapping each other */}
            <CssBaseline />
            <AppBar position = 'fixed' className = {clsx(classes.appBar, {[classes.appBarShift]: open})}>
                <Toolbar className = {classes.toolbar}>
                    <IconButton color = 'inherit' aria-label = "open drawer" onClick = {handleDrawerOpen} edge = 'start' className={clsx(classes.menuButton, open && classes.hide)}>
                        {/* MenuIcon is the hamburger icon */}
                        <MenuIcon />
                    </IconButton>
                    <Typography> Dashboard </Typography>    
                    <Button className = {classes.toolbar_button}>Create New Car</Button>
                </Toolbar> 
            </AppBar>

            {/* persistent means always available, but not permanent */}
            {/* MIUDrawer can accept 'classes' as secondary styling */}
            {/* drawPaper adds a paper look */}
            <MUIDrawer className = {classes.drawer} variant='persistent' anchor = 'left' open = {open} classes = {{paper: classes.drawerPaper}}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick = {handleDrawerClose}>
                        {/* ternary expression */}
                        { theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>

                    {itemsList.map( (item, index) => {
                        // text and Onclick are coming in from const itemsList above
                        const { text, onClick } = item
                        return (
                            // Creating look and feel of a button
                            <ListItem button key = { text } onClick = { onClick }>
                                <ListItemText primary = { text } />
                               
                            </ListItem>
                        )
                    })}
                </List>
            </MUIDrawer>

            <main className = {clsx(classes.content, { [classes.contentShift]: open})}>
                <div className={classes.drawerHeader}/>
                    
                <h1>Rangers 59 Car Inventory Management</h1>
                        <DataTable />              
            </main>
        </div>
    )
})

