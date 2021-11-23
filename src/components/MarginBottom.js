import React from "react";
import styled from "styled-components";

const MarginBottom = (props) => {
	const { chat } = props;

	return (
		<Box chat={chat}>

		</Box>
	)
}

MarginBottom.defaultProps = {
  chat: false,
}

export default MarginBottom;

const Box = styled.div`
	width: 0;
	height: 0;
	${(props) =>
    props.chat ?
    "margin-bottom: 74px;" :
		`margin-bottom: 64px;`
	}
	/* margin-bottom: 64px; */
`;