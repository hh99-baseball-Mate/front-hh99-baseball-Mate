import React from "react";
import styled from "styled-components";

const Participant = (props) => {
	// const {shape, src, size, pointer} = props;
//  flex="felx" justify="space-around"
	return (
		<>
			<Box padding="28px 20px 40px 20px">
				<Warp wrap="wrap" justify="space-between" align="center" start="space-around">
					<div style={{marginBottom:"20px"}}>
						<Circle/>
						<Text>김진희</Text>
					</div>
					<div style={{marginBottom:"20px"}}>
						<Circle/>
						<Text margin="auto">이름칸</Text>
					</div>
					<div style={{marginBottom:"20px"}}>
						<Circle/>
						<Text>이름칸</Text>
					</div>
					<div style={{marginBottom:"20px"}}>
						<Circle/>
						<Text>이름칸</Text>
					</div>
					<div style={{marginBottom:"20px"}}>
						<Circle/>
						<Text>이름칸</Text>
					</div>
					<div style={{marginBottom:"20px"}}>
						<Circle/>
						<Text>이름칸</Text>
					</div>
					<div style={{marginBottom:"20px"}}>
						<Circle/>
						<Text>이름칸</Text>
					</div>
					<div style={{marginBottom:"20px"}}>
						<Circle/>
						<Text>이름칸</Text>
					</div>
					<div style={{marginBottom:"20px"}}>
						<Circle/>
						<Text>이름칸</Text>
					</div>
					<div style={{marginBottom:"20px"}}>
						<Circle/>
						<Text>이름칸</Text>
					</div>
				
				</Warp>

				<ConfirmBtn>
					참여 신청 하기
				</ConfirmBtn>
			</Box>
		</>
	)
}


export default Participant;

const Box = styled.div`
	width: 100%;
	height: ${(props) => props.height};
	background: ${(props) => props.background};
	padding: ${(props) => props.padding};
	display: ${(props) => props.flex};
	flex-direction: ${(props) => props.direction};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	position: ${(props) => props.position};
`;

const Warp = styled.div`
	display: flex;
	width: ${(props) => props.width};
	flex-direction: ${(props) => props.direction};
	flex-wrap: ${(props) => props.wrap};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	align-content: ${(props) => props.start};
	margin-left: ${(props) => props.marginLeft};
	margin: ${(props) => props.margin};
	padding: ${(props) => props.padding};
	position: ${(props) => props.position};
	
`;

const Text = styled.div`
	font-size: ${(props) => props.size};
	font-weight: ${(props) => props.weight};
	color: ${(props) => props.color};
	letter-spacing: ${(props) => props.spacing};
	margin: ${(props) => props.margin};
	cursor: ${(props) => props.pointer};
	text-align: center;
`;

const Circle = styled.div`
	width: 98px;
	height: 98px;
	border: 1px solid #F25343;
	border-radius: 50%;
	background: #FFFFFF;
	margin-bottom: 5px;
`;

const ConfirmBtn = styled.button`
	margin-top: 10px;
	width: 335px;
	height: 50px;
	background: #F25343;
	border-radius: 80px;
	border: none;
	color: #fff;
`;
