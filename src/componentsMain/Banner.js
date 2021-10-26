import React from "react";
import styled from "styled-components";

const Banner = (props) => {

	return (
		<React.Fragment>
			<BannerSection>
				경기일정이 들어가요
			</BannerSection>
		</React.Fragment>
	)
}

export default Banner;

const BannerSection = styled.div`
	width: 100%;
	height: 250px;
	background-color: #dee2e6;
`;