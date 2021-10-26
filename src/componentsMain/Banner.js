import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { gameTimeCreators } from "../redux/reducer/gameTime";

const Banner = (props) => {

	const dispatch = useDispatch();
	const gameTime = useSelector((state) => state.gameTime.list);
	//  console.log(gameTime)

	useEffect(() => {
		dispatch(gameTimeCreators.gameTimeMW());
	}, [])



	return (
		<React.Fragment>
			<BannerSection>
				{
					gameTime.map((game, idx)=>{
						return (
							<Container key={idx}>
								<div>{gameTime[idx].date}</div>
								<div>{gameTime[idx].title}</div>
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

const Container = styled.div`
	display: flex;
	/* flex-direction: column; */
	justify-content: space-around;
	align-content: space-around;
`;

const BannerSection = styled.div`
	width: 100%;
	height: 250px;
	background-color: #dee2e6;
`;