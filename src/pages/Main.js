import React from "react";
import styled from "styled-components";

import NavigationBar from "../shared/NavigationBar";
import Timeline from "../componentsMain/Timeline";
import HotGroup from "../componentsMain/HotGroup";
import Banner from "../componentsMain/Banner";
import Header from "../componentsMain/Header";


const Main = (props) => {

	return (
		<Container>

			<p style={{fontSize:"30px"}}>야구 MATE</p>
			<Header />
			<Banner />
			<HotGroup />
			<Timeline />
			{/* <NavigationBar /> */}

		</Container>
	)
}

export default Main;

const Container = styled.div`
	width: 375px; 
	/* background-size: cover; */
	/* height: auto; */
	margin: auto;
	padding: 0;
`;



