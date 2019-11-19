import React from 'react';
import styled from 'styled-components';
import dood from '../assets/dood.png';

const Banner = styled.div`
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Dood = styled.img`
    width: 200px;
    height: 100px;
`;

const Box = styled.div`
    border-color: slategray;
    border-width: 5px;
    padding: .2em .5em;
    font-size: 2em;
    font-family: 'Heebo', sans-serif;
`;

const Content = styled.span`
    color: silver;
`;

export default function Nothing() {
    return(
        <Banner>
            <Dood alt="click and drag me away from my body; it's like you're stealing my soul..." src={dood}/>
            <Box>
                <Content>something coming soon</Content>
            </Box>
        </Banner>
    );
}