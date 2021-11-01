import React from "react";
import styled from "styled-components";

const Comment = (props) => {

	return (
		<>
			<Box padding="13px 20px 13px 20px">
				<Warp justify="space-between">
					<Text size="14px" color="#777777">
						방명록 7
					</Text>

					<Warp>
						<Text marginR="5px" size="14px" weight="500" color="#C4C4C4">
							인기순
						</Text>
						<Text marginR="5px" size="14px" weight="500" color="#C4C4C4">
							최신순
						</Text>
					</Warp>
				</Warp>
			</Box>

			<Rectangle/>

			<Box height="42px" background="#F6F6F6" flex="flex" justify="center" align="center" >
				<Text color="#C4C4C4" size="14px">
					방명록을 사용할 때는 욕설과 ~~ 삼가해주시기 바랍니다.
				</Text>
			</Box>

			<Box height="69px">
				<Warp>
					<div>
						<Circle/>
					</div>
					<TextArea placeholder="공개글 추가..." />
				</Warp>
			</Box>

			<Rectangle/>
			
			<Box padding="20px">
				<Warp>
					<div>
						<Circle/>
					</div>
					<Box>
						
						<Warp>
							<Text>
								김진희
							</Text>
							<Text>
								1분전
							</Text>
						</Warp>
						<Text>
							지금 참여 가능 하신가요?
						</Text>
						
					</Box>
				</Warp>
			</Box>
			<Rectangle/>

		</>	
	)
}

export default Comment;

const Rectangle = styled.div`
	background: #C4C4C4;
	width: 100%;
	border: 1px solid #E7E7E7;
`;

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
	margin-right: ${(props) => props.marginR};;
	cursor: ${(props) => props.pointer};
	/* text-align: center; */
`;

const NowBtn = styled.button`
	width: 187px;
	height: 45px;
	margin-right: 0;
	padding-bottom: 20px;
	border: none;
	border-bottom: 3px solid #F25343;
	background: none;
`;

const Button = styled.button`
	width: 187px;
	height: 45px;
	background: none;
	padding-bottom: 20px;
	border: none;
`;

const TextArea = styled.textarea`
  width: 350px;
  height: 70px;
	border: none;
  /* border: 1px solid #E7E7E7; */
  /* border-radius: 100px; */
  padding: 12px 40px 12px 16px;
  margin-left: 12px;
	resize: none;
	:required
  /* position: relative; */
  ::placeholder {
    font-weight: 500;
    font-size: 14px;
    color: #C4C4C4;
  }
`;

const Circle = styled.div`
	width: 29px;
	height: 29px;
	border-radius: 50%;
	background: #C4C4C4;
`;