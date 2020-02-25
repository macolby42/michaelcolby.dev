import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom'
import Blaster from './components/Blaster/Blaster'
import Home from './components/Home'
import './App.css'
import styled from 'styled-components';

const HoverZone =  styled.div`
    width: 100vw;
    height: 50px;
    background: rgba(0,0,0,0);
    position: absolute;
    opacity: 1;
    z-index: 12;
`

const HidingMenu = styled.div`
    width: 100vw;
    height: 50px;
    display: flex;
    opacity: 1;
    position: relative;
    background: #CFCFCF;
    transform-origin: top;
    transform: translate(0px, -100px);
    transition-delay: 2s;
    box-shadow: 10px 10px 60px #cfcfcf, 
            -10px -10px 60px #cfcfcf;
    transition: all 0.5s ease;
    ${HoverZone}:hover & {
        transform: translate(0px, 0px);
    }
`

const MenuList = styled.ul`
    width: 100%;
    margin: 0;
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-items: flex-start;
    overflow: hidden;
    padding: 12px;
    font-family: 'Heebo', sans-serif;
    font-weight: 400;
    a {
        color: inherit;
        text-decoration: none;
        display: relative;
        vertical-align: middle;
        color: #0A0A0A;
        transition: all 300ms ease;
        :hover {
            color: #EFEFEF;
        }
    }
`

const ListItem = styled.li`
    margin-left: 30px;
    text-align: center;
`

const MenuItemBacker = styled.div`
    background: #32FFAF;
    width: 100%;
    height: 100%;
    display: absolute;
    border-radius: 5px;
    transform: translate(0px, 30px);
    transition: all 0.5s ease;
    box-shadow: 2px 2px 0px #EFEFEF, 
            -2px -2px 0px #EFEFEF;
    ${ListItem}:hover & {
        transform: translate(0px, 10px);
        box-shadow: 2px 2px 60px #EFEFEF, 
            -2px -2px 60px #EFEFEF;
    }
`

export default function App() {
    return (
        <div className="App">
            <Router>
                <HoverZone>
                    <HidingMenu>
                        <MenuList>
                            <ListItem>
                                <Link to="/">HOME</Link>
                                <MenuItemBacker />
                            </ListItem>
                            <ListItem>
                                <Link to="/blaster">BLASTER</Link>
                                <MenuItemBacker />
                            </ListItem>
                        </MenuList>
                    </HidingMenu>
                </HoverZone>

                <Switch>
                    <Route path="/blaster" component={Blaster} />
                    <Route component={Home} />
                </Switch>
            </Router>
        </div>
    );
}
