import { createGlobalStyle } from "styled-components";
import { normalize } from "react-style-reset";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
	${normalize}
	body {
		/* height: 100%; */
		background-color: #f8f9fa85;
		/* background-color: #fafafa; */
	}
	/* #root {
		background-color: #fff;
	} */
	*{
		padding: 0;
		margin:0;
		box-sizing:border-box;

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
