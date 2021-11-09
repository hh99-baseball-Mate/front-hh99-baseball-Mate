import React from "react";
import styled from "styled-components";

const Footer = (props) => {

	return (
		<Container>
			<Warp>
				Footer
			</Warp>
		</Container>
	)
}

export default Footer;

const Container = styled.div`
  width: 375px;
  background: #777777;
  height: 178px;
  padding: 0;
	/* NaviBar안겹치게 */
	/* margin-bottom: 94px; */
`;

const Warp = styled.div`
  /* width: 100%; */
  display: ${(props) => props.flex};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  margin-left: ${(props) => props.marginLeft};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  position: ${(props) => props.position};
`;