import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { mainCreators } from "../redux/modules/mainPage";

const Banner = (props) => {

	const dispatch = useDispatch();
	const gameTime = useSelector((state) => state.mainPage.gamelist);
	
	console.log("gameTime",gameTime)

	useEffect(() => {
		dispatch(mainCreators.gameTimeMW());
	}, [])

	
	return (
		<React.Fragment>
			<BannerSection>
				{
					gameTime.map((game, idx)=>{
						return (
							<Container key={idx}>
								<div>{gameTime[idx].date}</div>
								<div>{gameTime[idx].time}</div>
								<div><img src={gameTime[idx].awayImage} width="30px" alt="away"/></div>
								<div>{gameTime[idx].match}</div>
								<div><img src={gameTime[idx].homeImage} width="30px" alt="home"/></div>
								<div>{gameTime[idx].location}</div>
							</Container>
						)
					})
				}
			</BannerSection>
		</React.Fragment>
	)
}

export default Banner;

// const Section = styled.div`
// 	display: flex;
// 	justify-content: center;
// 	align-content: center;
// `;

const BannerSection = styled.div`
	width: 100%;
	height: 150px;
	background-color: #dee2e6;
	overflow: auto;
`;

const Container = styled.div`
	display: flex;
	/* flex-direction: column; */
	justify-content: space-around;
	align-content: space-around;
`;

