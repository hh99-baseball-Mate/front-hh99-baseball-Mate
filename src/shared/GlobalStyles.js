import { createGlobalStyle } from "styled-components";
import { normalize } from "react-style-reset";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
	${normalize}
	html,
	body {
		/* height: 100%; */
		min-height: 100vh;
		max-width: 425px;
		background-color: #fafafa;
		margin: auto;
		box-shadow: 0px 1px 4px 9999px rgba(0, 0, 0, 0.01);
	}
	/* #root {
		background-color: #fff;
	} */
	*{
		padding: 0;
		margin:0;
		box-sizing:border-box;
		list-style: none;

		/* 스크롤바 숨기기 */
		
		/* scrollbar-width: none;
		-ms-overflow-style:none;
		::-webkit-scrollbar{
			display: none;
		} */

		/* 스크롤바 디자인 */
		::-webkit-scrollbar{
			/* width: 50px; */
			background-color: #727071;
			width: 15px;
			height: 10px;
		}
		::-webkit-scrollbar-thumb{
			background-color: #00000040;
			border-radius:20px
		}
		::-webkit-scrollbar-track{
			background-color: white;
		}
	}
`
